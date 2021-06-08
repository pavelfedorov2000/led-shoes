$('.open-popup').magnificPopup({
    type: 'inline',
    zoom: {
        enabled: true,
        duration: 400,
        easing: 'ease-in-out',
    },
});

$('.open-popup').on('click', function () {
    $('.product-card__slider, .product-card__nav-slider').slick('setPosition');
});