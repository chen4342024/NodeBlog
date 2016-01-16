var express = require('express');
var port = 3000;
var path = require('path');
var mongoose = require('mongoose');
var _ = require('underscore');
mongoose.connect("mongodb://localhost/movieDemo");
var Movie = require('./models/movie');
var app = express();
var bodyParser = require("body-parser");

// view engine setup
app.set('views', path.join(__dirname, "./views/pages"));
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended: true}));
//app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port);

app.get("/", function (req, res) {
    Movie. fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('index', {
            title : "",
            movies: movies
        })
    })

});
app.get("/movie/:id", function (req, res) {
    var id = req.params.id;
    Movie.findById(id, function (err, movie) {
        if (err) {
            console.log(err);
        }
        res.render('detail', {
            title: movie.title,
            movie: movie
        })
    });

});
app.get("/admin/movie", function (req, res) {
    res.render('admin', {
        title: "andy_chen 后台录入页",
        movie: {
            doctor  : "",
            country : "",
            title   : "",
            year    : '',
            poster  : "",
            language: '',
            flash   : "",
            summary : ""
        }
    })
});

//admin updata movie
app.get('/admin/update/:id', function (req, res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function (err, movie) {
            res.render('admin', {
                title: "andy_chen 更新电影页",
                movie: movie
            })
        })
    }
});

//admin post movie
app.post('/admin/movie/new', function (req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;
    if (id !== 'undefined') {
        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err);
            }
            _movie = _.extend(movie, movieObj);
            _movie.save(function (err, movie) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/movie/' + movie._id);
            })
        })
    } else {
        _movie = new Movie({
            doctor  : movieObj.doctor,
            title   : movieObj.title,
            language: movieObj.language,
            country : movieObj.country,
            summary : movieObj.summary,
            poster  : movieObj.poster,
            year    : movieObj.year,
            flash   : movieObj.flash
        });
        _movie.save(function (err, movie) {
            if (err) {
                console.log(err);
            }
            res.redirect('/movie/' + movie._id);
        });
    }
});



app.get("/admin/list", function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('list', {
            title : "andy_chen 列表页",
            movies: movies
        })
    })

});

app.delete('/admin/list', function (req, res) {
    var id = req.query.id;
    if (id) {
        Movie.remove({_id: id}, function (err, movie) {
            if (err) {
                console.log(err);
            } else {
                res.json({success: 1});
            }
        })
    }
});
module.exports = app;
