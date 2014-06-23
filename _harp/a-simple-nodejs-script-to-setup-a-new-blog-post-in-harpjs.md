One small annoyance with the Baseline bolierplate in harp.js is that every blogpost needs to be listed in a file called _data.json with all the relevant metadata. Whilst it's not a huge job to slug-ify a title and add the ID and epoch time, it's sufficiently annoying to add friction to me blogging more. Here's the entry for this blogpost:

```javascript

  "a-simple-nodejs-script-to-setup-a-new-blog-post-in-harpjs": {
    "ID": 1291,
    "author": "admin",
    "date": 1403504847928,
    "ptype": "post",
    "description": "This little script generates the relevant metadata in the _data.json file including epoch time and optional Facebook thumbnail URL if you are using the Baseline boilerplate.",
    "slug": "a-simple-nodejs-script-to-setup-a-new-blog-post-in-harpjs",
    "status": "publish",
    "title": "A simple Node.js script to setup a new blog post in Harp.js",
    "FBImage": "https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2014/06/newpost.jpg"
  }

```

This little script just generates everything you need once you tell it a title, description and image "thumbnail". That latter piece is something I added to the _data.json "schema" so that when my posts are auto-shared to Facebook by dlvr.it, it's not the same image there every time but one of my chosing.

```javascript

// newpost.js
// Create all the metadata for a new Harp blogpost
// node newpost.js
// Uses and updates the _data.json file in your _harp directory
// It prompts you for the post-title, post-description and URL of an image that will appear when syndicated to Facebook

// Copyright (C) 2014 Conor O'Neill
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var slug = require('slug');
var fs = require('fs');
var file = '../_data.json';
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
      rl.question("Facebook Thumbnail Image URL: ", function(fbImage) {
        var author = "admin";
        var ptype = "post";
        var status = "publish";

        // slug module doesn't replace periods which causes Harp to choke when serving up static file
        var slugTitle = slug(title).toLowerCase().split('.').join("");
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

        var newPost = {"ID": id, "author": author, "date": publishDate, "ptype": ptype, "description": description, "slug": slugTitle, "status": status, "title": title, "FBImage": fbImage};

        config[slugTitle] = newPost;

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
});


```

Sourcecode [is on GitHub](https://github.com/conoro/conoro.github.io/blob/master/_harp/js/newpost.js) as always.

One interesting side-note was how much effort it was to find a Node module that asks for user input in the way I needed. There are lots of modules out there for Q&A and some of them make it very easy to ask lots of questions, but not one of them (not one!) is able to deal with input that stretches over more than the terminal width. All of them start overwriting what you write on the screen instead of scrolling up. That's a pretty staggering oversight by a lot of developers. Eventually I found the classic readline library which I have used in many languages over the years and it worked like a charm.


