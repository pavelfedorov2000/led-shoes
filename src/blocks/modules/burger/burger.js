$('.burger-btn').on('click', function () {
    $('.overlay').fadeIn('400');
    //$('body').addClass('_lock');
    $('.burger-menu').addClass('burger-menu--active');
});

$('.menu__link, .burger-menu__close').on('click', function () {
    $('.overlay').fadeOut('400');
    //$('body').removeClass('_lock');
    $('.burger-menu').removeClass('burger-menu--active');
});