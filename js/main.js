$(document).ready(function() {

    //heade carusel
    var owl = $('.header__carusel > .owl-carousel');
    owl.owlCarousel({
        animateOut: 'fadeOut',
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 8000
    });

    $('.arrow-svg > #next').click(function(event) {
        owl.trigger('next.owl.carousel');
    });

    $('#prev').click(function(event) {
        owl.trigger('prev.owl.carousel');
    });

    // grid system gallery
    $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true
    });

    //driwin svg line
    drawSvg.init();
    $(window).resize(function() {
        drawSvg.init();
    });

    //comments carusel
    $('.comments-wrapper > .owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        stagePadding: 40,
        autoplay: true,
        autoplayTimeout: 8000,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 2
            }
        }
    });



});

var drawSvg = {
    init: function() {
        this.cacheDom();
        this.getProp();
        this.setProp();
        this.createPath();
        this.bindEvents();
    },
    cacheDom: function() {
        this.svg = $("#svg-event-line");
        this.path = this.svg.find('path');
        this.fullHeight = $('#tl_container').outerHeight();
        this.container = $('.timeline__content');
        this.pathProp = $('path.event-path').get(0);
        this.animatedPath = $('path#draw').get(0);
        this.position = 0;
    },
    getProp: function() {
        var self = this;
        this.attributes = $(this.pathProp).attr('d').split(' ');
        this.attrV = $(this.attributes)
            .filter(function(num, pos) {
                return self.findV(num, pos)
            }).map(function(num, pos) {
                return self.changeV(num, pos);
            })[0];

    },
    setProp: function() {
        var self = this;
        this.container.css('height', 100 + this.fullHeight + 'px');
        this.attributes.splice(this.position, 1, this.attrV);
    },
    bindEvents: function() {
        var self = this;
        $(window).scroll(this.scrollAnimation.bind(this));

    },
    scrollAnimation: function(event) {
        var d = $('#tl_container').get(0).getBoundingClientRect();
        if (d.top < (document.documentElement.clientHeight - 200)) {
            var prc = ((this.fullHeight - 50) / (d.bottom / 1.3)) - 1;
            var drawLength = this.pathLength * prc;
            $('#draw').css({
                'stroke-dashoffset': (prc < 1) ? (this.pathLength - drawLength) : 0
            })
        }
    },
    createPath: function() {
        var self = this;
        this.newAttributes = this.attributes.join(' ');
        $(this.path).each(function(i, elem) {
            $(elem).attr('d', self.newAttributes);
        });
        this.pathLength = this.animatedPath.getTotalLength();
        this.dashedLength = this.pathLength;
        this.slyle = {
            'stroke-dasharray': this.dashedLength,
            'stroke-dashoffset': this.pathLength
        };
        $(this.animatedPath).css(this.slyle);
    },
    findV: function(num, pos) {
        if (pos.charAt(0) == 'v') {
            this.position = num;
            return pos;
        }
        return false;
    },
    changeV: function(num, pos) {
        var value = +pos.substring(1),
            total = value + $('#tl_container').outerHeight() - 100,
            result = "v" + total;
        return result;
    }
}
