$(document).ready(function() {
    var owl = $('.owl-carousel')
    owl.owlCarousel({
        animateOut: 'fadeOut',
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 8000
    });

    $('.arrow-svg > #next').click(function(event) {
        console.log('next');
        owl.trigger('next.owl.carousel');
    });

    $('#prev').click(function(event) {
        console.log('prev');
        owl.trigger('prev.owl.carousel');
    });

});
