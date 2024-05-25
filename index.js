require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// Second API endpoint 
app.post('/api/shorturl', function (req, res){
  const providedUrl = req.body.url
  console.log(providedUrl);
  res.json({
    URL : providedUrl
  })

})
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
