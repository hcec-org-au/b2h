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
