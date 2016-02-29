var express = require('express'),
    router = express.Router(),
    Category = require('../models/category'),
    _ = require('underscore');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with articles a resource');
});

router.get('/list', function (req, res, next) {
    var filter = {};
    var options = {
        filter: filter
    };
    Category.getAllByFilters(options, function (err, categorys) {
        if (err)
            console.log(err);
        res.send({
            success: !err,
            data   : categorys,
            error  : err
        });
    });
});

router.get('/all', function (req, res, next) {
    Category.getAllByFilters({}, function (err, categorys) {
        if (err)
            console.log(err);
        res.send({
            success: !err,
            data   : categorys,
            error  : err
        });
    });
});

router.post('/', function (req, res, next) {
    var id = req.body.category._id;
    var categoryObj = req.body.category;
    var _category;
    if (id) {
        Category.findById(id, function (err, category) {
            if (err) {
                console.log(err);
            }
            _category = _.extend(category, categoryObj);
            _category.save(function (err, category) {
                if (err) {
                    console.log(err);
                }
                res.send({
                    success: !err,
                    data   : category,
                    error  : err
                });
            })
        })
    } else {
        _category = new Category({
            name        : categoryObj.name,
            displayOrder: categoryObj.displayOrder
        });
        _category.save(function (err, category) {
            if (err) {
                console.log(err);
            }
            res.send({
                success: true,
                data   : category,
                error  : err
            });
        });
    }
});

router.delete('/:id', function (req, res, next) {
    var id = req.params.id;
    if (id) {
        Category.delete(id, function (err) {
            var success = !err;
            res.send({
                success: success,
                error  : err
            });
        });
    }
});


module.exports = router;