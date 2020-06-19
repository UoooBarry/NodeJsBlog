let Article = require('../models/article');
var express = require('express');
var router = express.Router();



//Get articles
router.get('/', function(req, res, next) {
    Article.find({},function(err, articles){
        res.render('articles/index',{
            title:'Articles',
            articles: articles
        })
    })
});

router.get('/add', function(req, res, next){
    res.render('articles/add',{
        title: "Add an article"
    })
});

router.post('/add', function(req, res){
    var article = new Article();

    article.title = req.body.title;
    article.author = req.body.author;
    article.content = req.body.content;
    article.created_at = new Date();

    article.save(function(err){
        if(err){
            console.log(err);
            return;
        }else{
            res.redirect('/articles');
        }
    })


    console.log(req.body.title);
});

router.get('/:article_id/', function(req,res){
    Article.findById(req.params.article_id, function(err, article){
        res.render('articles/show',{
            title: "Article",
            model: article
        })
    });
    
});

module.exports = router;