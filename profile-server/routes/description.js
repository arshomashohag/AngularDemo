var express = require('express');
var router = express.Router();
const mongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";


router.post('/', function(req, res, next){

  mongoClient.connect(url, function(err, db){

      if(err){
        console.log('Connection error');
         res.json(err);
      }
      else{
        var profiles = db.db('profiles');
        var ret = [];
        var query = {_id: req.body.email};
        console.log(query);
        profiles.collection('Personal').find(query).toArray( function(err, personal){
            if(err){
               console.log('Personal collection error');
               res.json(err);
            } else {
              query = {user_id: req.body.email};
                profiles.collection('Achievement').find(query).toArray( function(err, achievement){

                  if(err){
                    console.log('Achievement error');
                    res.json(err);
                  } else {
                    profiles.collection('Education').find(query).toArray( function(err, education){
                        if(err){
                          console.log('Education error');
                           res.json(err);
                        }
                        else {
                          profiles.collection('Experience').find(query).toArray(function(err, experience){
                              if(err){
                                console.log('Experience error');
                                 res.json(err);
                              }
                              else {
                                ret = {
                                  'personal': personal,
                                  'achievement': achievement,
                                  'education': education,
                                  'experience': experience
                                }
                                 res.json(ret);
                              }
                          });
                        }
                    });
                  }

                });
            }
        });
      }

  });


});





router.post('/personal-profile', function(req, res, next){
  mongoClient.connect(url, function(err, db){
      if(err){
        console.log('Connection error in personal-profile');
        res.status(500);
        res.send(err);
      }
      else {
        const profiles = db.db('profiles');

        const query = {_id: req.body._id};
        const newValue = { $set: {profile: req.body.profile} };
        console.log(query);
        console.log(req.body.profile);


        profiles.collection('Personal').updateOne(query, newValue, function(error, updateResult){
            if(err){
              res.status(500);
              res.send(err);
            }
            else{
               res.json('Updated Successfully');
            }
        });

      }
  });
});


module.exports = router;
