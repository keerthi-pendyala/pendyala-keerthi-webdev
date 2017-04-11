module.exports = function () {
    var usermodel = require('../model/user/user.model.server')();
    var showmodel = require('../model/show/show.model.server')();
    var model = {
        usermodel: usermodel,
        showmodel:showmodel
    };
    return model;
};