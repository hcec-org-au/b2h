/*
mapLayers
uuids in mapLayers
*/

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
