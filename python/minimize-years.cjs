var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('/Users/miguelhernandez/programming/Latino_Nostalgia/public/years.js')
});

var years = [];

lineReader.on('line', function (line) {
  var line = line.trim();
  underscore_idx = line.indexOf('_');
  var year = line.substring(underscore_idx, underscore_idx + 5);
  open_bracket_idx = line.indexOf('[')
  arr_part = line.substring(open_bracket_idx);
  global_add_cmd = `global.${year} = ${arr_part}`
  eval(global_add_cmd);
  years.push(year);
});

lineReader.on('close', function () {
    console.log('all done, son');
    
    for (var year of years) {
      var s = "[";
      // console.log(year);
      var lastIdx = global[year].length - 1;
      for (var index = 0; index < global[year].length; index++) {
        var {title, artist, yt_id} = global[year][index];
        // console.log(title, artist, yt_id);
        if (index !== lastIdx) {
          s += `["${title}", "${artist}", "${yt_id}"], `
        } else {
          s += `["${title}", "${artist}", "${yt_id}"]`
        }
      }
      s += "];"
      // console.log(s);
      var arr_assignment = `var ${year} = ${s}`;
      console.log(arr_assignment);
    }
});