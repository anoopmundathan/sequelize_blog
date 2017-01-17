var express = require('express');
var router = express.Router();
var Article = require('../models').Article;

/* GET articles listing. */
router.get('/', function(req, res, next) {
  Article.findAll({order: [["createdAt", "DESC"]]}).then(function(articles) {
    res.render("articles/index", {articles: articles, title: "My Awesome Blog" });  
  }).catch(function(err) {
    res.send(500);
  });
});

/* POST create article. */
router.post('/', function(req, res, next) {
  Article.create(req.body).then(function(article) {
    res.redirect("/articles/" + article.id);  
  }).catch(function(err) {
    res.send(500);
  });
});

/* Create a new article form. */
router.get('/new', function(req, res, next) {
  res.render("articles/new", {article: Article.build(), title: "New Article"});
});

/* Edit article form. */
router.get("/:id/edit", function(req, res, next){

  Article.findById(req.params.id).then(function(article) {
    res.render("articles/edit", {article: article, title: "Edit Article"});
  }).catch(function(err) {
    res.send(500);
  });

});

/* Delete article form. */
router.get("/:id/delete", function(req, res, next){
  Article.findById(req.params.id).then(function(article) {
    res.render("articles/delete", {article: article, title: "Delete Article"});
  }).catch(function(err) {
    res.send(500);
  });
});


/* GET individual article. */
router.get("/:id", function(req, res, next){
  Article.findById(req.params.id).then(function(article) {
    res.render("articles/show", {article: article, title: article.title});  
  }).catch(function(err) {
    res.send(500);
  });
});

/* PUT update article. */
router.put("/:id", function(req, res, next){

  Article.findById(req.params.id).then(function(article) {
    return article.update(req.body);
  }).then(function(article) {
    res.redirect("/articles/" + article.id);    
  }).catch(function(err) {
    res.send(500);
  });
  
});

/* DELETE individual article. */
router.delete("/:id", function(req, res, next){

  Article.findById(req.params.id).then(function(article) {
    return article.destroy();
  }).then(function() {
    res.redirect("/articles");  
  }).catch(function(err) {
    res.send(500);
  });

});


module.exports = router;