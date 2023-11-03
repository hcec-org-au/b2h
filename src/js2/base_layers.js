// help function to read the layers config file and return a javascript structure (JSON)

// const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQTqMJVTMWfoxbAwpr8n22CWaBMna1h9GpTdiIX67kWqAF7sR6vr2QTx4J6aDPYXlUuIU6XEpLxNwSf/pub?gid=0&single=true&output=csv';
const url = 'layers2.csv';


// remove trailer '\r'
function fixR(val){
    // remove trailer '\r'
    return val.replace('\r', '');
}

// remove surrounding square brackets
function remSquareBrackets(val){
    return val.replace('[', '').replace(']', '')
}

async function getBaseLayers() {
    const response      = await fetch(url);
    const data          = await response.text();
    const rows          = data.split('\n');

    // visible,active,displayOrder,uuid,layerGroup,label,type,url,transparent,showLayers
    const layerTemplate = {
        visible:        false,
        active:         false,
        displayOrder:   -1,
        uuid:           "",
        layerGroup:     "",
        label:          "",
        type:           "",
        url:            "",
        transparent:    false,
        showLayers:     ""
    }

    let layerConfigArray = []

    for (let i = 1; i < rows.length; i++) {
        const row                    = rows[i];
        const columns               = row.split(',');
        let show                   = Number(columns[0])===1;

        if(show){
            // let structuredClone          = structuredClone(layerTemplate);
            let structuredClone             = JSON.parse(JSON.stringify(layerTemplate));
            let j                           = layerConfigArray.push(structuredClone)-1

            // visible,active,displayOrder,uuid,layerGroup,label,type,url,transparent,showLayers
            layerConfigArray[j].visible       = Number(columns[0])===1;
            layerConfigArray[j].active        = Number(columns[1])===1;
            layerConfigArray[j].displayOrder  = Number(columns[2]);
            layerConfigArray[j].uuid          = columns[3];
            layerConfigArray[j].layerGroup    = columns[4];
            layerConfigArray[j].label         = columns[5];
            layerConfigArray[j].type          = columns[6];
            layerConfigArray[j].url           = columns[7];
            layerConfigArray[j].transparent   = Number(columns[8])===1;
            // layerConfigArray[j].showLayers    = remSquareBrackets(fixR(columns[9])).replace('|', ',')
            // layerConfigArray[j].showLayers    = fixR(columns[9])
            layerConfigArray[j].showLayers    = fixR(columns[9])

            // console.log(columns[9], "~", layerConfigArray[j].showLayers);
            console.log(layerConfigArray[j]);
        }
    }
    return layerConfigArray;
}
