// ##############################################################
// helper function - load layer JSONL      ######################
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
