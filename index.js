require("dotenv").config();
const express = require("express");
const dns = require("dns");
const cors = require("cors");
const bodyParser = require("body-parser");
const { url } = require("inspector");
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// create a list to store shotURL
const urls = [];
// Second API endpoint
app.post("/api/shorturl", function (req, res) {
  let providedUrl = req.body.url;
  // lookup the hostname passed as argument
  dns.lookup(providedUrl, (error, address, family) => {
    // if an error occurs, eg. the hostname is incorrect!
    if (error) {
      res.json({
        error: "Invalid url",
      });
    } else {
      // if no error exists
      console.log(
        `The ip address is ${address} and the ip version is ${family}`
      );
      providedUrl = "https://"+providedUrl
      if (!urls.includes(providedUrl)) {
        urls.push(providedUrl);
      }
      console.log()
      res.json({
        original_url: providedUrl,
        short_url: urls.indexOf(providedUrl),
      });
    }
  });
});

app.get("/api/shorturl/:short", function (req, res) {
  const short = Number(req.params.short);
  console.log(short);
  if (short <= urls.length) {
     res.status(301).redirect(urls[short]);
  } else {
    res.json({
      error: "Invalid url",
    });
  }
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
