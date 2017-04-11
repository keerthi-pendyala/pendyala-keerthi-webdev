module.exports = function () {
    var mongoose = require('mongoose');

    var userSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        type: {type:String,enum :['buyer', 'seller']},
        email: String,
        phone: String,
        shows_forsale:[{showId:String,count:Number}],
        shows_bought:[{showId:String,count:Number}],
    dateCreated:{type:Date,default:Date.now}
},{collection: 'mongo.users'});

return userSchema;
};