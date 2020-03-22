// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// timestamp microservice API endpoint
app.get('/api/timestamp/:date_string', function (req, res) {
  let dateParam = req.params.date_string,
      dateObj;
  
  if (dateParam) {
    if (/^\d+$/.test(dateParam)) {
      dateParam = parseInt(dateParam);
    }
    
    try {
      dateObj = new Date(dateParam);
    }
    catch {
      dateObj = false;
    }
  }
  else {
    dateObj = new Date();
  }
  
  res.json({
    unix : dateObj ? dateObj.getTime() : null,
    utc  : dateObj ? dateObj.toUTCString() : 'Invalid Date'
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});