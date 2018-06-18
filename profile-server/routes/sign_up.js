var express = require('express');
var router = express.Router();
const mongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/";


router.post('/', function(req, res, next){
  mongoClient.connect(url, function(err, db){
    if(err) {
      console.log('database error');
      res.status(503);
      res.send(err);

    }
    else{
        var profiles = db.db('profiles');

        var user = {
          _id: req.body.email,
          name: req.body.name ,
          surname: req.body.surname,
          intro: '',
          password: req.body.password,
          dateOfBirth: req.body.date_of_birth
        } ;
        var address = {
          _id: req.body.email,
          street: '',
          city: '',
          phone: ''
        };

        console.log('Started');
        profiles.createCollection('Users', function(err, success){
            if(err){
              console.log('Error creating users table');
              res.status(500);
              res.send({message: 'Error creating users table'});
            } else {
                    console.log('Insert User');
                    var newUser = profiles.collection('Users').insertOne(user, function(err, result){
                        if(err){
                          console.log('Error creating account')
                          res.status(409);
                          res.json({message: 'Error creating account'});
                        }
                        else{
                          console.log('Address creation started');

                          profiles.createCollection('Address', function(err, success){
                            if(err){
                              console.log('Error creating address table');
                              res.status(500);
                              res.send({message: 'Error creating address table'});

                            }
                              else{
                                  profiles.collection('Address').insertOne(address, function(err, result){
                                    if(err){
                                      console.log('Error creating user address');
                                      res.status(500),
                                       res.json({message: 'Error creating user address'});
                                    }
                                    else{
                                            res.status(200);
                                            res.json({message: 'User Created!'});
                                          }
                                  });
                              }
                          });
                          console.log('Address creation end');
                        }
                    });
                    console.log('Insert User end');

            }
        });

          console.log('ses');
    }
  });
});

module.exports = router;
