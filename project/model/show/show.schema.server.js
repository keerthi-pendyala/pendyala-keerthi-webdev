module.exports = function () {
    var mongoose = require('mongoose');

    var showSchema = mongoose.Schema({
        showId:String,
        comments:[String],
        count:Number,
        sellers:[String]

    },{collection: 'mongo.show'});
    return showSchema;
};