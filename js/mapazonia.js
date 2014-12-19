$.i18n.init(function(t) {
  $(".nav").i18n();
  $(".intro").i18n();
  $("#about").i18n();
  $("#openstreetmap").i18n();
  $("#contact").i18n();
});

// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
        $(".navbar-brand").removeClass("hidden");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
        $(".navbar-brand").addClass("hidden");
    }
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});