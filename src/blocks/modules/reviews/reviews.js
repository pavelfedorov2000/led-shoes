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

/* window.addEventListener("resize", function () {
    if (window.innerWidth <= 1023) {
        $('.reviews-slider').slick('unslick');
        sliderIsLive = false;
    }
    else {
        if (sliderIsLive) {
            $('.reviews-slider').slick();
            sliderIsLive = true;
        }
    }
}); */