
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

      
        marker.addListener('click', function(){
            InfoWindowControls.populateInfoWindow(this, largeInfoWindow);
        });

    }


      ko.applyBindings(new MapViewModel());


    }

var InfoWindowControls = {


    getLatLng: function(marker){
        var markerposition = marker.getPosition();
        return markerposition;
    },
    
    populateInfoWindow: function(marker, infowindow){

        var latlong = InfoWindowControls.getLatLng(marker).toString();
        var noparens = latlong.slice(1, -1);
        noparens.replace(" ", "")
              $.ajax({
                    url: "https://api.foursquare.com/v2/venues/search",
                    method: "GET",
                    cache: true,
                    data:{
                    client_secret: "LUNMTE4AERJGM3IRPKODWP1Q1GQZTEJJTEQRBESXYVKOO203",
                    v: "20170711",
                    client_id: "OSUZQUW5J2LQFH1LUSHO1SYJ52MNYANNC0KU5AOZAUI4AMZK",
                    ll: noparens,
                    limit: "1",
                    },
                    dataType: "json",
                    success: function(result){
                        console.log(result);

                    infowindow.setContent("<h1>"+ marker.title + "</h1>" +"<p> Category: " + result.response.venues[0].categories[0].name + "</p>" +
                        "<p> Check Ins: " + result.response.venues[0].stats.checkinsCount + "</p>");
                    infowindow.open(map, marker);
                        },
            });


            
        }
}

var MapViewModel = function(){

    var self = this;

    this.markerList = ko.observableArray();

    this.selectedMarkers = ko.observableArray();

    var infowindow = new google.maps.InfoWindow();

    markers.forEach(function(marker){
        self.markerList.push(marker);
        console.log(marker);
    });

    this.displayInfoWindow = function(marker){
            console.log(marker);
            InfoWindowControls.getLatLng(marker);
            InfoWindowControls.populateInfoWindow(marker, largeInfoWindow);
          
        }



}



    









