var express = require('express');
var router = express.Router();
var User = require('../models/user');

//get users
router.get('/', function(req,res){
  User.find({},function(err, user){
    if(err){
      res.send(err);
    }
      res.send(user);
  });
})

//get user by ID
router.get('/:user_id/', function(req,res){
  User.findById(req.params.article_id, function(err, user){
    if(err){
      res.send(err);
    }
      res.send(user);
  });
});


module.exports = router;
