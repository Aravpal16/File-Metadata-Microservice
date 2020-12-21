const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer().single('upfile');
const cors = require("cors");

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', upload, function (req, res) {
   if (req.file) {
    // destructure the pertinent information and return a JSON object
    const { originalname: name, mimetype: type, size } = req.file;
    res.json({
      name,
      type,
      size
    });
  } else {
    // if req.file is undefined, detail the occurrence
    res.json({
      errror: 'no file selected'
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
