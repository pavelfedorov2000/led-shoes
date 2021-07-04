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