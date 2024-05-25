require('dotenv').config();
const express = require('express');
const dns = require("dns");
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
// lookup the hostname passed as argument
  dns.lookup(providedUrl, (error, address, family) => {
  // if an error occurs, eg. the hostname is incorrect!
  if (error) {
    res.json({
      error: "Invalid Hostname"
    });
  } else {
    // if no error exists
    console.log(
      `The ip address is ${address} and the ip version is ${family}`
    );
    res.json({
      
    })
  }
});
  console.log(providedUrl);
    res.json({
    URL : providedUrl
  })

})
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
