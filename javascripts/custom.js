/*--------------------*/
/* FUNZIONI  GENERALI */
/*--------------------*/



/*-------------------------*/
/* FUNZIONI  CONFIGURATORE */
/*-------------------------*/

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

var aperto = 0;

/* funzione per apertura menu accessori in base all'altezza della viewport e con lo switch*/
$.fn.animateAccessoriBar = function(accContainer, offsetElement, triggerElement, trigger){
    var accContainerHeight = $('.'+accContainer).outerHeight();
    var offsetElementHeight = $('.'+offsetElement).outerHeight();
    var docHeight = $(window).height();

    /*if (docHeight > 600) {
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
    }*/

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

// ricalcola posizione e dimensione delle immagini delle borse al resize della finestra
$.fn.centerElement = function () {
    this.css("position","absolute");
    if ($(window).width() > 480 && $(window).height() > 600) {
        this.css("width", '100%');
        this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) - (($(this).outerHeight())/4)+100 + "px");
        this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
        return this;
    } else if ( $(window).height() < 600) {
        this.css("width", $(window).height()+150);
        this.css("top", $(".navbar").outerHeight());
        // this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) - (($(this).outerHeight())/4)+100 + "px");
        this.css("left", (($(this).parent().width() - $(this).width()) / 2) + "px");
        return this;
    };

}
