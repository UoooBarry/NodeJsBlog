let mongoose = require('mongoose');

//shcema
let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
    },
    contact: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);