// const json_file = 'dist/layers.jsonl';
const json_file = 'src/data/layers.jsonl';

// ToDo: separate this to a json config file...
const conf = {
  zoom: 9,
  lat: -33.0,
  long: 151.5833,
  coordRounding: 4
};

let zState = {
  mouseLat: 0,
  mouseLong: 0,
  mouseX: 0,
  mouseY: 0,
  centreLat: 0,
  centreLong: 0,
}


// map layer definitions object
let mapLayers = {};

let leafletMap = L.map('map').setView([conf.lat, conf.long], conf.zoom);
let leafletControl = L.control.layers().addTo(leafletMap);

async function main(mapLayers,leafletMap) {
  // build the base leaflet.js map


  // load and process the dynamic map layer config  JSONL file
  layerConfig = await loadJsonl();

  // build the righthand side map layer menu
  // buildTaxonomy(layerConfig);
  build_map(layerConfig,leafletMap,mapLayers);
}




main(mapLayers,leafletMap);
