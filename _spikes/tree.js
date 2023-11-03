async function main() {
    const response = await fetch('layers.jsonl');
    if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
    }
    const text = await response.text();
    const lines = text.split('\n').filter(Boolean); // splits by newline and removes any empty lines
    const menuConfig = lines.map(line => JSON.parse(line)); // parses each line into a json object
    // console.log(menuConfig);



    // loop through the layerConfig array and create the leaflet layers
    i=-1;
    menuConfig.forEach((menuItem) => {
        i++;
        // console.log(menuItem);

        if (menuItem.active === 0) {
            return; // skips the current iteration and continues with the next
        }
        console.log(i, menuItem);


    })

};


//
// let data = [
//     {
//         "id": "0", "text": "node-0", "children":
//             [
//                 {
//                     "id": "0-0", "text": "node-0-0", "children":
//                         [
//                             {"id": "0-0-0", "text": "node-0-0-0"},
//                             {"id": "0-0-1", "text": "node-0-0-1"},
//                             {"id": "0-0-2", "text": "node-0-0-2"}
//                         ]
//                 },
//                 {
//                     "id": "0-1", "text": "node-0-1", "children":
//                         [
//                             {"id": "0-1-0", "text": "node-0-1-0"},
//                             {"id": "0-1-1", "text": "node-0-1-1"},
//                             {"id": "0-1-2", "text": "node-0-1-2"}
//                         ]
//                 },
//                 {
//                     "id": "0-2", "text": "node-0-2", "children":
//                         [
//                             {"id": "0-2-0", "text": "node-0-2-0"},
//                             {"id": "0-2-1","text": "node-0-2-1"},
//                             {"id": "0-2-2", "text": "node-0-2-2"}
//                         ]
//                 }
//             ]
//     },
//     {"id": "1",  "text": "node-1", "children":
//             [
//                 {"id": "1-0", "text": "node-1-0", "children":
//                         [
//                             {"id": "1-0-0", "text": "node-1-0-0"},
//                             {"id": "1-0-1", "text": "node-1-0-1"},
//                             {"id": "1-0-2", "text": "node-1-0-2"}
//                         ]
//                 },
//                 { "id": "1-1", "text": "node-1-1", "children":
//                         [
//                             {"id": "1-1-0", "text": "node-1-1-0"},
//                             {"id": "1-1-1", "text": "node-1-1-1"},
//                             {"id": "1-1-2", "text": "node-1-1-2"}
//                         ]
//                 },
//                 {"id": "1-2", "text": "node-1-2", "children":
//                         [
//                             {"id": "1-2-0", "text": "node-1-2-0"},
//                             { "id": "1-2-1", "text": "node-1-2-1"},
//                             {"id": "1-2-2", "text": "node-1-2-2"}
//                         ]
//                 }
//             ]
//     }
// ];
//
// let tree = new Tree('.container', {
//     // data: [{ id: '-1', text: 'root', children: data }],
//     data: data,
//     closeDepth: 3,
//     loaded: function () {
//         this.values = ['0-0-0'];
//         // console.log(this.selectedNodes);
//         // console.log(this.values);
//         // this.disables = ['0-0-0', '0-0-1', '0-0-2']
//     },
//     onChange: function () {
//         console.log(this.selectedNodes);
//     }
// })

main();
