var express = require('express');
var router = express.Router();

var _ = require('underscore');
///* GET home page. */
//router.get('/', function (req, res, next) {
//    res.render('index', {title: 'Express'});
//});

router.get("/", function (req, res) {
    res.send('index', {
        title : "Movie"
    })
});

//router.get("/movie/:id", function (req, res) {
//    var id = req.params.id;
//    Movie.findById(id, function (err, movie) {
//        if (err) {
//            console.log(err);
//        }
//        res.render('detail', {
//            title: movie.title,
//            movie: movie
//        })
//    });
//
//});
//router.get("/admin/movie", function (req, res) {
//    res.render('admin', {
//        title: "andy_chen 后台录入页",
//        movie: {
//            doctor  : "",
//            country : "",
//            title   : "",
//            year    : '',
//            poster  : "",
//            language: '',
//            flash   : "",
//            summary : ""
//        }
//    })
//});
//
////admin updata movie
//router.get('/admin/update/:id', function (req, res) {
//    var id = req.params.id;
//    if (id) {
//        Movie.findById(id, function (err, movie) {
//            res.render('admin', {
//                title: "andy_chen 更新电影页",
//                movie: movie
//            })
//        })
//    }
//});
//
////admin post movie
//router.post('/admin/movie/new', function (req, res) {
//    var id = req.body.movie._id;
//    var movieObj = req.body.movie;
//    var _movie;
//    if (id !== 'undefined') {
//        Movie.findById(id, function (err, movie) {
//            if (err) {
//                console.log(err);
//            }
//            _movie = _.extend(movie, movieObj);
//            _movie.save(function (err, movie) {
//                if (err) {
//                    console.log(err);
//                }
//                res.redirect('/movie/' + movie._id);
//            })
//        })
//    } else {
//        _movie = new Movie({
//            doctor  : movieObj.doctor,
//            title   : movieObj.title,
//            language: movieObj.language,
//            country : movieObj.country,
//            summary : movieObj.summary,
//            poster  : movieObj.poster,
//            year    : movieObj.year,
//            flash   : movieObj.flash
//        });
//        _movie.save(function (err, movie) {
//            if (err) {
//                console.log(err);
//            }
//            res.redirect('/movie/' + movie._id);
//        });
//    }
//});
//
//
//router.get("/admin/list", function (req, res) {
//    Movie.fetch(function (err, movies) {
//        if (err) {
//            console.log(err);
//        }
//        res.render('list', {
//            title : "andy_chen 列表页",
//            movies: movies
//        })
//    })
//
//});
//
//router.delete('/admin/list', function (req, res) {
//    var id = req.query.id;
//    if (id) {
//        Movie.remove({_id: id}, function (err, movie) {
//            if (err) {
//                console.log(err);
//            } else {
//                res.json({success: 1});
//            }
//        })
//    }
//});

module.exports = router;
