// Creating map object
var myMap = L.map("map", {
  center: [45.52, -122.67],
  zoom: 13
});
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// // Grab the data with d3
// d3.json("http://127.0.0.1:5000/api/v1.0/breweries", function(resp) {
// // Create a new marker cluster group
// var markers = L.markerClusterGroup();

// // Loop through data
// resp.forEach(r => {
//     // Set the data location property to a variable
//     var location = r.latitude;
//     // Check for location property
//     if (location) {
//     // Add a new marker to the cluster group and bind a pop-up
//     markers.addLayer(L.marker([r.latitude, r.longitude])
//     .bindPopup(r.name));
//     }
// })
// // Add our marker cluster layer to the map
// // myMap.addLayer(markers);

// });
