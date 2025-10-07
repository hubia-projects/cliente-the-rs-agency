/**
 * Melhorias para navegação e responsividade
 * Scroll suave, ancoragem otimizada e ajustes dinâmicos
 */

(function() {
    'use strict';

    // Aguardar carregamento completo do DOM
    document.addEventListener('DOMContentLoaded', function() {
        
        // ========== CONFIGURAÇÃO DE SCROLL SUAVE ========== 
        const header = document.querySelector('.header-area');
        const sections = document.querySelectorAll('.section');
        
        // Função para obter altura do header dinamicamente
        function getHeaderHeight() {
            return header ? header.offsetHeight : 80;
        }

        // ========== SCROLL OFFSET PARA TODAS AS ÂNCORAS ========== 
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Ignorar links vazios ou só com #
                if (!href || href === '#') return;
                
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Calcular posição com offset - AUMENTADO para compensar espaço superior
                    const headerHeight = getHeaderHeight();
                    const extraOffset = 60; // Aumentado de 20 para 60 para melhor centralização
                    const targetPosition = targetElement.offsetTop - headerHeight - extraOffset;
                    
                    // Scroll suave
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Atualizar URL sem pular a página
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    }
                }
            });
        });

        // ========== DESTACAR LINK ATIVO DURANTE SCROLL ========== 
        let ticking = false;
        
        function updateActiveLink() {
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            const headerHeight = getHeaderHeight();
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - headerHeight - 50;
                const sectionBottom = sectionTop + section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    // Remover active de todos os links
                    document.querySelectorAll('.nav a').forEach(link => {
                        link.classList.remove('active');
                    });
                    
                    // Adicionar active no link correspondente
                    const activeLink = document.querySelector(`.nav a[href="#${sectionId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
            
            ticking = false;
        }
        
        // Throttle para melhor performance
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    updateActiveLink();
                });
                ticking = true;
            }
        });

        // ========== AJUSTAR ALTURA DAS SEÇÕES DINAMICAMENTE ========== 
        function adjustSectionHeights() {
            const vh = window.innerHeight;
            const vw = window.innerWidth;
            
            // Banner principal - altura dinâmica
            const mainBanner = document.querySelector('#top.main-banner');
            if (mainBanner) {
                if (vw <= 576) {
                    // Mobile pequeno - altura automática
                    mainBanner.style.minHeight = 'auto';
                } else if (vw <= 767) {
                    // Mobile médio
                    mainBanner.style.minHeight = '85vh';
                } else if (vw <= 991) {
                    // Tablet
                    mainBanner.style.minHeight = '90vh';
                } else {
                    // Desktop
                    mainBanner.style.minHeight = '100vh';
                }
            }
            
            // Outras seções - altura automática baseada em conteúdo
            sections.forEach(section => {
                if (section.id !== 'top') {
                    section.style.minHeight = 'auto';
                    section.style.height = 'auto';
                }
            });
        }
        
        // Executar no carregamento
        adjustSectionHeights();
        
        // Executar no redimensionamento (com debounce)
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(adjustSectionHeights, 250);
        });

        // ========== CORRIGIR SCROLL NO CARREGAMENTO COM HASH NA URL ========== 
        if (window.location.hash) {
            // Pequeno delay para garantir que a página carregou
            setTimeout(function() {
                const targetElement = document.querySelector(window.location.hash);
                if (targetElement) {
                    const headerHeight = getHeaderHeight();
                    const extraOffset = 20;
                    const targetPosition = targetElement.offsetTop - headerHeight - extraOffset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }

        // ========== PREVENIR CORTE DE CONTEÚDO ========== 
        function ensureContentVisibility() {
            sections.forEach(section => {
                const container = section.querySelector('.container');
                if (container) {
                    // Garantir que o container tenha altura suficiente
                    const contentHeight = container.scrollHeight;
                    if (contentHeight > section.offsetHeight) {
                        section.style.minHeight = contentHeight + 'px';
                    }
                }
            });
        }
        
        // Executar após o carregamento de imagens
        window.addEventListener('load', function() {
            ensureContentVisibility();
            adjustSectionHeights();
            
            // Executar novamente após um pequeno delay (para garantir que AOS terminou)
            setTimeout(ensureContentVisibility, 500);
        });

        // ========== OTIMIZAR SCROLL PARA BOTÕES FOOTER ========== 
        document.querySelectorAll('footer a[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    e.preventDefault();
                    const headerHeight = getHeaderHeight();
                    const extraOffset = 20;
                    const targetPosition = targetElement.offsetTop - headerHeight - extraOffset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // ========== LOG PARA DEBUG (REMOVER EM PRODUÇÃO) ========== 
        console.log('✅ Navegação responsiva otimizada carregada');
        console.log('📱 Viewport:', window.innerWidth + 'x' + window.innerHeight);
        console.log('📊 Seções encontradas:', sections.length);
    });

    // ========== MELHORAR PERFORMANCE DE SCROLL ========== 
    // Adicionar classe para CSS otimizado
    document.documentElement.classList.add('smooth-scroll-enabled');

})();
