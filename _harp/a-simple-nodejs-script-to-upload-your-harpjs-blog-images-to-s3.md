Whilst there are tons of tools to do S3 upload, I wanted something tuned to how I blog, particularly with a static blog that used to be a WordPress one with year/month directories for images. 

Usage: 
```bash
node upload_s3_images.js image1.jpg image2.jpg image3.png etc
```

It uses your AWS credentials in ~/aws_config.json { "accessKeyId": "akid", "secretAccessKey": "secret", "region": "us-west-2" }

It uses the bucket name and root upload directory from ./s3_blog_config.json {"bucket": "conoroneill.net", "rootUploadDir": "wp-content/uploads/"}

So if I have a file called s3_upload.jpg on my Desktop and I invoke as follows:

```bash
node upload_s3_images.js ~/Desktop/s3_upload.jpg
```

I end up with a file at: https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2014/06/s3_upload.jpg

```javascript
// upload_s3_images.js
// Upload a space separated list of images to an S3 bucket for use by your Harp.js static blog
// node upload_s3_images.js image1.jpg image2.jpg image3.png etc
// Uses your AWS credentials in ~/aws_config.json { "accessKeyId": "akid", "secretAccessKey": "secret", "region": "us-west-2" }
// Uses bucket name and root upload directory from ./s3_blog_config.json {"bucket": "conoroneill.net", "rootUploadDir": "wp-content/uploads/"}
// My blog is exported from WordPress so it uses /wp-content/uploads/year/month/ as the directory stucture

// Copyright (C) 2014 Conor O'Neill
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var AWS = require('aws-sdk');
var fs = require('fs'); 
var userHome = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
AWS.config.loadFromPath(userHome + '/aws_config.json');
var blogConfig = require('./s3_blog_config.json');


var fileList = process.argv.slice(2);

fileList.forEach(function (val, index, array) {

  var fileName = val;
  var currentTime = new Date();
  var currentYear = currentTime.getFullYear();
  var currentMonth = ("0" + (currentTime.getMonth() + 1)).slice(-2);

  var uploadName = blogConfig.rootUploadDir + currentYear + '/' + currentMonth + '/' + fileName.split('/').pop();
  var fileBuffer = fs.readFileSync(fileName);
  var metaData = getContentTypeByFile(fileName);
    
  var s3 = new AWS.S3(); 

  var params = {Bucket: blogConfig.bucket, Key: uploadName, Body: fileBuffer, ContentType: metaData};

  s3.putObject(params, function(err, data) {
    if (err)       
      console.log(err)     
    else console.log("Successfully uploaded: " + blogConfig.blogS3Url + blogConfig.bucket + "/" + uploadName);   
  });

});

function getContentTypeByFile(fileName) {
  var rc = 'application/octet-stream';
  var fn = fileName.toLowerCase();

  if (fn.indexOf('.html') >= 0) rc = 'text/html';
  else if (fn.indexOf('.css') >= 0) rc = 'text/css';
  else if (fn.indexOf('.json') >= 0) rc = 'application/json';
  else if (fn.indexOf('.js') >= 0) rc = 'application/x-javascript';
  else if (fn.indexOf('.png') >= 0) rc = 'image/png';
  else if (fn.indexOf('.jpg') >= 0) rc = 'image/jpg';

  return rc;
}

```

Source is [here on GitHub](https://github.com/conoro/conoro.github.io/blob/master/_harp/js/upload_s3_images.js).

I hope you find it useful.
