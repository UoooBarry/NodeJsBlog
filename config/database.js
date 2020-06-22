const mongoose = require('mongoose');

const DBHOST = 'mongo';
const DBPORT = process.env.DBPORT;
const DBNAME = process.env.DBNAME;

const url = `mongodb://${DBHOST}:${DBPORT}/${DBNAME}`


mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

let db = mongoose.connection;

db.on('error', function(err){
    console.log(err);
});

module.exports = db;