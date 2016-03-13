var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

var articleSchema = new mongoose.Schema({
    title          : String,
    description    : String,
    meta           : {
        author     : String,
        description: String,
        keyword    : String
    },
    coverImgPath   : String,
    content        : String,
    publish        : Boolean,
    time           : {
        create : {type: Date, default: Date.now()},
        update : {type: Date, default: Date.now()},
        publish: Date
    },
    readingQuantity: Number,
    favor          : Number,
    author         : {type: Number, ref: 'User'},
    category       : {type: Number, ref: 'Category'},
    tags           : [{type: Number, ref: 'Tag'}],
    comments       : [{type: Number, ref: 'Comment'}]
}, {versionKey: false});

articleSchema.plugin(autoIncrement.plugin, {model: 'Article', startAt: 1});

articleSchema.pre('save', function (next) {
    if (this.isNew) {
        this.time.create = this.time.update = Date.now();
        if (this.publish) {
            this.time.publish = Date.now();
        }
    }
    next();
});

articleSchema.methods = {};

articleSchema.statics = {

    list: function (options, cb) {
        var filter = options.filter || {};
        var fields = options.fields || {};
        this.find(filter)
            .select(fields)
            //.populate('category', '_id name')
            //.populate('comments')
            .sort(options.sortBy)
            .limit(options.count)
            .skip(options.page * options.count)
            .exec(cb);
    },

    getById: function (id, cb) {
        return this.findOne({_id: id})
            //.populate('category', '_id name')
            //.populate('tags', '_id name')
            //.populate({
            //    path    : 'comments',
            //    model   : 'Comment',
            //    populate: {
            //        path : 'reply',
            //        model: 'Comment'
            //    }
            //})
            .exec(cb);
    },


    delete: function (id, cb) {
        this.remove({_id: id})
            .exec(cb);
    }
};

module.exports = mongoose.model('Article', articleSchema);