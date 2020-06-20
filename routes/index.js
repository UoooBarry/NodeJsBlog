var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Login = require('../models/login');
var passwordHash = require('password-hash');
const { check,validationResult } = require('express-validator');
const user = require('../models/user');

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
  check('contact').isLength({min:10, max:10}).withMessage('Contact number should be 10 digits')
  .matches(/^[0][0-9]$/).withMessage('Contact must be numbers start with 0'),
  check('password').isLength({min: 6}).withMessage('Password need to be more than 10 digits')
]
,function(req,res){
  errors = validationResult(req);
  if(errors){
    res.render('users/new',{
      title: "Register",
      errors: errors.mapped()
  })}
  //create user
  var user = User.create({
    name: req.body.name,
    gender: req.body.gender,
    contact: req.body.contact
  });

  //create login
  Login.create({
    user: user._id,
    password: passwordHash.generate(req.body.password)
  });
  
  req.flash('sucess', 'Successfully registered!')
  res.redirect('/');
  

});

router.get('/flash', function(req, res){
  // Set a flash message by passing the key, followed by the value, to req.flash().
  req.flash('info', 'Flash is back!')
  res.redirect('/');
});

module.exports = router;
