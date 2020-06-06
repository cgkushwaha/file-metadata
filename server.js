'use strict';

var express = require('express');
var cors = require('cors');
// multer imports
var multer  = require('multer')
var upload = multer();

// require and use "multer"...

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

// file metadata API endpoint
// here, upfile should match with form file field
app.post("/api/fileanalyse", upload.single('upfile'), function(req, res) {
  const {file} = req;
  // if file exists return file metadata else return error
  if(file) {
    return res.json({
      name: file.originalname,
      type: file.mimetype,
      size: file.size
    });
  } else {
    return res.json({error: "Internal server error"})
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
