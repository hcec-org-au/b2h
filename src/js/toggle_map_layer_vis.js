// Assuming 'map' is your Leaflet map object and 'layer' is the layer you want to check

const toggleLayer = function(i){
  let layer = mapLayers[i];

  if (map.hasLayer(layer)) {
    map.removeLayer(layer);
    console.log("The layer is on the map.");
  }
  else {
    map.addLayer(layer);
    console.log("The layer is not on the map.");
  }

}


