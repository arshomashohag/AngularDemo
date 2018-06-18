var express = require('express');
var router = express.Router();
const mongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

/* GET users listing. */
router.post('/', function (req, res, next) {

  mongoClient.connect(url, function (err, db) {
      if(err){
         console.log('Connection error');
         res.json(err);
      }
      else{
        var profiles = db.db('profiles');



              var query = {_id: req.body.email } ;

              profiles.collection('Users').find(query).toArray(function(err, userResult){
                  if(err){
                     console.log('Find error');
                     res.json(err);
                  }
                  else {
                    console.log('All success');
                    var ret = [];
                    console.log(JSON.stringify(userResult));





                    profiles.collection('Address').find(query).toArray( function(err, address) {
                      if(err){
                        console.log('Address collection error');
                         res.json(err);
                      }
                      else{
                        console.log(JSON.stringify(address));
                        ret={
                          'user': userResult,
                          'address': address
                        };
                        res.json(ret);
                      }
                    });



                  }
              });

      }
  });
});

module.exports = router;
