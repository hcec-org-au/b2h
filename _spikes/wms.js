// const url = "http://maps.six.nsw.gov.au/arcgis/services/public/NSW_Administrative_Boundaries/MapServer/WmsServer"

// First, we initialize the map and set its view to our chosen geographical coordinates and a zoom level
var map = L.map('map').setView([51.505, -0.09], 13);

// Then we add a WMS layer
L.tileLayer.wms('http://ows.mundialis.de/services/service', {
    layers: 'TOPO-OSM-WMS' // specify your layer here
    ,format: 'image/png'
    ,transparent: true
}).addTo(map);
