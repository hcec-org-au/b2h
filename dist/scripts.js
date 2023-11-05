const conf = {
  zoom: 9,
  lat: -33.0,
  long: 151.5833,
  coordRounding: 4
};

const icons = {
  corridors: {
    header: 'bi-lock-fill',
    on: 'bi-eye-fill',
    off: 'bi-eye-slash'
  },
  developments: {
    header: 'bi-tools',
    on: 'bi-eye-fill',
    off: 'bi-eye-slash'
  },
  overlays: {
    header: 'bi-card-checklist',
    on: 'bi-eye-fill',
    off: 'bi-eye-slash'
  },
  base: {
    header: 'bi-globe-asia-australia',
    on: 'bi-eye-fill',
    off: 'bi-eye-slash'
  }
}

// ########################################
const overlay_template = function(layer){
  let isVisible = layer.visible ? icons.overlays.on : icons.overlays.off;
  return `
    <div class="layer-1" onclick="set_base('${layer.uuid}')">
        <abbr title="toggle layer"><i id="base-${layer.uuid}" class="bi ${isVisible}"></i></abbr>
        ${layer.label}
    </div>
  `
}

// ########################################
const base_template = function(layer){
  let isVisible = layer.visible ? icons.base.on : icons.base.off
  return `
    <div class="layer-1" onclick="set_base('${layer.uuid}')">
        <abbr title="toggle layer"><i id="base-${layer.uuid}" class="bi ${isVisible}"></i></abbr>
        ${layer.label}
    </div>
  `
}

// ##############################################################
// main function          #######################################
async function build_map(layerConfig,map,map_layers) {
  // variables

  // let baseMaps = [];
  // let overlayMaps = [];
  // let uuids=[];
  // let map_layers = {};

  // map.cursor.enable();

  // get the layerConfig JSONL from a helper fuction
  // const layerConfig = await loadJsonl();

  // #######################################################
  // map click handler

  // function updateInfo() {
  //     // const { zState.centreLat, zState.centreLat } = map.getCenter();
  //     const zoom = map.getZoom();
  //     markerPlace.innerHTML = `center: ${lat.toFixed(5)}, ${lng.toFixed(
  //         5
  //     )} | zoom: ${zoom}`;
  // }


  // on drag end
  // map.on("dragend", updateInfo);

// on zoom end
// map.on('zoomend', function(ev) {
//    // console.log(ev.target_zoom);
//    document.getElementById('f3').innerHTML = `<b>Zoom level:</b> ${ev.target._zoom} `;
// });

// map.on('click', function(ev) {
//     // console.log(ev.latlng.lat,ev.latlng.lng); // ev is an event object (MouseEvent in this case)
//     // console.log(ev.containerPoint.x, ev.containerPoint.y);
//     // console.log(ev.type);
//     // console.log(ev);
//     document.getElementById('f2').innerHTML = `<b>Last click coords:</b> ${r(ev.latlng.lat)} ${r(ev.latlng.lng)}`;
// });
map.on('mousemove', function(ev){
    document.getElementById('f1').innerHTML = `<b>Mouse coords:</b> ${r(ev.latlng.lat)} ${r(ev.latlng.lng)}`;
});

  // Throttle fn
  //L.throttle(myFunction(){
  // )
  // EVENTS: resize, popup,

  // #######################################################
  // loop through the layerConfig array and create the leaflet layers
  layerConfig.forEach((layer) => {


    // if(layer.visible === 0){
    //   return;
    // }

    let uuid  = generateShortID();

    // make sure the uuid is unique
    while(uuid in map_layers) {
      uuid = generateShortID();
    }
    layer.uuid = uuid;

    map_layers[uuid]  = {
                        uuid:           uuid,
                        // type:           layer.type.trim(),
                        // url:            layer.url.trim(),
                        // label:          layer.label.trim(),
                        layerConfig:    layer,
                        visible:        layer.visible,
                        active:         layer.active,
                        layerGroup:     layer.layerGroup
                        // show:           function(){mapLayers[uuid].layerObject.addTo(leafletMap);return 1;},
                        // hide:           function(){mapLayers[uuid].layerObject.addTo(leafletMap);return 0;}
                        };

    if( layer.visible === 1 && layer.layerGroup === "BASE"){
        map_layers.baseLayer = uuid;
    }

    // ##################################################################
    // MAKE RIGHT HAND LAYER MENU FOR BASE LAYERS

    // ToDo: change code to case/switch
    // add 'DEVELOPMENT' & 'CORRIDOR'

    if (layer.layerGroup === 'BASE') {
      // console.log(layer.label, layer.displayOrder);
      let html = base_template(layer);
      document.getElementById('base_layers_div').innerHTML += html;
    }

    // MAKE RIGHT HAND LAYER MENU FOR OVERLAY LAYERS
    else {
      // console.log("   ", layer.layerType, '-', layer.label, '-', layer.displayOrder);
      let html = overlay_template(layer);
      document.getElementById('overlay_layers_div').innerHTML += html;
    }
    // ##################################################################


    // if (layer.visible !== 1) {
    //   // return; // skips the current iteration and continues with the next
    // }
    // ##################################################################
    // OSM - https://leafletjs.com/
    if (layer.layerType === 'osm') {

      map_layers[uuid].layerConfig = {
        // layers: layer.showLayers,
        // format: 'image/png',
        // transparent: layer.transparent === 1,
        // attribution: layer.label,
        url: layer.url
      }

      map_layers[uuid].layerObject = L.tileLayer(
        layer.url,
        layerConfig
      );

      if(layer.visible === 1){
        map_layers[uuid].layerObject.addTo(map);
      }
    }


    // ##################################################################
    // WMS - https://leafletjs.com/examples/wms/wms.html
    if (layer.layerType === 'wms') {

      map_layers[uuid].layerConfig = {
        layers: layer.showLayers,
        format: 'image/png',
        transparent: layer.transparent === 1,
        attribution: layer.label,
        url: layer.url
      }

      map_layers[uuid].layerObject = L.tileLayer.wms(
        layer.url,
        layerConfig
      );

      if(layer.visible === 1){
        map_layers[uuid].layerObject.addTo(map);
      }
    }


    // tiledMapLayer
    // if(layer.type === "tiledMap"){
    //     let opts = {
    //         layers:         layer.showLayers,
    //         format:         "image/png",
    //         transparent:    layer.transparent,
    //         attribution:    layer.label
    //     }
    //     // console.log(layer.url);
    //     console.log(opts);
    // };

    // GeoJSON - https://leafletjs.com/examples/geojson/
    // if(layer.type === "geojson") {
    //     // newLayer = L.esri.featureLayer(layer.url).addTo(map);
    // }

    // ##################################################################
    // ArcGIS feature layer
    if (layer.layerType === 'esriFeature') {

      map_layers[uuid].layerConfig = {
        url: layer.url
      }

      map_layers[uuid].layerObject = L.esri.featureLayer(layer.url);

      if(layer.visible === 1){
        map_layers[uuid].layerObject.addTo(map);
      }

    }

    // ##################################################################
    // ArcGIS MapServer layer
    //     L.esri.dynamicMapLayer({
    //       url: "https://mapprod3.environment.nsw.gov.au/arcgis/rest/services/EDP/Administrative_Boundaries/MapServer",
    //       layers: [0,1,2,3,4,5] // specifying the layer(s) to display
    //     }).addTo(map);

    if (layer.layerType === 'esriMapServer') {

      // console.log('esriMapServer:', layer.label)
      // newLayer = L.esri.dynamicMapLayer({
      //   url: layer.url,
      //   layers: layer.showLayers
      // }).addTo(map);


      map_layers[uuid].layerConfig = {
        url: layer.url,
        layers: layer.showLayers
      }

      map_layers[uuid].layerObject = L.esri.dynamicMapLayer(map_layers[uuid].layerConfig);

      if(layer.visible === 1){
        map_layers[uuid].layerObject.addTo(map);
      }

      // console.log(layer.url);
      // console.log(JSON.stringify(layer.showLayers))
    }

    // ##################################################################
    // vectorTileLayer - "Esri vector tile service" - via plugin
    // https://developers.arcgis.com/esri-leaflet/api-reference/layers/vector-layer/
    if (layer.layerType === 'esriVectorTile') {
      // newLayer = L.esri.Vector.vectorTileLayer(layer.url).addTo(map);

      map_layers[uuid].layerConfig = {
        url: layer.url
      }

      map_layers[uuid].layerObject = L.esri.Vector.vectorTileLayer(layer.url);

      if(layer.visible === 1){
        map_layers[uuid].layerObject.addTo(map);
      }
    }

    // ##################################################################
    // if (newLayer === {}) {
    //   console.log('Bad JSON Data;');
    //   console.log(layer);
    // }
    // else {
    //   if (newLayer && layer.layerGroup === 'BASE') {
    //     baseMaps[layer.label] = newLayer;
    //   }
    //   else {
    //     overlayMaps[layer.label] = newLayer;
    //   }
    // }

  })

  console.log(map_layers);
  return map_layers;
}
// L.control.layers(baseMaps).addTo(map);
// L.control.layers(baseMaps, overlayMaps).addTo(map);
// L.control.layers(overlayMaps).addTo(map);
// this.xxx = L.control.layers(baseMaps, overlayMaps)


/*
mapLayers
uuids in mapLayers
*/


const set_base = function (uuid){
  let id_name = "base-" + mapLayers.baseLayer;
  hide(mapLayers.baseLayer);
  document.getElementById(id_name).className = "bi bi-circle";

  id_name = "base-" + uuid;
  mapLayers.baseLayer = uuid;
  show(uuid);
  document.getElementById(id_name).className = "bi bi-circle-fill";
  // return mapLayers[uuid].layerGroup === "BASE"
}


const is_base = function (uuid){
  return mapLayers[uuid].layerGroup === "BASE"
}

const get_group = function (uuid){
  return mapLayers[uuid].layerGroup
}


const is_valid = function (uuid){
  return Object.keys(mapLayers).includes(uuid)
}

const is_visible = function (uuid){
   return is_valid(uuid) && mapLayers[uuid].visible === 1
}

const show = function (uuid){
    mapLayers[uuid].layerObject.addTo(leafletMap);
    mapLayers[uuid].visible = 1;
    console.log("show",uuid);
}

const hide = function (uuid){
    mapLayers[uuid].layerObject.remove();
    mapLayers[uuid].visible = 0;
    console.log("hide",uuid);
}

const list = function (){
  Object.keys(mapLayers).forEach(value => console.log(value));
}

const show_all = function (){
  Object.keys(mapLayers).forEach(value => {
    show(value);
  });
}

const hide_all = function (){
  Object.keys(mapLayers).forEach(value => {
    hide(value);
  });
}

const toggle = function (uuid){
  let id_name = "div-" + uuid;
  if (is_visible(uuid)){
    document.getElementById(id_name).className = "bi bi-eye";
    hide(uuid);
  }
  else{
    document.getElementById(id_name).className = "bi bi-eye-fill";
    show(uuid);
  }
}

// ##############################################################
// helper function - sort an array or objects
function sortArrayOfObjectsByKey(array, key) {
  return array.sort(function(a, b) {
    if (a[key] < b[key]) {
      return -1;
    } else if (a[key] > b[key]) {
      return 1;
    } else {
      return 0;
    }
  });
}

// ##############################################################
// helper coord rounding
function coordRounding(val) {
  return Number(val).toFixed(conf.coordRounding)
}

// ##############################################################
// generate a short pseudo random UUID
function generateShortID() {
  return Math.random().toString(36).substr(2, 9);
}


// ##################################################################
const consoleLogStuff = function (arr) {
  arr.forEach(function (value) {
    console.log(value, ':\n', JSON.stringify(eval(value)));
  });
}

// helper coord rounding ##########################################
function r(val){
  return Number(val).toFixed(conf.coordRounding)
}


// #######################################################
// map click handler
function updateInfo() {
    // const { zState.centreLat, zState.centreLat } = map.getCenter();
    const zoom = map.getZoom();
    markerPlace.innerHTML = `center: ${lat.toFixed(5)}, ${lng.toFixed(
        5
    )} | zoom: ${zoom}`;
}

let menuOpen      = document.getElementById('menu-toggle-open');
let menuClose     = document.getElementById('menu-toggle-close');
// let menuTop    = document.getElementById('menu-top-close');
let offcanvasMenu = document.getElementById('offcanvas-menu');

menuOpen.addEventListener('click', toggleMenuOpen);
menuClose.addEventListener('click', toggleMenuClose);
// menuTop.addEventListener('click', toggleMenuClose);

function toggleMenuClose(e) {
    e.preventDefault();
    offcanvasMenu.classList.toggle('show');
    menuOpen.style.display    = 'block';
    menuClose.style.display   = 'none';
}

function toggleMenuOpen(e) {
    if(e) {
      e.preventDefault();
    }
    offcanvasMenu.classList.toggle('show');
    menuOpen.style.display    = 'none';
    menuClose.style.display   = 'block';
}

// #######################################################
// helper function - load layer JSONL
async function loadJsonl() {
  let jsonData = []

  const response = await fetch(json_file);
  if (!response.ok) {                                               // throw an error if JSONL file ot found
    throw new Error('HTTP status ' + response.status);
  }
  const text = await response.text();
  const lines = text.split('\n').filter(Boolean);         // splits by newline and removes any empty lines

  lines.map(function(line) {                                       // loop through lines of JSONL
    if (!line.trim().startsWith('//')) {                           // ignore commented lines
      jsonData.push(JSON.parse(line));
    }
  });
  jsonData = sortArrayOfObjectsByKey(jsonData, 'displayOrder')     // sort by displayOrder Ascending

  // jsonData.reverse();
  // console.log("layerConfig loaded - layer count:", jsonData.length);
  return jsonData;
}

// const json_file = 'dist/layers.jsonl';
const json_file = 'src/data/layers.jsonl';



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

// leafletMap.cursor.enable();

// Zoom readout in base bar
document.getElementById('f3').innerHTML = `<b>Zoom level:</b> ${conf.zoom} `
leafletMap.on('zoomend', function(ev) {
  document.getElementById('f3').innerHTML = `<b>Zoom level:</b> ${ev.target._zoom} `;
});



async function main(mapLayers,leafletMap) {
  // build the base leaflet.js map


  // load and process the dynamic map layer config  JSONL file
  layerConfig = await loadJsonl();

  // build the righthand side map layer menu
  // buildTaxonomy(layerConfig);
  build_map(layerConfig,leafletMap,mapLayers);
}

main(mapLayers,leafletMap);

let overlay_active = null;

function overlay_on(id) {

    // different Overlay already active
    if (overlay_active && overlay_active!==id){
        document.getElementById(overlay_active).style.display = "none";
        overlay_active = id;
        document.getElementById(id).style.display = "block";
    }
    // selected Overlay already active - then turn off
    else if(overlay_active && overlay_active===id) {
        document.getElementById(id).style.display = "none";
        overlay_active = null;
    }
    // no Overlay active
    else{
        document.getElementById(id).style.display = "block";
        overlay_active = id;
    }
}

function overlay_off(elem) {
    elem.style.display = "none";
    overlay_active = null;
}

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

window.onload = function() {
  // console.log('HTML has fully loaded');
  setTimeout(toggleMenuOpen(), 2000);
};
