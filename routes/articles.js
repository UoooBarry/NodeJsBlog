let Article = require('../models/article');
var express = require('express');
var router = express.Router();
const { check,validationResult } = require('express-validator');
const session_helper = require('../helpers/session_helper');

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
    session_helper.log_in_check(req,res);
    res.render('articles/new',{
            title: "Add an article"
    });
    
});

router.post('/add', [
    check('title').not().isEmpty().withMessage('Title cannot be empty'), 
    check('author').custom(function(value, {req}){
        if(value !== session_helper.get_name()){
            throw new Error("Incorrect user");
        }else{
            return value;
        }
     }),
    check('content').not().isEmpty().withMessage('Content cannot be empty')
] ,function(req, res){
     session_helper.log_in_check(req,res);
     var errors = validationResult(req);

     if(!errors.isEmpty()){
        res.render('articles/new',{
            title: "Add an article",
            errors: errors.mapped()
        });
     }else{
        Article.create({
            title: req.body.title,
            author: req.body.author,
            content: req.body.content,
            created_at: new Date()
        }, function(err){
            if(!err){
                req.flash('success','Article Added');
                res.redirect('/articles');
            }
        });
    }
});

router.delete('/:id/', function(req,res){
    Article.findOneAndDelete({_id : req.params.id},function(err){
        req.flash('success','Article removed');
        res.send('Success');
    })
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