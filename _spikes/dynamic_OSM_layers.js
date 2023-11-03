var map = L.map("map").setView([-33.0833, 151.5833], 11);

var vectorTileLayers = [
  {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.pbf",
    options: {
      rendererFactory: L.canvas.tile,
      attribution: "OpenStreetMap",
      vectorTileLayerStyles: {
        water: { fill: true, fillColor: "#06cccc", fillOpacity: 0.2, stroke: true },
        admin: { weight: 1 },
        waterway: { color: "#2375e0", weight: 1 },
        landcover: { fill: true, fillColor: "#53e033", fillOpacity: 0.2, stroke: true },
        landuse: { fill: true, fillColor: "#e5b404", fillOpacity: 0.2 },
        park: { fill: true, fillColor: "#84ea5b", fillOpacity: 0.2 },
        boundary: { weight: 1, dashArray: "3, 3", color: "#c0c0c0" },
        aeroway: { color: "#51aeb5", weight: 1 },
        road:
          {
            weight: 1,
            color: "#f2b648",
            fillColor: "#f2b648",
            dashArray: "4",
            opacity: 0.5,
            fillOpacity: 0.5,
          },
      },
    },
  },
];

var overlayMaps = {};

for (var i = 0; i < vectorTileLayers.length; i++) {
  var layer = L.vectorGrid.protobuf(vectorTileLayers[i].url, vectorTileLayers[i].options).addTo(map);
  overlayMaps[vectorTileLayers[i].options.attribution] = layer;
}

L.control.layers(null, overlayMaps).addTo(map);
