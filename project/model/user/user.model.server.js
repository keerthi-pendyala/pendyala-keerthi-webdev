module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var userSchema = require('./user.schema.server')();

    var usermodel = mongoose.model('usermodel', userSchema);

    var api = {
        createUser: createUser,
        deleteUser: deleteUser,
        updateUser: updateUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        addShow: addShow,
        findUserByUserId: findUserByUserId,
        addTVShow: addTVShow,
        // findAllUsers:findAllUsers
        purchaseTVShow: purchaseTVShow
    };
    return api;


    function createUser(newuser) {
        var deffered = q.defer();
        usermodel
            .create(newuser, function (err, user) {
                if (err) {
                    deffered.abort(err);
                } else {
                    deffered.resolve(user);
                }
            });
        return deffered.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        usermodel
            .remove({_id: userId}, function (err, user) {
                if (err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function updateUser(userId, newUser) {
        var deferred = q.defer();
        usermodel
            .update({_id: userId},
                {$set: newUser})
            .then(function (user, err) {
                if (err)
                    deferred.abort(err);
                else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function findUserByUserId(userId) {
        var deferred = q.defer();
        usermodel
            .findById({_id: userId})
            .then(function (user, err) {
                if (err)
                    deferred.abort(err);
                else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        usermodel
            .findOne({username: username})
            .then(function (user, err) {
                if (err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function findUserByCredentials(username, password) {
        var deferred = q.defer();
        usermodel
            .findOne({username: username, password: password})
            .then(function (user, err) {
                if (err)
                    deferred.abort(err);
                else
                    deferred.resolve(user);
            });
        return deferred.promise;
    }


    function addShow(sellerId, show) {
        var deferred = q.defer();
        usermodel
            .findOne({_id: sellerId}, function (err, user) {
                if (user.type === "seller") {
                    user.shows_forsale.push(show);
                }
                else {
                    user.shows_bought.push(show);
                }
                user.save();
                deferred.resolve(user);
            });
        return deferred.promise;
    }


    function addTVShow(sellerId, showId, show) {
        var deferred = q.defer();
        var exists = false;
        usermodel
            .findById({_id: sellerId})
            .then(function (user) {
                var nshow = {showId: showId, count: show.count};
                if (user.shows_forsale.length !== 0) {
                    for (var i = 0; i < user.shows_forsale.length; i++) {
                        //If show exists, then update seller(user) table
                        if (user.shows_forsale[i].showId === showId) {
                            exists = true;
                            var newseller = user;
                            newseller.shows_forsale[i].count += show.count;
                            usermodel
                                .update({_id: sellerId},
                                    {$set: newseller})
                                .then(function (user, err) {
                                    if (err)
                                        deferred.abort(err);
                                    else {
                                        deferred.resolve(user);
                                    }
                                });
                        }
                    }
                }
                // if show doesn't exist , add the show
                if (exists === false) {
                    user.shows_forsale.push(nshow);
                    user.save();
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function purchaseTVShow(buyerId, show) {
        var deferred = q.defer();
        var exists = false;
        usermodel
            .findById({_id: buyerId})
            .then(function (user) {
                if (user.shows_bought.length !== 0) {
                    for (var i = 0; i < user.shows_bought.length; i++) {
                        //when the user has the same show, update count
                        if (user.shows_bought[i].showId === show.showId) {
                            var nbuyer = user;
                            nshow = nbuyer.shows_bought[i];
                            nshow.count += 1;
                            nbuyer.shows_bought[i] = nshow;
                            exists = true;
                            updateUser(buyerId, nbuyer)
                                .then(function (user, err) {
                                    if (err)
                                        deferred.abort(err);
                                    else {
                                        deferred.resolve(user);
                                    }
                                });
                        }
                    }
                }
                //when the user doesn't have the show , push the show
                if (exists === false) {
                    addShow(buyerId, show)
                        .then(function (user, err) {
                            if (err)
                                deferred.abort(err);
                            else {
                                console.log("I am here" + user);
                                deferred.resolve(user);
                            }
                        });
                }
            }, function (err) {
                deferred.abort(err);
            });
        return deferred.promise;
    }


};