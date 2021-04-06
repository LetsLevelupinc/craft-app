var map = L.map('map').setView([37.8, -96], 4);

var MtbMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
    maxZoom: 18 
}).addTo(map);

L.geoJson(statesData).addTo(map);


function getColor(d) {
    return d > 2000 ? '#800026' :
           d > 1000  ? '#BD0026' :
           d > 500  ? '#E31A1C' :
           d > 300  ? '#FC4E2A' :
           d > 100   ? '#FD8D3C' :
           d > 50   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.count),
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.5
    };
}

L.geoJson(statesData, {style: style}).addTo(map);

var geojson;

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 3,
        color: 'yellow',
        dashArray: '3',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Show:</h4> <h4><a href="/ipa">IPA</a> | <a href="/stout">Stout</a> | <a href="/porter">Porter</a> | <a href="/sour">Sour</a> | <a href="/wheatbeer">Wheat Beers</a> | <a href="/ale">Ales</a> |<h3>Craft Beer HeatMap</h3>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.count + ' beer reviewers'
        : 'Hover over a state to get a <br> total count of reviewers!<p style="text-align: right;"><a href="/" style="color: gray;"><em>Go Back</em></a></p>');
};


info.addTo(map);
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 50, 100, 300, 500, 1000, 2000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);