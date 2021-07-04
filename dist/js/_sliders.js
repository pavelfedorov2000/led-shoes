$('.sale__cards').slick({
    slidesToShow: 6,
    arrows: false,
    centerMode: true,
    variableWidth: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                centerMode: false,
            }
        },
    ]
});

$('.reviews-slider').slick({
    slidesToShow: 3,
    arrows: false,
    centerMode: true,
    variableWidth: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: "unslick",
        },
    ]
});

$('.product-card__slider').slick({
    slidesToShow: 1,
    arrows: false,
    fade: true,
    asNavFor: '.product-card__nav-slider',
});
$('.product-card__nav-slider').slick({
    slidesToShow: 4,
    asNavFor: '.product-card__slider',
    arrows: false,
    focusOnSelect: true,
});