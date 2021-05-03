$("a[href^='#']").click(function () {
    const href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(href).offset().top + "px" });
    return false;
});