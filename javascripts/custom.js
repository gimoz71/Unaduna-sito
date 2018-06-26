/*--------------------*/
/* FUNZIONI  GENERALI */
/*--------------------*/



/*-------------------------*/
/* FUNZIONI  CONFIGURATORE */
/*-------------------------*/

// set variabili varie

var aperto = 0; // bool aprtrura menu settata su chiuso

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

    // automatismo in base all'altezza del browser
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

    // apertura chiusura in base al click sulla linguetta
    // if (trigger == 'trigger') {
    //     $('.'+triggerElement).click(function() {
    //         if (aperto == 1) {
    //             aperto = 0;
    //             console.log('valore di aperto: '+aperto);
    //             event.stopPropagation();
    //             $('.'+accContainer).stop().animate({
    //                 bottom: offsetElementHeight
    //             }, 500, "swing");
    //             $(this).removeClass('aperto').addClass('chiuso');
    //             $("#a-middle").centerElement();
    //         } else {
    //             aperto = 1;
    //             console.log('valore di aperto: '+aperto);
    //             event.stopPropagation();
    //             $('.'+accContainer).stop().animate({
    //                 bottom: -(accContainerHeight - offsetElementHeight)
    //             }, 500, "swing");
    //             $(this).removeClass('chiuso').addClass('aperto');
    //             $("#a-middle").centerElement();
    //         }
    //     });
    // } else {
    //     // console.log('notrigger!!!');
    // }
}

// ricalcola posizione e dimensione delle immagini delle borse al resize della finestra
/*$.fn.centerElement2 = function () {
    this.css("position","absolute");
    this.css("top", $(".navbar").outerHeight());

    var elemSize = $(window).height()-$(".navbar").outerHeight()-$(".accessori").outerHeight()-$(".riepilogo").outerHeight();
    var elementMaxHeight = 960 + $(".navbar").outerHeight()+$(".accessori").outerHeight()+$(".riepilogo").outerHeight();

    if ($(window).width() > 480 && $(window).height() > elementMaxHeight) {
        this.css("width", '100%');
        // this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) - (($(this).outerHeight())/4)+100 + "px");
        this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
        return this;
    } else if ( $(window).height() < elementMaxHeight) {
        this.css("width", elemSize + (elemSize/12)).css("left", (($(this).parent().width() - $(this).width()) / 2) + "px");
        return this;
    };

}*/


$.fn.parentResize = function() {
    var elemSize = $(window).height() - $(".navbar").outerHeight() - $(".accessori").outerHeight() - $(".riepilogo").outerHeight();
    this.css("position", "absolute").css("top", $(".navbar").outerHeight()).css("height", elemSize).css("width", $(window).width());
    
    
    var elHeight = $("#a-middle").outerHeight()-60;
    var elWidth = $("#a-middle").outerWidth()-100;
    var scale;

    scale = Math.min(
        this.width() / elWidth,
        this.height() / elHeight
    );

    $("#a-middle").css({
        transform: "translate(-50%, -50%) " + "scale(" + scale + ")"
    }).css("margin-top", "2%");

}

