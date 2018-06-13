var map;
    function initMap() {
    	var location = [
	{station: "Alewife",lat: 42.395428, lng: -71.142483},
	{station: "Davis",lat: 42.39674, lng: -71.121815},
	{station: "Porter Square",lat: 42.3884, lng: -71.11914899999999},
	{station: "Harvard Square",lat: 42.373362, lng: -71.118956},
	{station: "Central Square",lat: 42.365486, lng: -71.103802},
	{station: "Kendall/MIT",lat: 42.36249079, lng: -71.08617653},
	{station: "Charles/MGH",lat: 42.361166, lng: -71.070628},
	{station: "Park Street",lat: 42.35639457, lng: -71.0624242},
	{station: "Downtown Crossing",lat: 42.355518, lng: -71.060225},
	{station: "South Station",lat: 42.352271, lng: -71.05524200000001 },
	{station: "Broadway",lat: 42.342622, lng: -71.056967},
	{station: "Andrew",lat: 42.330154 , lng: -71.057655},
	{station: "JFK/UMass",lat: 42.320685, lng: -71.052391 },
	{station: "North Quincy",lat: 42.275275, lng: -71.029583},
	{station: "Wollaston",lat: 42.2665139, lng: -71.0203369},
	{station: "Quincy Center",lat: 42.251809, lng: -71.005409},
	{station: "Quincy Adams",lat: 42.233391, lng: -71.007153},
	{station: "Braintree",lat: 42.2078543, lng: -71.0011385},
	{station: "Savin Hill",lat: 42.31129, lng: -71.053331},
	{station: "Fields Corner",lat: 42.300093, lng: -71.061667},
	{station: "Shawmut",lat: 42.29312583, lng: -71.06573796000001},
	{station: "Ashmont",lat: 42.284652, lng: -71.06448899999999},	
];


       	map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 42.352271, lng: -71.05524200000001},
          zoom: 13
        });


for (i = 0; i < location.length; i++) {
	var pos = new google.maps.LatLng(location[i].lat,location[i].lng);
	var marker = new google.maps.Marker({
          //position: {lat: latitide, lng: longitude},
          position: pos,
          map: map,
          title: location[i].station,
          icon: 'train.png'
        });
}

// var img = new Image();
// img.src = 'redflag.png';
// function createMarker(station, latitude, longitude) {
// 	var pos = new google.maps.LatLng(latitide,longitude);
// 	var marker = new google.maps.Marker({
//           //position: {lat: latitide, lng: longitude},
//           position: pos,
//           map: map,
//           title: station,
//           icon: image
//         });
// }



var route1 = [];
for (i = 0; i < 13; i++) {
	var stop =  {lat: location[i].lat, lng: location[i].lng};
	route1.push(stop);
}

var route2 = [];
for (i = 12; i < 18; i++) {
	var stop =  {lat: location[i].lat, lng: location[i].lng};
	route2.push(stop);
}

var route3 = [{lat: location[12].lat, lng: location[12].lng}];
for (i = 18; i < 22; i++) {
	var stop =  {lat: location[i].lat, lng: location[i].lng};
	route3.push(stop);
}

var fullroute = [route1, route2, route3];

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
      }

//<div>Icons made by <a href="https://www.flaticon.com/authors/pixel-buddha" title="Pixel Buddha">Pixel Buddha</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>


