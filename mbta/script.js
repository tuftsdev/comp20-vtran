var map;
    function initMap() {
       	map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 42.352271, lng: -71.05524200000001},
          zoom: 13
        });
      }

var location = [
	{station: "South Station",lat: 42.352271, lng: -71.05524200000001 },
	{station: "Andrew",lat: 42.330154 , lng: -71.057655},
	{station: "Porter Square",lat: 42.3884, lng: -71.11914899999999},
	{station: "Harvard Square",lat: 42.373362, lng: -71.118956},
	{station: "JFK/UMass",lat: 42.320685, lng: -71.052391 },
	{station: "Savin Hill",lat: 42.31129, lng: -71.053331},
	{station: "Park Street",lat: 42.35639457, lng: -71.0624242},
	{station: "Broadway",lat: 42.342622, lng: -71.056967},
	{station: "North Quincy",lat: 42.275275, lng: -71.029583},
	{station: "Shawmut",lat: 42.29312583, lng: -71.06573796000001},
	{station: "Davis",lat: 42.39674, lng: -71.121815},
	{station: "Alewife",lat: 42.395428, lng: -71.142483},
	{station: "Kendall/MIT",lat: 42.36249079, lng: -71.08617653},
	{station: "Charles/MGH",lat: 42.361166, lng: -71.070628},
	{station: "Downtown Crossing",lat: 42.355518, lng: -71.060225},
	{station: "Quincy Center",lat: 42.251809, lng: -71.005409},
	{station: "Quincy Adams",lat: 42.233391, lng: -71.007153},
	{station: "Ashmont",lat: 42.284652, lng: -71.06448899999999},
	{station: "Wollaston",lat: 42.2665139, lng: -71.0203369},
	{station: "Fields Corner",lat: 42.300093, lng: -71.061667},
	{station: "Central Square",lat: 42.365486, lng: -71.103802},
	{station: "Braintree",lat: 42.2078543, lng: -71.0011385}
];

var img = new Image();
img.src = 'redflag.png';
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

for (i = 0; i < location.length; i++) {
	var pos = new google.maps.LatLng(location[i].lat,location[i].lng);
	var marker = new google.maps.Marker({
          //position: {lat: latitide, lng: longitude},
          position: pos,
          map: map,
          title: location[i].station,
          icon: image
        });
}
