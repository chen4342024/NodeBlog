var express = require('express'),
    router = express.Router(),
    Article = require('../models/article'),
    Category = require('../models/category'),
     _ = require('underscore');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with articles a resource');
});

router.get('/list', function (req, res, next) {
    var filter = {};
    if (req.query.filters) {
        filter = JSON.parse(req.query.filters);
        if (filter.title == '' || !filter.title) {
            delete filter.title;
        } else {
            filter.title = new RegExp(filter.title, "i");
        }
        filter.category ? filter.category = parseInt(filter.category) : delete filter.category;
        filter.tags ? filter.tags = parseInt(filter.tags) : delete filter.tags;
    }
    var options = {
        filter: filter,
        sortBy: req.query.sortBy,
        page  : req.query.page - 1,
        count : req.query.count
    };
    if (req.query.fields) {
        options.fields = req.query.fields.split(',').join(' ');
    }
    Article.list(options, function (err, articles) {
        if (err)
            return res.send({error: err});
        Article.count({}, function (err, total) {
            if (err)
                return res.send({error: err});
            res.send({
                rows      : articles,
                pagination: {
                    count: parseInt(req.query.count),
                    page : parseInt(req.query.page),
                    pages: Math.round(total / req.query.count),
                    size : total
                }
            });
        });
    });
});

router.post('/new', function (req, res, next) {
    var id = req.body.article._id;
    var articleObj = req.body.article;
    var _article;
    if (id) {
        Article.findById(id, function (err, article) {
            if (err) {
                console.log(err);
            }
            _article = _.extend(article, articleObj);
            _article.save(function (err, article) {
                if (err) {
                    console.log(err);
                }
                res.send({
                    success:true
                });
            })
        })
    } else {
        _article = new Article({
            title          : articleObj.title,
            description    : articleObj.description,
            coverImgPath   : articleObj.coverImgPath,
            content        : articleObj.content,
            publish        : articleObj.publish,
            readingQuantity: 0,
            favor          : 0,
            enabled : true
        });
        _article.save(function (err, article) {
            if (err) {
                console.log(err);
            }
            res.send({
                success:true,
                data:article
            });
        });
    }
});



module.exports = router;