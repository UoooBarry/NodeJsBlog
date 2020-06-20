var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Login = require('../models/login');
var passwordHash = require('password-hash');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Node.Js blog app' });
});

/* GET register. */
router.get('/register', function(req, res){
  res.render('users/new',{
    title: "Register"
  })
});

//POST /register
router.post('/register',function(req,res){
  var user = new User();
  //create user
  user.name = req.body.name;
  user.gender = req.body.gender;
  user.contact = req.body.contact;
  //save user
  user.save(function(err){
    if(err){
      console.log(err);
      return;
    }
  });
  //create login
  var login = new Login();
  login.user = user._id;
  login.password = passwordHash.generate(req.body.password);
  //save login
  login.save(function(err){
    if(err){
      console.log(err);
      return;
  }else{
      res.redirect('/');
      console.log("One more user has come to our web application");
  }
});

});

router.get('/flash', function(req, res){
  // Set a flash message by passing the key, followed by the value, to req.flash().
  req.flash('info', 'Flash is back!')
  res.redirect('/');
});

module.exports = router;
