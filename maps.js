
    var map;

      // Create a new blank array for all the listing markers.
    var markers = [];

    //Infowindow which is initialized later to display information about each marker
    var largeInfoWindow;

    //Location data of my favorite places
    var locations = [
          {title: 'Baby Blues BBQ', location: {lat: 34.0004, lng: -118.4654}},
          {title: 'Shoops Deli', location: {lat: 34.0039, lng: -118.4858}},
          {title: 'Casa Linda', location: {lat: 33.9923, lng: -118.4717}},
          {title: 'The Venice Whaler', location: {lat: 33.9790, lng: -118.4666}},
          {title: 'Jenis Ice Cream', location: {lat: 33.9986, lng: -118.4730}}

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
        var bounds = new google.maps.LatLngBounds();

        for(var i=0; i <locations.length; i++){

            var marker = new google.maps.Marker({
            map: map,
            position: locations[i].location,
            title: locations[i].title,
            animation: google.maps.Animation.DROP,
            });
            markers.push(marker);
            console.log(markers[i].title);
            bounds.extend(markers[i].position);

      
        marker.addListener('click', function(){
            InfoWindowControls.populateInfoWindow(this, largeInfoWindow);
            
        });

        marker.addListener('click', toggleBounce);
       

    }
     map.fitBounds(bounds);

    //Code from Google documentation to make marker bounce
    function toggleBounce() {
        if (this.getAnimation() !== null) {
          this.setAnimation(null);
        } else {
          this.setAnimation(google.maps.Animation.BOUNCE);

        }
      }


      //Apply Knockout bindings after the Map object has loaded
      ko.applyBindings(new MapViewModel());


    }

var InfoWindowControls = {

    //This is used to get the LatLong of a marker so I can pass it into the FourSquare API
    getLatLng: function(marker){
        var markerposition = marker.getPosition();
        return markerposition;
    },
    
    //This function opens and populates the InfowWindow with data I have input and FourSquare API data
    populateInfoWindow: function(marker, infowindow){
        //Formatting LatLong data for proper FourSquare URL format
        var latlong = InfoWindowControls.getLatLng(marker).toString();
        var noparens = latlong.slice(1, -1);
        noparens.replace(" ", "")
        //Ajax request calling the FourSquare API
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
                    //Success Callback populates and opens the InfoWindow
                    infowindow.setContent("<h1>"+ marker.title + "</h1>" +"<p> Category: " + result.response.venues[0].categories[0].name + "</p>" +
                        "<p> Check Ins: " + result.response.venues[0].stats.checkinsCount + "</p>");
                    infowindow.open(map, marker);
                    document.getElementById('clear').addEventListener('click', function(){
                        infowindow.close();
                    });
                        },
                    error: function (error) {
                         alert('We are unable to retrieve the data for this location');
              } 
            });


            
        },

        
}



var MapViewModel = function(){

    var self = this;

    this.markerList = ko.observableArray();

    this.selectedMarkers = ko.observableArray();


    this.filter = function(){
        self.markerList().forEach(function(marker){
            marker.setMap(null);
        });
        self.selectedMarkers().forEach(function(marker){
            marker.setMap(map);
        });
    }

    this.clearSelection= function(){
        this.markerList().forEach(function(marker){
             marker.setMap(map);
            });
        this.selectedMarkers([]);
    }

    this.selectAll = function(){
        this.selectedMarkers(this.markerList());
    }
    

    this.clearInfoWindow = function(){
        if(this.infowindow){
            this.infowindow.close();
        }
    }

    // var infowindow = new google.maps.InfoWindow();

    markers.forEach(function(marker){
        self.markerList.push(marker);
        console.log(marker);
    });

    this.displayInfoWindow = function(marker){
            console.log(marker);
            InfoWindowControls.getLatLng(marker);
            InfoWindowControls.populateInfoWindow(marker, largeInfoWindow);

        }

    this.chosenMarker = ko.observable(null);



    


}



    









