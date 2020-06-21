var session = require('express-session');

exports.log_in = function (user){
    session.current_user = user._id;
}

exports.current_user = function(){
    return session.current_user;
}