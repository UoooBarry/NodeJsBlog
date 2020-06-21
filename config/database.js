const mongoose = require('mongoose');

const DBHOST = 'localhost'
const DBPORT = '27017'
const DBNAME = 'nodejs'

const url = `mongodb://${DBHOST}:${DBPORT}/${DBNAME}`


mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

let db = mongoose.connection;

db.on('error', function(err){
    console.log(err);
});

module.exports = db;