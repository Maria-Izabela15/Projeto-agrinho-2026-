// script.js
// Site: Fazenda do Futuro | Agro Inteligente
// Funcionalidades: Menu mobile, efeito de digitação, animações nos cards, scroll suave e interações

document.addEventListener('DOMContentLoaded', function() {
    
    // ==============================================
    // 1. MENU MOBILE - Responsividade e Acessibilidade
    // ==============================================
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.getElementById('navbar');
    let menuOpen = false;

    // Função para abrir/fechar menu mobile
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            menuOpen = !menuOpen;
            
            if (menuOpen) {
                navLinks.classList.add('active');
                mobileMenu.innerHTML = '<i class="fas fa-times"></i>';
                // Impede scroll da página quando menu está aberto no mobile
                document.body.style.overflow = 'hidden';
            } else {
                navLinks.classList.remove('active');
                mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            }
        });
    }

    // Fechar menu ao clicar em um link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && menuOpen) {
                menuOpen = false;
                navLinks.classList.remove('active');
                mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            }
        });
    });

    // Fechar menu ao clicar fora (apenas mobile)
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768 && menuOpen) {
            if (!navLinks.contains(event.target) && !mobileMenu.contains(event.target)) {
                menuOpen = false;
                navLinks.classList.remove('active');
                mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            }
        }
    });

    // ==============================================
    // 2. EFEITO DE TEXTO DIGITADO (Typing Effect)
    // ==============================================
    const typedTextElement = document.querySelector('.typed-text');
    if (typedTextElement) {
        const phrases = [
            'Futuro Sustentável',
            'Agro Inteligente',
            'Tecnologia Verde',
            'Biomas Protegidos'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pausa antes de deletar
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500; // Pausa antes de escrever a próxima
            }

            setTimeout(typeEffect, typingSpeed);
        }

        typeEffect();
    }

    // ==============================================
    // 3. CARDS INTERATIVOS COM REVELAÇÃO DE DADOS
    // ==============================================
    const techCards = document.querySelectorAll('.tech-card');
    
    // Dados autorais extras para cada card (além dos já existentes)
    const cardExtraData = {
        0: { // IoT Card
            title: 'Sensores IoT',
            description: 'Monitoramento contínuo do solo com economia hídrica comprovada.',
            stat: '🌱 40% menos água | +25% eficiência'
        },
        1: { // Drones IA Card
            title: 'Drones com IA',
            description: 'Aplicação inteligente que preserva os polinizadores locais.',
            stat: '🐝 90% menos químicos | Biodiversidade protegida'
        },
        2: { // Satélites Card
            title: 'Satélites',
            description: 'Análise em tempo real de grandes extensões territoriais.',
            stat: '🛰️ +20% produtividade | Monitoramento contínuo'
        }
    };

    techCards.forEach((card, index) => {
        // Adicionar atributos de acessibilidade
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Ver detalhes de ${cardExtraData[index]?.title || 'tecnologia'}`);
        
        // Criar elemento para dados extras (se não existir)
        let dataRevealDiv = card.querySelector('.card-data-reveal');
        if (!dataRevealDiv) {
            dataRevealDiv = document.createElement('div');
            dataRevealDiv.className = 'card-data-reveal';
            card.appendChild(dataRevealDiv);
        }
        
        // Adicionar informações autorais extras dentro do card
        const extraInfo = document.createElement('div');
        extraInfo.className = 'card-extra-info';
        extraInfo.style.cssText = `
            max-height: 0;
            opacity: 0;
            overflow: hidden;
            transition: all 0.4s ease;
            margin-top: 15px;
            font-size: 0.9rem;
            border-top: 1px solid rgba(255,255,255,0.2);
            padding-top: 10px;
        `;
        
        if (cardExtraData[index]) {
            extraInfo.innerHTML = `
                <p style="margin: 5px 0; font-weight: 600;">📊 ${cardExtraData[index].stat}</p>
                <small style="opacity: 0.9;">✨ ${cardExtraData[index].description}</small>
            `;
            card.appendChild(extraInfo);
        }
        
        // Adicionar event listeners para hover/focus
        card.addEventListener('mouseenter', function() {
            extraInfo.style.maxHeight = '100px';
            extraInfo.style.opacity = '1';
            
            // Animação adicional no badge de dados
            const dataBadge = this.querySelector('.data-badge');
            if (dataBadge) {
                dataBadge.style.transform = 'scale(1.05)';
                dataBadge.style.backgroundColor = 'rgba(255,255,255,0.3)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            extraInfo.style.maxHeight = '0';
            extraInfo.style.opacity = '0';
            
            const dataBadge = this.querySelector('.data-badge');
            if (dataBadge) {
                dataBadge.style.transform = 'scale(1)';
                dataBadge.style.backgroundColor = 'rgba(46, 125, 50, 0.8)';
            }
        });
        
        // Suporte para teclado (acessibilidade)
        card.addEventListener('focus', function() {
            extraInfo.style.maxHeight = '100px';
            extraInfo.style.opacity = '1';
        });
        
        card.addEventListener('blur', function() {
            extraInfo.style.maxHeight = '0';
            extraInfo.style.opacity = '0';
        });
    });

    // ==============================================
    // 4. SCROLL SUAVE COM OFFSET PARA NAVBAR FIXA
    // ==============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '') {
                e.preventDefault();
                return;
            }
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==============================================
    // 5. NAVBAR TRANSPARENTE COM SCROLL
    // ==============================================
    let lastScroll = 0;
    
    function handleNavbarScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.borderBottom = '1px solid var(--primary-green)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.borderBottom = '1px solid var(--glass-border)';
        }
        
        lastScroll = currentScroll;
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Chamada inicial

    // ==============================================
    // 6. ANIMAÇÃO DE ENTRADA (SCROLL REVEAL)
    // ==============================================
    const revealElements = document.querySelectorAll('.tech-card, .quote-box, .legal-box, .text-block p');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealThreshold = 100;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealThreshold) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Configurar elementos para animação inicial
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', checkReveal);
    window.addEventListener('load', checkReveal);
    checkReveal(); // Chamada inicial

    // ==============================================
    // 7. ELEMENTOS AUTORAIS - ROTATIVO DE CITAÇÕES
    // ==============================================
    const quotes = [
        { text: '"A integração lavoura-pecuária-floresta é o caminho para um agro sustentável."', author: '— Embrapa' },
        { text: '"Tecnologia de ponta para proteger o hoje e garantir o amanhã."', author: '— AgroTech Concept' },
        { text: '"O CAR é a base para a regularização ambiental no Brasil."', author: '— Código Florestal' },
        { text: '"Drones com IA: o futuro da agricultura de precisão."', author: '— Inovação Agro' }
    ];
    
    let quoteIndex = 0;
    const quoteBox = document.querySelector('.quote-box');
    
    if (quoteBox) {
        // Criar um elemento para o texto da citação se não existir no formato correto
        let quoteText = quoteBox.querySelector('p');
        let quoteAuthor = quoteBox.querySelector('cite');
        
        if (!quoteText) {
            quoteText = document.createElement('p');
            quoteBox.insertBefore(quoteText, quoteBox.firstChild);
        }
        if (!quoteAuthor) {
            quoteAuthor = document.createElement('cite');
            quoteBox.appendChild(quoteAuthor);
        }
        
        // Função para trocar citação a cada 8 segundos
        function rotateQuotes() {
            quoteIndex = (quoteIndex + 1) % quotes.length;
            const newQuote = quotes[quoteIndex];
            
            // Animação suave
            if (quoteText && quoteAuthor) {
                quoteText.style.opacity = '0';
                quoteAuthor.style.opacity = '0';
                
                setTimeout(() => {
                    quoteText.textContent = newQuote.text;
                    quoteAuthor.textContent = newQuote.author;
                    quoteText.style.opacity = '1';
                    quoteAuthor.style.opacity = '1';
                }, 300);
            }
        }
        
        // Iniciar rotatividade se houver mais de uma citação
        if (quotes.length > 1) {
            setInterval(rotateQuotes, 8000);
        }
        
        // Estilos para transição
        if (quoteText && quoteAuthor) {
            quoteText.style.transition = 'opacity 0.3s ease';
            quoteAuthor.style.transition = 'opacity 0.3s ease';
        }
    }

    // ==============================================
    // 8. DATASHEET AUTORAL - INFORMAÇÕES ATUALIZADAS
    // ==============================================
    const footer = document.querySelector('footer p');
    if (footer) {
        const currentYear = new Date().getFullYear();
        footer.innerHTML = `&copy; ${currentYear} AgroTech Concept | Fazenda do Futuro - Tecnologia e Sustentabilidade para o Agro Brasileiro`;
    }

    // ==============================================
    // 9. BOTÃO DE VOLTAR AO TOPO (Acessibilidade)
    // ==============================================
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.setAttribute('aria-label', 'Voltar ao topo');
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-green);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        justify-content: center;
        align-items: center;
        font-size: 1.2rem;
        transition: all 0.3s ease;
        z-index: 999;
        opacity: 0;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(backToTop);
    
    // Mostrar/esconder botão conforme scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'flex';
            setTimeout(() => {
                backToTop.style.opacity = '1';
            }, 10);
        } else {
            backToTop.style.opacity = '0';
            setTimeout(() => {
                if (window.pageYOffset <= 300) {
                    backToTop.style.display = 'none';
                }
            }, 300);
        }
    });
    
    // Função do botão voltar ao topo
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect no botão
    backToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.backgroundColor = '#1B5E20';
    });
    
    backToTop.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.backgroundColor = 'var(--primary-green)';
    });

    // ==============================================
    // 10. VALIDAÇÃO E LOG (Console amigável)
    // ==============================================
    console.log('🌱 Site "Fazenda do Futuro" carregado com sucesso!');
    console.log('🚀 Tecnologias implementadas: Menu Mobile, Typing Effect, Cards Animados, Scroll Reveal');
    console.log('💚 Agro inteligente e sustentável ativado!');
    
    // Mensagem de boas-vindas personalizada (apenas uma vez)
    setTimeout(() => {
        if (!sessionStorage.getItem('welcomeShown')) {
            console.log('📢 "A fazenda do futuro prova que produtividade e preservação caminham juntas!"');
            sessionStorage.setItem('welcomeShown', 'true');
        }
    }, 1000);
});

// ==============================================
// 11. PREVENÇÃO DE ERROS E POLYFILLS (Opcional)
// ==============================================
// Garantir suporte para scroll-behavior em navegadores antigos
if (!('scrollBehavior' in document.documentElement.style)) {
    // Polyfill simples para scroll suave
    const smoothScrollPolyfill = function(target, duration = 500) {
        const targetPosition = target.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    };
    
    // Adicionar suporte para links com smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                smoothScrollPolyfill(target);
            }
        });
    });
}
