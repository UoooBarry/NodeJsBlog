var session = require('express-session');

exports.log_in = function (user){
    session.current_user = user._id;
    session.user_name = user.name;
}

exports.current_user = function(){
    return session.current_user;
}

exports.log_out = function () {
    session.current_user = null;
}

exports.get_name = function () {
    return session.user_name;
}

exports.log_in_check = function (req,res) {
    if(!session.current_user){
        req.flash('danger','Must sign in first.');
        res.redirect('/signin');
    }  
}