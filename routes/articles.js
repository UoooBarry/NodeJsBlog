let Article = require('../models/article');
var express = require('express');
var router = express.Router();
const { check,validationResult } = require('express-validator');


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
    res.render('articles/new',{
        title: "Add an article"
    })
});

router.post('/add', [
    check('title').not().isEmpty().withMessage('Title cannot be empty'), 
    check('author').not().isEmpty().withMessage('Author cannot be empty'),
    check('content').not().isEmpty().withMessage('Content cannot be empty')
] ,function(req, res){
     Article.create({
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
        created_at: new Date()
    }, function(err){
        if(err){
            res.render('articles/new',{
                title: "Add an article",
                errors: validationResult(req).mapped()
            });
        }else{
            req.flash('success','Article Added');
            res.redirect('/articles');
        }
    });
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