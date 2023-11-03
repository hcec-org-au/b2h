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
