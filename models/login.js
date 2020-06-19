let mongoose = require('mongoose');

//schema
let loginSchema = mongoose.Schema({
    user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
    },
    password: {
        type: String
    }
});

module.exports = mongoose.model('Login', loginSchema);