// $('.carousel').carousel()
// $(document).on('click', '.yamm .dropdown-menu', function(e) {
//     e.stopPropagation();
// })

/*Tooltip*/
// $(function() {
//     $('[data-toggle="tooltip"]').tooltip();
// });



/*------------------------------------*/
/* settaggio  vari swiper */
/*------------------------------------*/

var swiper = new Swiper('.accessori-categoria', {
    pagination: '.swiper-pagination',
    slidesPerView: 6,
    paginationClickable: true,
    spaceBetween: 0,
    keyboardControl: true,
    grabCursor: true,
    breakpoints: {
       320: {
           slidesPerView: 3
       },
       480: {
           slidesPerView: 3
       },
       768: {
           slidesPerView: 4
       },
       992: {
           slidesPerView: 6
       },
       1200: {
           slidesPerView: 6
       }
   }
});
var swiper = new Swiper('.accessori-thumb', {
    pagination: '.swiper-pagination',
    slidesPerView: 8,
    paginationClickable: true,
    spaceBetween: 0,
    keyboardControl: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    // centeredSlides: 'true',
    keyboardControl: 'true',
    grabCursor: true,
    lazyLoading: 'true',
    // slidesOffsetBefore: 60,
    // slidesOffsetAfter: 60,
    breakpoints: {
       320: {
           slidesPerView: 1
       },
       480: {
           slidesPerView: 3
       },
       768: {
           slidesPerView: 5
       },
       992: {
           slidesPerView: 5
       },
       1200: {
           slidesPerView: 8
       }
   }
});
/* variabile booleana per stato apeertura del menu accessori */

var aperto = 0;

/* trucchetto per creare e posizionare la linea separatrice tra menu accessori e accessori */
$.fn.sepLine = function(divider, container, parent){
    if ( !$('.'+divider).length ) {
        $('<div class="'+divider+'"></div>' ).appendTo('.'+parent);
    }
    $('.'+divider).css('top', function () {
        return ($('.'+container).height());
    });
}

/* funzione regola l'altezza del megamenu in base alla dimensione della pagina */
$.fn.yammHeight = function(mainNavbar, yammContent, offsetElementHeight){
    var heightref = $(window).height() - ($('.'+mainNavbar).outerHeight()+$('.'+offsetElementHeight).outerHeight()+1);
    $('.'+yammContent).outerHeight(heightref);
}

/* funzione per apertura menu accessori in base all'altezza della viewport e con lo switch*/
$.fn.animateAccessoriBar = function(accContainer, offsetElement, triggerElement, trigger){
    var accContainerHeight = $('.'+accContainer).outerHeight();
    var offsetElementHeight = $('.'+offsetElement).outerHeight();
    var docHeight = $(window).height();
    // console.log('accContainerHeight: '+accContainerHeight);
    // console.log('offsetElementHeight: '+offsetElementHeight);
    console.log('valore di aperto: '+aperto);
    if (docHeight > 600) {
        aperto = 0;
        $('.'+accContainer).stop().animate({
            bottom: offsetElementHeight
        }, 500, "swing");
        $('.'+triggerElement).removeClass('aperto').addClass('chiuso');
    } else {
        aperto = 1;
        $('.'+accContainer).stop().animate({
            bottom: -(accContainerHeight - offsetElementHeight)
        }, 500, "swing");
        $('.'+triggerElement).removeClass('chiuso').addClass('aperto');
    }

    if (trigger == 'trigger') {
        $('.'+triggerElement).click(function() {
            if (aperto == 1) {
                aperto = 0;
                console.log('valore di aperto: '+aperto);
                event.stopPropagation();
                $('.'+accContainer).stop().animate({
                    bottom: offsetElementHeight
                }, 500, "swing");
                $(this).removeClass('aperto').addClass('chiuso');
            } else {
                aperto = 1;
                console.log('valore di aperto: '+aperto);
                event.stopPropagation();
                $('.'+accContainer).stop().animate({
                    bottom: -(accContainerHeight - offsetElementHeight)
                }, 500, "swing");
                $(this).removeClass('chiuso').addClass('aperto');
            }
        });
    } else {
        // console.log('notrigger!!!');
    }
}
$.fn.centerElement = function () {
    this.css("position","absolute");
    if ($(window).width() > 480) {
        this.css("width", '100%');
        this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) - (($(this).outerHeight())/4)+100 + "px");
        this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
        return this;
    } else {
        this.css("width", '500px');
        this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) - (($(this).outerHeight())/4)+100 + "px");
        this.css("left", (($(this).parent().width() - $(this).width()) / 2) + "px");
        return this;
    }
}
$(document).ready(function(){
    $('#a-middle').centerElement();
    $.fn.sepLine('first-divider', 'swiper-container', 'accessori');
    $.fn.yammHeight('navbar-nav', 'yamm-content','riepilogo')
    $('.accessori').animate({opacity:'1'}, 1000, function() {
        $.fn.animateAccessoriBar('accessori','riepilogo','accessori-trigger','trigger');
        $('#a-middle').animate({opacity:'1'}, 1000)
        // $('.swiper-slide a').click(function() {
        //     $.fn.animateAccessoriBar('accessori','riepilogo','swiper-slide','trigger');
        //     // alert('click');
        //
        // })
    });
});

$(window).resize(function(){
    $('#a-middle').centerElement();
    $.fn.sepLine('first-divider', 'swiper-container', 'accessori');
    $.fn.yammHeight('navbar-nav', 'yamm-content','riepilogo')
    $.fn.animateAccessoriBar('accessori','riepilogo','accessori-trigger','notrigger');
});
