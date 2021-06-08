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