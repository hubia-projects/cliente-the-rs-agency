(function ($) {
  
  "use strict";

  // Header Type = Fixed
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    var box = $('.header-text').height();
    var header = $('header').height();

    if (scroll >= box - header) {
      $("header").addClass("background-header");
    } else {
      $("header").removeClass("background-header");
    }
  });

  // Banner carousel (desativado - hero agora estático)
  if ($('.owl-banner').length) {
    $('.owl-banner').owlCarousel({ items:1, loop:false, dots:false, nav:false, autoplay:false });
  }

  // Portfólio carousel
  $('.owl-portfolio').owlCarousel({
    items:4,
    loop:true,
    dots:true,
    nav:true,
    autoplay:true,
    margin:30,
    responsive:{ 0:{items:1},700:{items:2},1000:{items:3},1600:{items:4} }
  });

  // Parceiros carrossel com configuração responsiva e autoplay
  if ($('.partners-carousel').length) {
    $('.partners-carousel').owlCarousel({
      loop: false,
      autoplay: true,
      autoplayTimeout: 3500,
      autoplayHoverPause: true,
      smartSpeed: 500,
      dots: true,
      nav: false,
      margin: 12,
      responsive: {
        0: { items: 2, stagePadding: 8 },
        576: { items: 2 },
        768: { items: 3 },
        992: { items: 4 }
      }
    });
  }

  // ========== MOBILE MENU COMPLETE REBUILD ==========
  console.log('Custom.js loaded, jQuery version:', $.fn.jquery);
  
  // Remove all existing event handlers to prevent conflicts
  $(document).off('.mobileMenu');
  $('.menu-trigger').off('.mobileMenu');
  $('.main-nav .nav a').off('.mobileMenu');
  
  var menuTrigger = $('.menu-trigger');
  var mainNav = $('.main-nav');
  var body = $('body');

  console.log('Menu elements found:', {
    trigger: menuTrigger.length,
    nav: mainNav.length,
    body: body.length
  });

  function openMenu() {
    console.log('Opening menu');
    menuTrigger.addClass('active');
    mainNav.addClass('menu-open');
    body.addClass('menu-open');
    menuTrigger.attr('aria-expanded', 'true');
  }

  function closeMenu() {
    console.log('Closing menu');
    menuTrigger.removeClass('active');
    mainNav.removeClass('menu-open');
    body.removeClass('menu-open');
    menuTrigger.attr('aria-expanded', 'false');
  }


  // Toggle menu on hamburger/X click
  menuTrigger.on('click.mobileMenu', function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (mainNav.hasClass('menu-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Fecha menu ao clicar em qualquer link do menu (com delay para scroll funcionar)
  $(document).on('click.mobileMenu', '.main-nav .nav a', function(e) {
    if ($(window).width() <= 767 && mainNav.hasClass('menu-open')) {
      setTimeout(closeMenu, 200);
    }
  });

  // Close menu when clicking outside (usando namespace)
  $(document).on('click.mobileMenu', function(e) {
    if ($(window).width() <= 767 && mainNav.hasClass('menu-open')) {
      if (!$(e.target).closest('.main-nav').length && !$(e.target).closest('.menu-trigger').length) {
        closeMenu();
      }
    }
  });

  // Close menu on ESC key (usando namespace)
  $(document).on('keydown.mobileMenu', function(e) {
    if (e.key === 'Escape' && mainNav.hasClass('menu-open')) {
      closeMenu();
    }
  });

  // Reset menu on window resize
  $(window).on('resize.mobileMenu', function() {
    if ($(window).width() > 767) {
      closeMenu();
    }
  });

  // Scroll suave para âncoras com offset do header - OTIMIZADO
  $('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function(e) {
    var href = $(this).attr('href');
    if (!href || href.charAt(0) !== '#') return; // links externos deixar intactos
    
    var target = $(href);
    if (target.length) {
      e.preventDefault();
      
      // Fechar menu se estiver aberto
      if ($(window).width() < 992) {
        closeMenu();
      }
      
      // Calcular offset do header dinamicamente
      var headerHeight = $('.header-area').outerHeight() || 80;
      var extraOffset = 60; // Aumentado de 20 para 60 para melhor centralização
      var targetTop = target.offset().top - headerHeight - extraOffset;
      
      // Remover classe active de todos os links
      $('.scroll-to-section a').removeClass('active');
      $(this).addClass('active');
      
      $('html, body').animate({
        scrollTop: targetTop
      }, 800, 'swing');
    }
  });


  // Navegação smooth scroll original (atualizada para trabalhar com o novo sistema)
  $('.scroll-to-section a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    $(document).off("scroll");
    
    $('.scroll-to-section a').each(function () {
      $(this).removeClass('active');
    });
    $(this).addClass('active');
  
    var target = this.hash;
    var $target = $(this.hash);
    var headerHeight = $('.header-area').outerHeight() || 80;
    
    $('html, body').stop().animate({
      scrollTop: ($target.offset().top - headerHeight) + 1
    }, 500, 'swing', function () {
      try { 
        window.location.hash = target; 
      } catch(e) { /* ignore */ }
      $(document).on("scroll", onScroll);
    });
  });

  // Destacar link ativo durante scroll
  function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('.nav a').each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
        $('.nav ul li a').removeClass("active");
        currLink.addClass("active");
      } else {
        currLink.removeClass("active");
      }
    });
  }

  $(document).ready(function () {
    $(document).on("scroll", onScroll);
  });


  // Page loading animation
  $(window).on('load', function() {
    $('#js-preloader').addClass('loaded');
  });

  // Window Resize Mobile Menu Fix
  function mobileNav() {
    var width = $(window).width();
    $('.submenu').on('click', function() {
      if(width < 767) {
        $('.submenu ul').removeClass('active');
        $(this).find('ul').toggleClass('active');
      }
    });
  }

})(window.jQuery);