$('.product-card__slider').slick({
    arrows: false,
    fade: true,
    //variableWidth: true,
    asNavFor: '.product-card__nav-slider'
});
$('.product-card__nav-slider').slick({
    slidesToShow: 4,
    asNavFor: '.product-card__slider',
    //centerMode: true,
    focusOnSelect: true,
    variableWidth: true,
    arrows: false,
});