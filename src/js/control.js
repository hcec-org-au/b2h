const show = function (uuid){
    mapLayers[uuid].layerObject.addTo(leafletMap);
    console.log("show",uuid);
}

const hide = function (uuid){
    mapLayers[uuid].layerObject.remove();
    console.log("hide",uuid);
}

const list = function (){
  Object.keys(mapLayers).forEach(value => console.log(value));
}

const show_all = function (){
  Object.keys(mapLayers).forEach(value => {
    mapLayers[value].layerObject.addTo(leafletMap);
    console.log("show",value);
  });
}

const hide_all = function (){
  Object.keys(mapLayers).forEach(value => {
    mapLayers[value].layerObject.remove();
    console.log("hide",value);
  });
}


const toggle = function (uuid){
  mapLayers[uuid].layerObject.remove();
  console.log("hide",uuid);
}
