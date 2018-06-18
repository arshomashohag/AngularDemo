var express = require('express');
var router = express.Router();
const mongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

router.post('/', function(req, res){
mongoClient.connect(url, function(err, db){
  if(err){
    console.log('database error');
      res.status(503);
      res.send(err);
  } else {
    var profiles =  db.db('profiles');
    var email = req.body.email;
    var pass = req.body.password;

    var query = { _id: email, password: pass };
    profiles.collection('Users').find(query).toArray( function(err, result){
      if(err){
        res.status(500);
        res.json({message: 'Server error, try again'});
      }
       else if(result){

          if(result.length === 1 ){
           res.status(200);
           res.json({message: 'You are logged in'});
          }
          else {
            res.status(409);
            res.json({message: 'Wrong email or password'});
          }
        }

    });

  }
});
});

module.exports = router;
