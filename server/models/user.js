var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

var userSchema = new mongoose.Schema({
    userName     : String,
    password     : String,
    email        : String,
    enabled      : Boolean,
    createTime   : {type: Date, default: Date.now()},
    lastLoginTime: Date
}, {versionKey: false});

userSchema.plugin(autoIncrement.plugin, {model: 'User', startAt: 1});

userSchema.statics = {

    list: function (options, cb) {
        var filter = options.filter || {};
        this.find(filter)
            .limit(options.count)
            .skip(options.page * options.count)
            .exec(cb);
    },

    getById: function (id, cb) {
        this.findOne({_id: id})
            .exec(cb);
    },

    getByFilter: function (filter, cb) {
        this.findOne(filter)
            .exec(cb);
    },

    update2: function (id, modify, cb) {
        this.update({_id: id}, {$set: modify})
            .exec(cb);
    },

    updateAndReturnNew: function (id, modify, cb) {
        this.findByIdAndUpdate(id, {$set: modify}, {new: true})
            .exec(cb);
    },

    delete: function (id, cb) {
        this.remove({_id: id})
            .exec(cb);
    }
};

module.exports = mongoose.model('User', userSchema);