// Initialize the map to a chosen geographical coordinates and a zoom level
var map = L.map('map').setView([-32, 150], 7); // Set to New South Wales coordinates

// Add the ArcGIS MapServer layer
L.esri.dynamicMapLayer({
    url: "https://mapprod3.environment.nsw.gov.au/arcgis/rest/services/EDP/Administrative_Boundaries/MapServer",
    layers: [0,1,2,3,4,5] // specifying the layer(s) to display
}).addTo(map);
