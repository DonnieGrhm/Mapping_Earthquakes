//The console.log() function with the phrase "working" inside the parentheses will help us confirm that
// our logic.js file is being accessed in the console on Chrome.

// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with center at the San Francisco airport.
//let map = L.map('mapid').setView([30, 30], 2);
// The setView() method sets the view of the map with a geographical center, where the first coordinate is latitude (40.7) and the second is longitude (-94.5).
// We set the zoom level of "4" on a scale 0–18.

//-----------------
/*An alternative to using the setView() method is to modify each attribute in the map object using the curly braces notation as follows:

// Create the map object with a center and zoom level.
let map = L.map("mapid", {
  center: [
    40.7, -94.5
  ],
  zoom: 4
});

This method is useful when we need to add multiple tile layers, or a background image of our maps, which we will do later in this module.
*/
// -------------------------------------------

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});


// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps. Toggle between the 2 maps.
let baseMaps = {
  "Streets" : streets,
  "Satellite Streets" : satelliteStreets
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto neighborhoods GeoJSON URL.
let eq7Days = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
}

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: "#ffae42",
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}

// Retrieve the earthquake GeoJSON data.
d3.json(eq7Days).then(function(data) {
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {

  // We turn each feature into a circleMarker on the map.
  
  pointToLayer: function(feature, latlng) {
              console.log(data);
              return L.circleMarker(latlng);
          },
          // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo
      }).addTo(map);
  });