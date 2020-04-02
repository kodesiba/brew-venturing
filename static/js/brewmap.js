// Create the tile layer that will be the background of our map
var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
})

// Initialize all of the LayerGroups we'll be using
var layers = {
  BREWERIES: new L.LayerGroup()
};

// Create the map with our layers
var myMap = L.map("map-id", {
  center: [35.4, -80.01],
  zoom: 8,
  layers: [
    light,
    layers.BREWERIES
  ]
});

// Create an overlays object to add to the layer control
var overlays = {
  "Breweries": layers.BREWERIES
};

// Create a layer control, pass in the baseMaps and overlays. Add the layer control to the map
L.control.layers(null, overlays).addTo(myMap);

// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
}

// add legend
info.addTo(myMap)

// Initialize an object containing icons for each layer group
var icons = {
  BREWERIES: L.ExtraMarkers.icon({
    icon: "ion-beer",
    iconColor: "white",
    markerColor: "red"
  })
};

// pull in data and create map layers
d3.json("http://127.0.0.1:5000/api/v1.0/breweries", function(brewdat) {
  // create counter object
  var typeCount = {
    BREWERIES: 0
  }

  brewdat.forEach(dat => {
    // set variable for type
    // make marker if location exists
    if (dat.latitude) {
      typeCount['BREWERIES'] ++;
      var newMarker = L.marker([dat.latitude, dat.longitude], {
        icon: icons['BREWERIES']});

      // add marker to map
      newMarker.addTo(layers['BREWERIES'])
      if (dat.URL) {
        var link = `<br><a href="https://www.${dat.URL}" target="_blank">${dat.URL}</a><br>`
        }
      else {var link ='<br>'}
      newMarker.bindPopup(`${dat.CompanyName}${link}Google Rating: ${dat.google_rating}`)
    }
  });
  
  // update legend
  updateLegend(typeCount);
});

// Update the legend's innerHTML with the last updated time and station count
function updateLegend(typeCount) {
  document.querySelector(".legend").innerHTML = [
    "<p class='breweries'>Breweries: " + typeCount.BREWERIES + "</p>",
  ].join("");
}

// Assign the range slider to a variable
var rangeSlide =  $(".js-range-slider");
rangeSlide.ionRangeSlider({
    type: "double",
    min: 1990,
    max: 2020,
    from: 1990,
    to: 2020,
    grid: true,
    grid_snap: true,
    skin: "flat"
});


rangeSlide.on("change", function () {
  var inp = $(this);
  var from = inp.data("from");
  var to = inp.data("to");
  layers['BREWERIES'].clearLayers();

  console.log(from, to);

  // pull in data and create map layers
  d3.json("http://127.0.0.1:5000/api/v1.0/breweries", function(brewdat) {
    // create counter object
    var typeCount = {
      BREWERIES: 0
    }

    brewdat.forEach(dat => {
      if ( from <= +dat.YearEstablished && +dat.YearEstablished <= to)
      // set variable for type
      // make marker if location exists
      if (dat.latitude) {
        typeCount['BREWERIES'] ++;
        var newMarker = L.marker([dat.latitude, dat.longitude], {
          icon: icons['BREWERIES']});

        // add marker to map
        newMarker.addTo(layers['BREWERIES'])
        if (dat.URL) {
          var link = `<br><a href="https://www.${dat.URL}" target="_blank">${dat.URL}</a><br>`
          }
        else {var link ='<br>'}
        newMarker.bindPopup(`${dat.CompanyName}${link}Google Rating: ${dat.google_rating}`)
      }
    });
    
    // update legend
    updateLegend(typeCount);
  });
});
