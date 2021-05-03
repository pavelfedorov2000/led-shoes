$('.faq__question').on('click', function () {
    $(this).parent().siblings().find('div.faq__answer').slideUp('400');
    $(this).parent().siblings().removeClass('faq__item--active');
    $(this).next().slideToggle('400');
    $(this).parent().toggleClass('faq__item--active');
});