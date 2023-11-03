// First, we initialize the map and set its view to our chosen geographical coordinates and a zoom level
var map = L.map('map').setView([-32, 150], 7); // Set to New South Wales coordinates

// Then we add ArcGIS feature layer
L.esri.featureLayer({
    url: 'https://portal.spatial.nsw.gov.au/server/rest/services/NSW_Administrative_Boundaries_Theme/FeatureServer/1',
}).addTo(map);
