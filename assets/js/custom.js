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
      loop: true,
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

  // Menu Mobile: Sistema completo de toggle, click-outside e acessibilidade
  var menuTrigger = $('.menu-trigger');
  var mainNav = $('.main-nav');
  var body = $('body');

    function closeMenu() {
      menuTrigger.removeClass('active').attr('aria-expanded', 'false');
      mainNav.removeClass('is-open');
      body.removeClass('menu-open');
    }
  
    function openMenu() {
      menuTrigger.addClass('active').attr('aria-expanded', 'true');
      mainNav.addClass('is-open');
      body.addClass('menu-open');
    }
  
    menuTrigger.on('click', function(e) {
      e.preventDefault();
      if (mainNav.hasClass('is-open')) closeMenu();
      else openMenu();
    });
  
    mainNav.find('.nav a').on('click', function() {
      if ($(window).width() < 992) {
        closeMenu();
      }
    });
  
    $(document).on('click', function(e) {
      if ($(window).width() < 992 && 
          mainNav.hasClass('is-open') && 
          !mainNav[0].contains(e.target) && 
          !menuTrigger[0].contains(e.target)) {
        closeMenu();
      }
    });
  
    $(document).on('keydown', function(e) {
      if (e.key === 'Escape' && mainNav.hasClass('is-open')) closeMenu();
    });

  // Scroll suave para âncoras com offset do header
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
      
      // Calcular offset do header
      var headerHeight = $('.header-area').outerHeight() || 80;
      var targetTop = target.offset().top - headerHeight;
      
      $('html, body').animate({
        scrollTop: targetTop
      }, 700);
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