var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const session_helper = require('../helpers/session_helper');
const blogAPI = require('../services/blogAPI');

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
  check('name').custom(async function(value){
     var user = await blogAPI.get_user(value);
     console.log(user);
     if(user){
       return Promise.reject();
     }
  }).withMessage('Username already exists'),
  check('contact').isLength({min:10, max:10}).withMessage('Contact number should be 10 digits').matches(/^[0][0-9]*$/).withMessage('Contact must be numbers start with 0'),
  check('password').isLength({min: 6}).withMessage('Password need to be more than 10 digits'),
  check('password').custom(function(val,{req}){
    if(val !== req.body.confirm_password){
      throw new Error("Password not matched");
    }else{
        return val;
    }
  })
]
,function(req,res){
  var errors = validationResult(req);
if(!errors.isEmpty()){
    res.render('users/new',{
      title: "Register",
      errors: errors.mapped()
  });
}else{
  //create user
  blogAPI.register(req.body.name, req.body.gender,req.body.contact, req.body.password)
                  .then(message => {
                    if(message === 'success'){
                      req.flash('success','Sign up sucessful!');
                      res.redirect('/signin');
                    }else{
                      req.flash('danger','Sign up error');
                      res.redirect('/register');
                    }
                  })
                  .catch(err => console.log(err));
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
    log_fail(req,res);
    return;
  }
  console.log(blogAPI.login(name, req.body.password));
  blogAPI.login(name, req.body.password)
     .then( (result) => {
      if ( result === 'success' ){
      req.flash('success', 'Sign in sucessful!');
      res.redirect('/articles');
    }else{
      log_fail(req,res);
      return;
    }
  })
  .catch( err=> console.log(err));

  
});

router.get('/signout', function(req,res){
  session_helper.log_out();
  req.flash('success', 'Logout success.');
  res.redirect('/');
});

function log_fail(req,res){
  req.flash('danger','Login information not match!');
  res.redirect('/signin');
}

module.exports = router;
