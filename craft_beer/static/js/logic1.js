// data to pull in -
var logData = "./static/data/breweries.json"

d3.json(logData, function(response) {
  console.log(response)

  lat = [];
  lng = [];
  names = [];
  types = [];
  cities = [];
  states = [];

  /// make arrays of values
  Object.entries(response).forEach(([key, values]) => {
    //console.log(key, value)
    if (key == "lat") {
      Object.values(values).forEach(value => {
        if (value == null) {
          lat.push(0)
        } else {
          lat.push(parseFloat(value))
        }
      });
    }
    if (key == "lng")  {
      Object.values(values).forEach(value => {
        if (value == null) {
          lng.push(0)
        } else {
          lng.push(parseFloat(value))
        }
      });
    }
    if (key == "name") {
      Object.values(values).forEach(value => {
        names.push(value)
      });
    }
    if (key == "brewery_type") {
      Object.values(values).forEach(value => {
        types.push(value)
      });
    }
    if (key == "city") {
      Object.values(values).forEach(value => {
        cities.push(value)
      });
    }
    if (key == "state") {
      Object.values(values).forEach(value => {
        states.push(value)
      });
    }
  });

  // create a coordinate set
  var coords = lat.map(function(e, i) {
    return [e, lng[i]];
  });

  // zip
  var combined = coords.map(function(e, i) {
    return [e, types[i], names[i], cities[i], states[i]]
  });

  console.log(combined);

  // beer icon
  var beerIcon = L.icon({
    iconUrl: "./static/imgs/markersize_med.png",
    shadowUrl: "./static/imgs/markersizeShadow_med.png",

    iconSize:     [26, 50], // size of the icon
    shadowSize:   [55, 49], // size of the shadow
    iconAnchor:   [10, 45], // point of the icon which will correspond to marker's location
    shadowAnchor: [-2, 45],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });


  // micro, regional, brewpub, large, planning, bar, contract, proprietor
  microMarkers = [];
  regionalMarkers = [];
  brewPubMarkers = [];
  largeMarkers = [];
  planningMarkers = [];
  contractMarkers = [];
  proprietorMarkers = [];

  // brewery pop up & icons
  for (var i = 0; i < combined.length; i++) {
    if (combined[i][1] == "micro") {
      microMarkers.push(
        L.marker(combined[i][0], {icon: beerIcon})
        .bindPopup("<h1>" + combined[i][2] + "</h1> <hr> <h3>" + combined[i][3] + ", " + combined[i][4] + " <br>  Brewery Type: " + combined[i][1] + "</h3>")
      )
    }
    if (combined[i][1] == "brewpub") {
      brewPubMarkers.push(
        L.marker(combined[i][0], {icon: beerIcon})
        .bindPopup("<h1>" + combined[i][2] + "</h1> <hr> <h3>" + combined[i][3] + ", " + combined[i][4] + " <br>  Brewery Type: " + combined[i][1] + "</h3>")
      )
    }
    if (combined[i][1] == "regional") {
      regionalMarkers.push(
        L.marker(combined[i][0], {icon: beerIcon})
        .bindPopup("<h1>" + combined[i][2] + "</h1> <hr> <h3>" + combined[i][3] + ", " + combined[i][4] + " <br>  Brewery Type: " + combined[i][1] + "</h3>")
      )
    }
    if (combined[i][1] == "large") {
      largeMarkers.push(
        L.marker(combined[i][0], {icon: beerIcon})
        .bindPopup("<h1>" + combined[i][2] + "</h1> <hr> <h3>" + combined[i][3] + ", " + combined[i][4] + " <br>  Brewery Type: " + combined[i][1] + "</h3>")
      )
    }
    if (combined[i][1] == "planning") {
      planningMarkers.push(
        L.marker(combined[i][0], {icon: beerIcon})
        .bindPopup("<h1>" + combined[i][2] + "</h1> <hr> <h3>" + combined[i][3] + ", " + combined[i][4] + " <br>  Brewery Type: " + combined[i][1] + "</h3>")
      )
    }
    if (combined[i][1] == "contract") {
      contractMarkers.push(
        L.marker(combined[i][0], {icon: beerIcon})
        .bindPopup("<h1>" + combined[i][2] + "</h1> <hr> <h3>" + combined[i][3] + ", " + combined[i][4] + " <br>  Brewery Type: " + combined[i][1] + "</h3>")
      )
    }
    if (combined[i][1] == "proprietor") {
      proprietorMarkers.push(
        L.marker(combined[i][0], {icon: beerIcon})
        .bindPopup("<h1>" + combined[i][2] + "</h1> <hr> <h3>" + combined[i][3] + ", " + combined[i][4] + " <br>  Brewery Type: " + combined[i][1] + "</h3>")
      )
    }
  }

  // layer groups
  var micro = L.layerGroup(microMarkers);
  var brewPub = L.layerGroup(brewPubMarkers);
  var regional = L.layerGroup(regionalMarkers);
  var large = L.layerGroup(largeMarkers);
  var planning = L.layerGroup(planningMarkers);
  var contract = L.layerGroup(contractMarkers);
  var proprietors = L.layerGroup(proprietorMarkers);

  var overlayMaps = {
    "Micro Breweries": micro,
    "BrewPub Breweries": brewPub,
    "Proprietors": proprietors,
    "Large Breweries": large,
    "Regional Breweries": regional,
    "Contractors": contract,
    "Planned Bars": planning
  }

  var myMap = L.map("map", {
    center: [39.82, -98.57],
    zoom: 3,
    layers: [micro, brewPub, regional, large, planning, contract, proprietors]
    });

  // adding tile layers
  var mainMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
  }).addTo(myMap);

  var pencilMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.pencil",
  accessToken: mapBoxAccessToken
  });

  var darkMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom:18,
  id: "mapbox.dark",
  accessToken: mapBoxAccessToken
  });

  // basemaps object
  var baseMaps = {
    "Main Map": mainMap,
    "Pencil Map": pencilMap,
    "Dark Map": darkMap
  };

  // control window
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
});