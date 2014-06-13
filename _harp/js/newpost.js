// Create all the metadata for a new Harp blogpost

var slug = require('slug');
var fs = require('fs');
var file = './_data.json';
var config;

fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }
  config = JSON.parse(data);

  var readline = require('readline');
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Title: ", function(title) {
    rl.question("Description: ", function(description) {
      var author = "admin";
      var ptype = "post";
      var status = "publish";
      var slugTitle = slug(title).toLowerCase();
      var publishDate = (new Date).getTime();

      var maxProp = "ID";
      var maxVal = 0;

      for (post in config) {
          var value = parseInt(config[post][maxProp], 10);
          if (value > maxVal) {
              maxVal = value;
          }
      }

      var id = maxVal + 1;

      var newPost = {"ID": id, "author": author, "date": publishDate, "ptype": ptype, "description": description, "slug": slugTitle, "status": status, "title": title};

      config[slugTitle] = newPost;
      //console.log(config);

      fs.writeFile(file, JSON.stringify(config, null,  2), function(err) {
        if(err) {
          console.log(err);
        } else {
        fs.writeFile("../"+slugTitle+".md", description, function(err) {
          if(err) {
            console.log(err);
          } else {
            console.log("The new post was created as ../"+slugTitle+".md");
          }
        }); 
        console.log("_data.json was updated");
        }
      }); 
      rl.close();
    });
  });
});
