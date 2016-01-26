var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

mongoose.connect("mongodb://localhost/movieDemo");

db = mongoose.connection;

autoIncrement.initialize(db);

db.once('open', function callback() {
    console.log('connect mongodb successfully');
});

db.on('error', function (error) {
    console.log(error);
});