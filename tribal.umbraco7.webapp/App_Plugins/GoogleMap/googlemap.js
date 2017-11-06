var googleMap = function (location, options) {

    var defaults = {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        controls: ['GSmallZoomControl3D'],
        styles: [
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#444444"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#46bcec"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }
        ]
    };

    options = $.extend(defaults, options || {});

    if (location) {
        value = $.trim(location);
        var point = location.split(',');
        options.dotLat = parseFloat(point[0]);
        options.dotLng = parseFloat(point[1]);
        options.pinLat = parseFloat(point[2]);
        options.pinLng = parseFloat(point[3]);
        options.zoom = 6;
    };

    var locations = [
       ['Dot', options.dotLat, options.dotLng, "https://www.google.com/intl/en_us/mapfiles/ms/micons/red-dot.png", 1],
       ['Pin', options.pinLat, options.pinLng, "https://www.google.com/intl/en_us/mapfiles/ms/micons/orange-dot.png", 2]
    ];

    console.log('locations', locations);

    var infowindow = new google.maps.InfoWindow();
    var center = new google.maps.LatLng(options.dotLat, options.dotLng);
    var map = new google.maps.Map(document.getElementById("map_container"), $.extend(options, { center: center }));
    var bounds = new google.maps.LatLngBounds();

    for (i = 0; i < locations.length; i++) {

        if (!isNaN(locations[i][1]) && !isNaN(locations[i][2])) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                map: map,
                icon: locations[i][3]
            });

            //extend the bounds to include each marker's position
            bounds.extend(marker.position);

            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent(locations[i][0]);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }
    }

    map.fitBounds(bounds);
    var listener = google.maps.event.addListener(map, "idle", function () {
        if (map.getZoom() > 9) map.setZoom(9);
        google.maps.event.removeListener(listener);
    });
};


$(document).on('click', 'a', function () {

    if ($(this).attr('data-toggle') == "tab") {

        if ($(this).attr('href') == "#tab19") {

            var $scope = angular.element('#myId').scope();

            console.log('$scope', $scope);

            // Method to call in your Angular Controller
            $scope.setMap();
            // Digest the changes done by the controller
            $scope.$apply();
        }

    }

});