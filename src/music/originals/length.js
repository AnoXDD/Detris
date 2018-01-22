var mp3Duration = require('mp3-duration');
var fs = require('fs');

fs.readdir(__dirname, function(err, items) {

  for (var i=0; i<items.length; i++) {
    (function(item) {
      mp3Duration(item, function (err, duration) {
        if (err) return; // console.log(err.message);
        console.log(duration + " (s)\t" + item);
      });
    })(items[i]);
  }

});

