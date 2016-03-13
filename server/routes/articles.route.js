var express = require('express'),
    router = express.Router(),
    Article = require('../models/article'),
    Category = require('../models/category'),
    _ = require('underscore');


router.get('/', function (req, res, next) {
    var filter = {};
    if (req.query.filters) {
        var filterObj = JSON.parse(req.query.filters);
        if (filterObj.title && filterObj.title != '') {
            filter.title = new RegExp(filterObj.title, "i");
        }
        if (filterObj.publish) {
            filter.publish = true;
        }
        if (filterObj.category) {
            filter.category = parseInt(filterObj.category)
        }
        if (filterObj.tags) {
            filter.tags = parseInt(filterObj.tags)
        }
    }
    var options = {
        filter: filter,
        sortBy: req.query.sortBy,
        page  : parseInt(req.query.page) - 1,
        count : parseInt(req.query.count)
    };
    if (req.query.fields) {
        options.fields = req.query.fields.split(',').join(' ');
    }
    Article.list(options, function (err, articles) {
        if (err)
            return res.send({error: err});
        Article.count({}, function (err, total) {
            if (err)
                console.log(err);
            res.send({
                success   : !err,
                error     : err,
                data      : articles,
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

router.get('/:id', function (req, res, next) {
    Article.getById(req.params.id, function (err, article) {
        res.send({
            success: !err,
            data   : article,
            error  : err
        });
    });
});

router.post('/', function (req, res, next) {
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
                    success: !err,
                    data   : article,
                    error  : err
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
            category       : articleObj.category,
            readingQuantity: 0,
            favor          : 0,
            enabled        : true
        });
        _article.save(function (err, article) {
            if (err) {
                console.log(err);
            }
            res.send({
                success: !err,
                data   : article,
                error  : err
            });
        });
    }
});

router.delete('/:id', function (req, res, next) {
    var id = req.params.id;
    if (id) {
        Article.delete(id, function (err) {
            var success = !err;
            res.send({
                success: success,
                error  : err
            });
        });
    }
});


module.exports = router;