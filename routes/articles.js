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

router.get('/add', function(req, res, next){
    res.render('article/add',{
        title: "Add an article"
    })
});

router.post('/add', function(req, res){
    var article = new Article();

    article.title = req.body.title;
    article.author = req.body.author;
    article.content = req.body.content;

    article.save(function(err){
        if(err){
            console.log(err);
            return
        }else{
            res.redirect('article/add');
        }
    })


    console.log(req.body.title);
});
module.exports = router;