var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passwordHash = require('password-hash');
const { check,validationResult } = require('express-validator');
const user = require('../models/user');
const e = require('express');

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
router.post('/register',
[
  check('name').not().isEmpty().withMessage('Name cannot be empty'),
  check('contact').isLength({min:10, max:10}).withMessage('Contact number should be 10 digits').matches(/^[0][0-9]*$/).withMessage('Contact must be numbers start with 0'),
  check('password').isLength({min: 6}).withMessage('Password need to be more than 10 digits')
]
,function(req,res){
  var errors = validationResult(req);
if(!errors.isEmpty()){
  console.log("true");
    res.render('users/new',{
      title: "Register",
      errors: errors.mapped()
  });
}else{
  //create user
   User.create({
      name: req.body.name,
      gender: req.body.gender,
      contact: req.body.contact,
      login: {password: passwordHash.generate(req.body.password)}
    },function(err){
       req.flash('success','Sign up sucessful!');
       res.redirect('/signin');
  });
}

});

router.get('/signin',function(req,res){
  res.render('session/new',{
    title: "Sign in"
  });
});

router.post('/signin',function(req,res){
  var name = req.body.name;
  if(!name){
    req.flash('danger','Login information not match!');
    res.redirect('/signin');
    return;
  }

User.findOne({ name: name}, function(err, user){
    if(!user){
      req.flash('danger','Login information not match!');
      res.redirect('/signin');
    }
    var hash = user.login.password;
    if(passwordHash.verify(req.body.password,hash)){
      console.log("true");
    }else{
      req.flash('danger','Login information not match!');
      res.redirect('/signin');
    }
  });
});


module.exports = router;
