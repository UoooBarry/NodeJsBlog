var session = require('express-session');
var User = require('../models/user');
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

exports.log_in = function (name, token){
    localStorage.setItem('authToken', token)
    session.user_name = name;
}

exports.current_user = function(){
    return localStorage.getItem('authToken');
}

exports.log_out = function () {
    session.user_name = null;
    localStorage.clear();
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
    if(!session.user_name){
        req.flash('danger','Must sign in first.');
        res.redirect('/signin');
    }  
}