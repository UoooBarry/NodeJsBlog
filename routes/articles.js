let Article = require('../models/article');
var express = require('express');
var router = express.Router();

//Get articles
router.get('/', function(req, res, next) {
    Article.find({},function(err, articles){
        res.render('article/index',{
            title:'Articles',
            articles: articles
        })
    })
});

module.exports = router;