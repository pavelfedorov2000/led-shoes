$('.burger-btn').on('click', function () {
    $('.overlay').fadeIn('400');
    $('.burger-menu').addClass('burger-menu--active');
});

$('.menu__link, .burger-menu__link, .burger-menu__btn, .burger-menu__close').on('click', function () {
    $('.overlay').fadeOut('400');
    $('.burger-menu').removeClass('burger-menu--active');
});