var express = require('express');
var router = express.Router();
const mongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

/* GET home page. */


router.get('/', function(req, res, next) {

  res.send('welcome');

});

module.exports = router;
