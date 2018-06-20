var map;
function initMap() {
    var location = [
		{station: "Alewife",lat: 42.395428, lng: -71.142483, id: "place-alfcl"},
		{station: "Davis",lat: 42.39674, lng: -71.121815, id: "place-davis"},
		{station: "Porter Square",lat: 42.3884, lng: -71.11914899999999, id: "place-portr"},
		{station: "Harvard Square",lat: 42.373362, lng: -71.118956, id: "place-harsq"},
		{station: "Central Square",lat: 42.365486, lng: -71.103802, id: "place-cntsq"},
		{station: "Kendall/MIT",lat: 42.36249079, lng: -71.08617653, id: "place-knncl"},
		{station: "Charles/MGH",lat: 42.361166, lng: -71.070628, id: "place-chmnl"},
		{station: "Park Street",lat: 42.35639457, lng: -71.0624242, id: "place-pktrm"},
		{station: "Downtown Crossing",lat: 42.355518, lng: -71.060225, id: "place-dwnxg"},
		{station: "South Station",lat: 42.352271, lng: -71.05524200000001, id: "place-sstat"},
		{station: "Broadway",lat: 42.342622, lng: -71.056967, id: "place-brdwy"},
		{station: "Andrew",lat: 42.330154 , lng: -71.057655, id: "place-andrw"},
		{station: "JFK/UMass",lat: 42.320685, lng: -71.052391, id: "place-jfk" },
		{station: "North Quincy",lat: 42.275275, lng: -71.029583, id: "place-nqncy"},
		{station: "Wollaston",lat: 42.2665139, lng: -71.0203369, id: "place-wlsta"},
		{station: "Quincy Center",lat: 42.251809, lng: -71.005409, id: "place-qnctr"},
		{station: "Quincy Adams",lat: 42.233391, lng: -71.007153, id: "place-qamnl"},
		{station: "Braintree",lat: 42.2078543, lng: -71.0011385, id: "place-brntn"},
		{station: "Savin Hill",lat: 42.31129, lng: -71.053331, id: "place-shmnl"},
		{station: "Fields Corner",lat: 42.300093, lng: -71.061667, id: "place-fldcr"},
		{station: "Shawmut",lat: 42.29312583, lng: -71.06573796000001, id: "place-smmnl"},
		{station: "Ashmont",lat: 42.284652, lng: -71.06448899999999, id: "place-asmnl"},	
	];

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 42.352271, lng: -71.05524200000001},
          zoom: 13
    });

    // add markers 
	for (i = 0; i < location.length; i++) {
		var pos = new google.maps.LatLng(location[i].lat,location[i].lng);
		var marker = new google.maps.Marker({
	          position: pos,
	          map: map,
	          title: location[i].station,
	          icon: 'train.png'
	        });

		requestSchedule(location[i].id, marker);
	}

	// begining of redline
	var route1 = [];
	for (i = 0; i < 13; i++) {
		var stop =  {lat: location[i].lat, lng: location[i].lng};
		route1.push(stop);
	}
	// split at JFK right
	var route2 = [];
	for (i = 12; i < 18; i++) {
		var stop =  {lat: location[i].lat, lng: location[i].lng};
		route2.push(stop);
	}
	// split at JFK left
	var route3 = [{lat: location[12].lat, lng: location[12].lng}];
	for (i = 18; i < 22; i++) {
		var stop =  {lat: location[i].lat, lng: location[i].lng};
		route3.push(stop);
	}

	var fullroute = [route1, route2, route3];
	// create polyline 
	for (i = 0; i < 3 ; i++) {
		var redline = new google.maps.Polyline({
		    path: fullroute[i],
		    geodesic: true,
		    strokeColor: '#FF0000',
		    strokeOpacity: 1.0,
		    strokeWeight: 2
		    });
		
		redline.setMap(map);
	}

    navigator.geolocation.getCurrentPosition(function(position) {
		success(position);
	});

	function success (position) {
		// my location
		var latitude  = position.coords.latitude;
    	var longitude = position.coords.longitude;
    	var myLatLng = {lat: latitude, lng: longitude};

    	var mygeo = new google.maps.Marker({
	        position: myLatLng,
	        map: map,
	        title: 'My Location',
	        icon: 'me.png'
        });
    	
    	// distance
    	var min = 9000000000000.0;
    	for (k = 0; k < location.length; k++) {
    		var pos = new google.maps.LatLng(location[k].lat,location[k].lng);
    		var myloc = new google.maps.LatLng(latitude,longitude);
		    var proximity = google.maps.geometry.spherical.computeDistanceBetween(myloc, pos);
		    if (proximity < min) {
		    	min = proximity;
		    	var stop = location[k].station;
		    	var redlat = (location[k].lat);
		    	var redlng = (location[k].lng);
		    }
    	}
    	var miles = proximity * 0.000621371192;

    	// polyline
    	var myline = new google.maps.Polyline({
		path: [{lat: redlat, lng: redlng},{lat: position.coords.latitude, lng: position.coords.longitude}],
		geodesic: true,
		strokeColor: '#9932CC',
		strokeOpacity: 1.0,
		strokeWeight: 2
		});
		
		myline.setMap(map);

    	// info window content
    	var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Closest MBTA Red Line subway station</h1>'+
            '<div id="bodyContent">'+
            '<p><b>Station: </b></p>'+
            stop + 
            '<p><b>Distance: </b></p>'+
          	miles + " miles" +
            '</div>'+
            '</div>';


    	var infowindow = new google.maps.InfoWindow({
        	content: contentString
    	});
        
        // set info window
        mygeo.addListener('click', function() {
        	infowindow.open(map, mygeo);
    	});
	}

	// JSON API
    function requestSchedule (stopid, marker) {

    	var info = "";
		var request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200){
				var text = JSON.parse(request.responseText);
				for (i = 0; i < text.data.length; i++) {
					if (text.data[i].attributes.direction_id == 0) {
						var dir = "South Bound"
					}
					else {
						var dir = "North Bound"
					}
					info += "Arrival: " + text.data[i].attributes.arrival_time + "\xa0\xa0" +
						"  Departure: " + text.data[i].attributes.departure_time + "\xa0\xa0" +
						"  Direction: " + dir + "<br>";
						
				}
				
				var contentString2 = '<div id="content">'+
		            '<div id="siteNotice">'+
		            '</div>'+
		            '<h1 id="firstHeading" class="firstHeading">Station Train Schedule</h1>'+
		            '<div id="bodyContent">'+
		            info +
		            '</div>'+
		            '</div>';

				var stationinfowindow = new google.maps.InfoWindow({
			        content: contentString2
			    });

			    marker.addListener('click', function() {
			        stationinfowindow.open(map, marker);
		    	});
			}
		};

		var link = "https://defense-in-derpth.herokuapp.com/redline/schedule.json?stop_id=" + stopid;
		request.open("GET", link, true);
		request.send();	  
	}
}

// //<div>Icons made by <a href="https://www.flaticon.com/authors/pixel-buddha" title="Pixel Buddha">Pixel Buddha</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
