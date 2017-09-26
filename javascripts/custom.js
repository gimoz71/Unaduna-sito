// $('.carousel').carousel()
// $(document).on('click', '.yamm .dropdown-menu', function(e) {
//     e.stopPropagation();
// })
// /*Tooltip*/
// $(function() {
//     $('[data-toggle="tooltip"]').tooltip();
// });


/*------------------------------------*/
/* gestione mini header quando scrolla verso il basso */
/*------------------------------------*/

// var upperMenuTot = $(".first-top-menu").outerHeight() + $(".last-top-menu").outerHeight();
//
// console.log(upperMenuTot);
//
// $(window).scroll(function (event) {
//     var scroll = $(window).scrollTop();
//     if (scroll >= upperMenuTot){
//         $(".content").css("margin-top", "130px");
//         $('#top-link-block').removeClass('hidden');
//     } else {
//         $(".content").css("margin-top", "0px");
//         $('#top-link-block').addClass('hidden');
//
//     };
// });
//
// var affixElement = '#block-main';
//
// $(affixElement).affix({
//     offset: {
//         // Distance of between element and top page
//         top: function() {
//             return (this.top = $(affixElement).offset().top);
//         },
//         // when start #footer
//         bottom: function() {
//             return (this.bottom = $('#footer').outerHeight(true))
//         }
//     }
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

/*------------------------------------*/
/* settaggio spinner borse */
/*------------------------------------*/

$(function() {
    $('.spritespin').spritespin({
        width: 960,
        height: 512,
        source: SpriteSpin.sourceArray('/gallery/3d/test/image{frame}.png', {
            frame: [1, 8],
            digits: 4
        }),
        sense: 2,
        responsive: true,
        animate: false,
        mods: [
            // module that changes frame on drag
            'drag',
            // module that eases out an animation after mouse is released
            'ease',
            // module to display array or sprite of images
            '360'//,
            // module that render and fades additional frames to somulate blur
            // 'blur'
        ]//,
        // if true the blur module will make use of css blur
        // blurCss: true
    });
});
$(window).ready(function(){
    $('<div class="first-divider"></div>' ).appendTo('.accessori');
    $('#a-middle').css('margin-top', function () {
        return ($(window).height() - $(this).height()) / 4
    });
    $('.first-divider').css('top', function () {
        return ($('.swiper-container').height());
    });
});
$(window).resize(function(){
    $('#a-middle').css('margin-top', function () {
        return ($(window).height() - $(this).height()) / 4
    });
    $('.first-divider').css('top', function () {
        return ($('.swiper-container').height())
    });
});
