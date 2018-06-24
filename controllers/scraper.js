var axios = require('axios');
var cheerio = require('cheerio');
var db = require('../models')
var express = require('express');

var router = express.Router();

router.get('/scrape', function(req, res) {
   
    axios.get('http://nytimes.com').then(function(response) {

        var $ = cheerio.load(response.data);
        
        $("article.story").each(function(i, element) {
            var result = {};

            result.title = $(this).children('h2.story-heading').children('a').text()
            result.link = $(this).children('h2.story-heading').children('a').attr('href')
            result.author = $(this).children('p.byline').text().trim();
            result.summary = $(this).children('p.summary').text().trim();
            
            if (result.author === '') {
                result.author = 'No author provided for this article'
            }
            if (result.summary === '') {
                result.summary = 'No summary provided for this article'
            }
            db.Article.create(result).then(function(result) {

            }).catch(function(err) {
                return res.json(err);
            });

            
        });
        
        
        res.redirect('/')
        
    });

});



module.exports = router