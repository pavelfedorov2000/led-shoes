$(function () {

    $('.burger-btn').on('click', function () {
    $('.overlay').fadeIn('400');
    $('.burger-menu').addClass('burger-menu--active');
});

$('.menu__link, .burger-menu__link, .burger-menu__btn, .burger-menu__close').on('click', function () {
    $('.overlay').fadeOut('400');
    $('.burger-menu').removeClass('burger-menu--active');
});

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

    $('.faq__question').on('click', function () {
    $(this).parent().siblings().find('div.faq__answer').slideUp('400');
    $(this).parent().siblings().removeClass('faq__item--active');
    $(this).next().slideToggle('400');
    $(this).parent().toggleClass('faq__item--active');
});

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

    $("a[href^='#']").click(function () {
    const href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(href).offset().top + "px" });
    return false;
});

    function DynamicAdapt(type) {
    this.type = type;
}

DynamicAdapt.prototype.init = function () {
    const _this = this;
    // массив объектов
    this.оbjects = [];
    this.daClassname = "_dynamic_adapt_";
    // массив DOM-элементов
    this.nodes = document.querySelectorAll("[data-da]");

    // наполнение оbjects объктами
    for (let i = 0; i < this.nodes.length; i++) {
        const node = this.nodes[i];
        const data = node.dataset.da.trim();
        const dataArray = data.split(",");
        const оbject = {};
        оbject.element = node;
        оbject.parent = node.parentNode;
        оbject.destination = document.querySelector(dataArray[0].trim());
        оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
        оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.оbjects.push(оbject);
    }

    this.arraySort(this.оbjects);

    // массив уникальных медиа-запросов
    this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
        return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
    }, this);
    this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
        return Array.prototype.indexOf.call(self, item) === index;
    });

    // навешивание слушателя на медиа-запрос
    // и вызов обработчика при первом запуске
    for (let i = 0; i < this.mediaQueries.length; i++) {
        const media = this.mediaQueries[i];
        const mediaSplit = String.prototype.split.call(media, ',');
        const matchMedia = window.matchMedia(mediaSplit[0]);
        const mediaBreakpoint = mediaSplit[1];

        // массив объектов с подходящим брейкпоинтом
        const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
            return item.breakpoint === mediaBreakpoint;
        });
        matchMedia.addListener(function () {
            _this.mediaHandler(matchMedia, оbjectsFilter);
        });
        this.mediaHandler(matchMedia, оbjectsFilter);
    }
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
    if (matchMedia.matches) {
        for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.moveTo(оbject.place, оbject.element, оbject.destination);
        }
    } else {
        for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            if (оbject.element.classList.contains(this.daClassname)) {
                this.moveBack(оbject.parent, оbject.element, оbject.index);
            }
        }
    }
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
    element.classList.add(this.daClassname);
    if (place === 'last' || place >= destination.children.length) {
        destination.insertAdjacentElement('beforeend', element);
        return;
    }
    if (place === 'first') {
        destination.insertAdjacentElement('afterbegin', element);
        return;
    }
    destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== undefined) {
        parent.children[index].insertAdjacentElement('beforebegin', element);
    } else {
        parent.insertAdjacentElement('beforeend', element);
    }
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
    const array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
    if (this.type === "min") {
        Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) {
                    return 0;
                }

                if (a.place === "first" || b.place === "last") {
                    return -1;
                }

                if (a.place === "last" || b.place === "first") {
                    return 1;
                }

                return a.place - b.place;
            }

            return a.breakpoint - b.breakpoint;
        });
    } else {
        Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) {
                    return 0;
                }

                if (a.place === "first" || b.place === "last") {
                    return 1;
                }

                if (a.place === "last" || b.place === "first") {
                    return -1;
                }

                return b.place - a.place;
            }

            return b.breakpoint - a.breakpoint;
        });
        return;
    }
};

const da = new DynamicAdapt("max");
da.init();

    ymaps.ready(function () {

    if (typeof ymaps === 'undefined') {
        return;
    }

    const map_1 = new ymaps.Map('map-1', {
        // координаты места
        center: [55.707111, 37.692663],
        zoom: 17
    }, {
        searchControlProvider: 'yandex#search'
    }),

        map_1Placemark = new ymaps.Placemark(map_1.getCenter(), {
            // текст, который показывается при нажатии на метку
            balloonContent: `
						<address class="map__address">
                            ул. Южнопортовая 7с2
						</address>
						`
        }, {
            iconLayout: 'default#image',
            // метка
            iconImageHref: "./img/pin.svg",
            // размеры метки
            iconImageSize: [40, 40],
            //iconImageOffset: [-5, -38]
        });

    map_1.geoObjects.add(map_1Placemark);

    map_1.controls.remove('zoomControl');
    map_1.controls.remove('smallMapDefaultSet');
    map_1.controls.remove('routeButtonControl');
    map_1.controls.remove('largeMapDefaultSet');
    // отключаем скролл
    map_1.behaviors.disable('scrollZoom');

    const map_2 = new ymaps.Map('map-2', {
        // координаты места
        center: [55.707111, 37.692663],
        zoom: 17
    }, {
        searchControlProvider: 'yandex#search'
    }),

        map_2Placemark = new ymaps.Placemark(map_2.getCenter(), {
            // текст, который показывается при нажатии на метку
            balloonContent: `
						<address class="map__address">
                            ул. Южнопортовая 7с2
						</address>
						`
        }, {
            iconLayout: 'default#image',
            // метка
            iconImageHref: "./img/pin.svg",
            // размеры метки
            iconImageSize: [40, 40],
            //iconImageOffset: [-5, -38]
        });

    map_2.geoObjects.add(map_2Placemark);

    map_2.controls.remove('zoomControl');
    map_2.controls.remove('smallMapDefaultSet');
    map_2.controls.remove('routeButtonControl');
    map_2.controls.remove('largeMapDefaultSet');
    map_2.behaviors.disable('scrollZoom');
});

    $.validator.addMethod("minlenghtphone", function (value, element) {
    return value.replace(/\D+/g, '').length > 10;
});
$.validator.addMethod("requiredphone", function (value, element) {
    return value.replace(/\D+/g, '').length > 1;
});


function validateForms(form) {
    $(form).validate({
        rules: {
            name: "required",
            phone: {
                requiredphone: true,
                minlenghtphone: true,
            },
        },
        submitHandler: function () {
            $.magnificPopup.open({
                items: {
                    src: '#success',
                }
            });
            $('.form__input').removeClass('valid');
        },
    });
}

validateForms('#order-popup form');
validateForms('#product-card form');


$('form').submit(function (e) {
    e.preventDefault();

    $.ajax({
        type: "POST",
        url: "send.php",
        data: $(this).serialize(),
    });
    $(this).find("input").val("");
    $('form').trigger('reset');
    return false;
});

$.fn.setCursorPosition = function (pos) {
    if ($(this).get(0).setSelectionRange) {
        $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
        var range = $(this).get(0).createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
};

$("input[name=phone]").click(function () {
    $(this).setCursorPosition(4);
}).mask("+7 (999) 999-99-99");
});



