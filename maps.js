
    var map;

      // Create a new blank array for all the listing markers.
    var markers = [];

    var largeInfoWindow;

    var locations = [
          {title: 'Baby Blues BBQ', location: {lat: 34.0004, lng: -118.4654}},
          {title: 'Shoops Deli', location: {lat: 34.0039, lng: -118.4858}},
          {title: 'Casa Linda', location: {lat: 33.9923, lng: -118.4717}},
          {title: 'The Venice Whaler', location: {lat: 33.9790, lng: -118.4666}}
        ];



      function initMap() {
        // Create a styles array to use with the map.  Got this from SnazzyMaps.
        var styles = [
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f7f1df"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#d0e3b4"
            }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#fbd3da"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#bde6ab"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffe15f"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#efd151"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "black"
            }
        ]
    },
    {
        "featureType": "transit.station.airport",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#cfb2db"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#a2daf2"
            }
        ]
    }
]


        // Constructor creates a new map - only center and zoom are required.
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 33.9850, lng: -118.4695},
          zoom: 14,
          styles: styles,
          mapTypeControl: false
        });

        // These are the real estate listings that will be shown to the user.
        // Normally we'd have these in a database instead.
        
        largeInfoWindow = new google.maps.InfoWindow();

        for(var i=0; i <locations.length; i++){

            var marker = new google.maps.Marker({
            map: map,
            position: locations[i].location,
            title: locations[i].title,
            animation: google.maps.Animation.DROP,
            id: i
            });
            markers.push(marker);
            console.log(markers[i].title);

        // marker.addListener('click', function() {
        //     populateInfoWindow(this, largeInfoWindow);
        //   });

        marker.addListener('click', function(){
            largeInfoWindow.setContent(this.title);
            largeInfoWindow.open(map, this);
        });

           

          
        };


        function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          // Clear the infowindow content to give the streetview time to load.
          infowindow.setContent(marker.title);
          infowindow.marker = marker;
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });

        infowindow.open(map, marker);
        }
      }

      ko.applyBindings(new MapViewModel());


    }


var MapViewModel = function(){

    var self = this;

    this.markerList = ko.observableArray();

    var infowindow = new google.maps.InfoWindow();

    markers.forEach(function(marker){
        self.markerList.push(marker);
        console.log(marker);
    });

    this.displayInfoWindow = function(marker){
            console.log(marker);
            largeInfoWindow.setContent(marker.title);
            largeInfoWindow.open(map, marker);
        }

}



    









