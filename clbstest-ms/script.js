function initMap() {
				map = new google.maps.Map(document.getElementById("map"), {
				center: new google.maps.LatLng(18.787611, 98.986819), 
				zoom: 9, 
				mapTypeId: google.maps.MapTypeId.ROADMAP, 
				mapTypeControl: true,
				scrollwheel: false, 
				mapTypeControlOptions: {
				style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR 
				},
				navigationControl: true, 
				navigationControlOptions: {
				style: google.maps.NavigationControlStyle.ZOOM_PAN 
				}
				});



				//Chiang Mai Marker
				var marker = new google.maps.Marker({
			    draggable: true,
  				animation: google.maps.Animation.DROP,
				position: {lat: 18.787611, lng: 98.986819},
				title:'Chiang Mai',
				map: map
			});
  
				// clik zoom on chiang mai city (1)
				 marker.addListener('click', function(event) {
				 	 map.setZoom(15);
   					 map.setCenter(marker.getPosition());
  				});

				// Double clic for super zoom	(2)			
				 marker.addListener('dblclick', function(event) {
    			 map.setZoom(20);
   				 map.setCenter(marker.getPosition());
  				});
				
				// New marker on clic
				google.maps.event.addListener(map, 'click', function (event) {
    				new google.maps.Marker({
					map: map,
					position: event.latLng
    				});
				});

				// Chiang mai information Flight Ticket
				var infowindow = new google.maps.InfoWindow({
   				 content: "<strong>Chiang Mai City</strong>" + '<a href="https://www.opodo.fr/"> Get A Flight Ticket For Chiang Mai</a>', 
   				 size: new google.maps.Size(100, 100)
				});
				google.maps.event.addListener(marker, 'click', function()
				{infowindow.open(map,marker);
				});

        // Add the circle for this city to the map.

      var circle = new google.maps.Circle({
            map: map,
            center: new google.maps.LatLng(18.787611, 98.986819),
            radius: 20000,
            strokeColor:"#00ff00",
            fillColor:"red",
            editable: true,
            draggable: true
            });


				//Searchbox ...
        var searchBox = new google.maps.places.SearchBox(document.getElementById('mapsearch'));
			  google.maps.event.addListener(searchBox, 'places_changed', function(){
          var places = searchBox.getPlaces ();
          var bounds = new google.maps.LatLngBounds();
          var i, place;
           for(i=0; place=places[i];i++){
             console.log(place.geometry.location);
             bounds.extend(place.geometry.location);
             market.setPosition(place.geometry.location);
           }

           mapfitBounds(bounds);
           map.setZoom(9);

        });
}
			// Fonction de callback : available user
function maPosition(position) {
 
    var infopos = "Position déterminée :\n";
    infopos += "Latitude : "+position.coords.latitude +"\n";
    infopos += "Longitude: "+position.coords.longitude+"\n";
    infopos += "Altitude : "+position.coords.altitude +"\n";
    infopos += "Vitesse  : "+position.coords.speed +"\n";
    document.getElementById("infoposition").innerHTML = infopos;
 
    // Un nouvel objet LatLng pour Google Maps avec les paramètres de position
    latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    // Ajout d'un marqueur à la position trouvée
    var marker = new google.maps.Marker({
      position: latlng,
      map: map,
      title:"You're Here"
    });
    
    // Center map
    map.panTo(latlng);
 
}

	// Function call back error
function erreurPosition(error) {
    var info = "Erreur lors de la géolocalisation : ";
    switch(error.code) {
    case error.TIMEOUT:
    	info += "Timeout !";
    break;
    case error.PERMISSION_DENIED:
	info += "Vous n’avez pas donné la permission";
    break;
    case error.POSITION_UNAVAILABLE:
    	info += "La position n’a pu être déterminée";
    break;
    case error.UNKNOWN_ERROR:
	info += "Erreur inconnue";
    break;
    }
    document.getElementById("infoposition").innerHTML = info;
}

if(navigator.geolocation) {
    survId = navigator.geolocation.getCurrentPosition(maPosition,erreurPosition);
} else {
    alert("This browser does not support geolocation");
}

			window.onload = function(){
				// Intialize Gmap Api
				initMap(); 
			};