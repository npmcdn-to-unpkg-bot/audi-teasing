    new Maplace({
    map_div: '#gmap',
    locations: LocsA,
    start: 1,
    styles: styles,
    show_markers : true,
    type: 'directions',
    directions_panel: '#gmap-route',
    map_options: {
        zoom: 6,
        scrollwheel :false,
        minZoom : 4
    },
   styles: {
        'Night': [{
            featureType: 'all',
            stylers: [
                { invert_lightness: 'true' }
            ]
        }],
        'Greyscale': [{
            featureType: 'all',
            stylers: [
                { saturation: -100 },
                { gamma: 2 }
            ]
        }]
    }
}).Load();

