// ########################################
const overlay_template = function(layer){
  let fill = layer.visible ? "-fill" : "";
  return `
    <div class="layer-1" onclick="console.log('${layer.uuid}')">
      &nbsp;<abbr title="${layer.uuid} - change visibility"><i class="bi bi-eye${fill}"></i></abbr>
    <!--      <abbr title="${layer.uuid}: this layer is visible - click to hide"><i class="bi bi-search"></i></abbr>-->
      ${layer.label}
    </div>
  `
}

// ########################################
const base_template = function(layer){
  let fill = layer.visible ? "-fill" : "";
  return `
    <div class="layer-1" onclick="console.log('${layer.uuid}')">
        &nbsp;<abbr title="${layer.uuid}: change visibility"><i class="bi bi-circle${fill}"></i></abbr>
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
// map.on('mousemove', function(ev){
//     document.getElementById('f1').innerHTML = `<b>Mouse coords:</b> ${r(ev.latlng.lat)} ${r(ev.latlng.lng)}`;
// });

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
                        show:           function(){mapLayers[uuid].layerObject.addTo(leafletMap);return 1;},
                        hide:           function(){mapLayers[uuid].layerObject.addTo(leafletMap);return 0;}
                        };

    // ##################################################################
    // MAKE RIGHT HAND LAYER MENU FOR BASE LAYERS
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

