var express = require('express');
var router = express.Router();
var database = require('../sql/database');
fs = require('fs')


// retrieve read and render text from sidebar.txt file to client
router.get('/text/sidebar.txt', function(req, res){
  var record;
  var dir = __dirname.split("/").slice(0,-1).join("/");
  var filePath = dir+"/text/"+req.param("sidebar.txt");
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    record = data;
    console.log(data);
    res.render('leftdiv',{xinfo: record});
  });

});

// retrieve read and render text from leftdiv.txt file to client
router.get('/text/leftdiv.txt', function(req, res){
  var record;
  var dir = __dirname.split("/").slice(0,-1).join("/");
  var filePath = dir+"/text/"+req.param("leftdiv.txt");
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    record = data;
    console.log(data);
    res.render('bottomdiv',{leftdivtxt: record});
  });

});

// retrieve read and render text from bottomdiv.txt file to client
router.get('/text/bottomdiv.txt', function(req, res){
  var record;
  var dir = __dirname.split("/").slice(0,-1).join("/");
  var filePath = dir+"/text/"+req.param("bottomdiv.txt");
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    record = data;
    console.log(data);
    res.render('rightdiv',{xparagraph3: record});
  });

});

// send database data as string to client side
function trafficCallback(res, data) {
  res.send(JSON.stringify(data));
}


/*GET teen accident data */
router.get('/teentraffic', function(req, res){
  var queryString = 'SELECT age, percentInvolvedCrash  FROM teenAccidents';
  database.query(res, trafficCallback, queryString, {});
});

/* get massachusetts accident data*/
router.get('/traffic', function(req, res){
  var queryString = 'SELECT *  FROM carAccidents';
  database.query(res, trafficCallback, queryString, {});
});

/* get massachusetts accident data for bottom chart*/
router.get('/speed', function(req, res){
  var queryString = 'SELECT name, AVG(AM_speed), AVG(PM_speed) FROM traffic GROUP BY name';
  database.query(res, trafficCallback, queryString, {});
});


/* get all age accident data*/
router.get('/accidentAllAge', function(req, res){
  var queryString = 'SELECT * FROM accidentsAllAges';
  database.query(res, trafficCallback, queryString, {});
});

/* get Lousiana accident data*/
router.get('/Louisiana', function(req, res){
  var queryString = 'SELECT * FROM accidentsL';
  database.query(res, trafficCallback, queryString, {});
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('dashboard', { title: 'Dashboard' });
});


/* POST new review data. */
router.post('/addUserData', function(req, res) {
  var queryString = 'INSERT INTO traffic VALUES (:name, :AM_speed, :PM_speed)';

  // Query the database for the majors of students graduating in the given year.
  database.query(res, trafficCallback, queryString, { name: req.param('name'), AM_speed: req.param('AM_speed'), PM_speed: req.param('PM_speed') });
});
module.exports = router;
