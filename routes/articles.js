let Article = require('../models/article');
var express = require('express');
var router = express.Router();
const { check,validationResult } = require('express-validator');
const session_helper = require('../helpers/session_helper');
const blogAPI = require('../services/blogAPI');

//Get articles
router.get('/',  function(req, res, next) {
    blogAPI.get_articles()
            .then( (articles) => {
                res.render('articles/index',{
                                title:'Articles',
                                articles: articles
                });
            });
   
        
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
        if(value !== session_helper.get_current_name()){
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
        blogAPI.post(req.body.title, req.body.content)
        .then( (message) => {
            req.flash('success', message);
            res.redirect('/articles');
        })
        .catch( (err)=> {
            req.flash('danger', err);
            res.redirect('/articles');
        });
    }
});

router.delete('/:id/', function(req,res){
    blogAPI.del_article(req.params.id)
            .then(result => {
                if(result == 'success'){
                    req.flash('success','Article removed');
                    res.send('Success');
                }else{
                    req.flash('danger','Article error');
                    res.send('error');
                }
            })
            .catch(err => console.log(err));
});

router.get('/:article_id/', function(req,res){
    blogAPI.get_article(req.params.article_id)
            .then( article => {
                res.render('articles/show',{
                    title: "Article",
                    model: article
                })
            })
            .catch( err => {
                req.flash('danger', 'Article not find!');
                res.redirect('/articles');
                console.log(err);
            });
});

module.exports = router;