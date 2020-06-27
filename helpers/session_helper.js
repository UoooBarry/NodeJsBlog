var session = require('express-session');
var User = require('../models/user');

exports.log_in = function (user){
    session.current_user = user._id;
    session.user_name = user.name;
}

exports.current_user = function(){
    return session.current_user;
}

exports.log_out = function () {
    session.current_user = null;
    session.user_name = null;
}

exports.get_current_name = () => {
    return session.user_name;
}

exports.get_name =  async (user_id) => {
    let user = await User.findById(user_id)
        .exec()
        .catch(err => console.log(err));
    console.log(user.name);
    return user.name;
}

exports.log_in_check = function (req,res) {
    if(!session.current_user){
        req.flash('danger','Must sign in first.');
        res.redirect('/signin');
    }  
}