module.exports = function (app, model) {
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserByUserId);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user", createUser);
 //   app.put("/api/show/purchase/:buyerId",purchaseTVShow);
    //  app.post("/api/seller/:sellerId/:showId", addShow);
    app.post("/api/seller/show/:sellerId/:showId", addTVShow);

    function findUserByUserId(req, res) {
        var userId = req.params['userId'];
        model.usermodel
            .findUserByUserId(userId)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
            findUserByCredentials(req, res);
        } else if (username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];
        model.usermodel
            .findUserByUsername(username)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        model.usermodel
            .findUserByCredentials(username, password)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function createUser(req, res) {
        model.usermodel
            .createUser(req.body)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function deleteUser(req, res) {
        model.usermodel
            .deleteUser(req.params.userId)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }


    function updateUser(req, res) {
        var userId = req.params['userId'];
        var newUser = req.body;
        model.usermodel
            .updateUser(req.params.userId, newUser)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }



    // function deleteSeller(req, res) {
    //     model.sellerModel
    //         .deleteSeller(req.params.sellerId)
    //         .then(function (user) {
    //             res.send(user);
    //         }, function (err) {
    //             res.sendStatus(500).send(err);
    //         });
    // }

    // function addShow(req, res) {
    //     var sellerId = req.params.sellerId;
    //     var show = req.body;
    //     model.usermodel
    //         .addShow(sellerId, show)
    //         .then(function (user) {
    //             res.send(user);
    //         }, function (err) {
    //             res.sendStatus(500).send(err);
    //         });
    // }


    // function purchaseTVShow(req, res) {
    //     var show = req.body;
    //     var buyerId = req.params.buyerId;
    //     var exists = false;
    //     model.usermodel
    //         .findUserByUserId(buyerId)
    //         .then(function (user) {
    //             if(user.shows_bought.length === 0)
    //             {
    //                 //count
    //                 model.usermodel
    //                     .addShow(buyerId,show)
    //                     .then(function (user) {
    //                         res.send(user);
    //                     }, function (err) {
    //                         res.sendStatus(500).send(err);
    //                     });
    //             }
    //             else{
    //                 for(var i=0;i<user.shows_bought.length;i++)
    //                 {
    //                     if(user.shows_bought[i].showId === show.showId) {
    //                         // console.log("shw exits!");
    //                         //  console.log(user);
    //                         var nbuyer={};
    //                         nbuyer=user;
    //                         nshow=nbuyer.shows_bought[i];
    //                         nshow.count+=1;
    //                         nbuyer.shows_bought[i]=nshow;
    //                         exists=true;
    //                         // console.log(nbuyer);
    //                         model.usermodel
    //                             .updateUser(buyerId,nbuyer)
    //                             .then(function (user) {
    //                                 res.send(user);
    //                             }, function (err) {
    //                                 res.sendStatus(500).send(err);
    //                             });
    //                     }
    //                 }
    //                 if(exists === false)
    //                 {
    //                     model.usermodel
    //                         .addShow(buyerId,show)
    //                         .then(function (user) {
    //                             res.send(user);
    //                         }, function (err) {
    //                             res.sendStatus(500).send(err);
    //                         });
    //
    //                 }
    //             }
    //         }, function (err) {
    //             res.sendStatus(500).send(err);
    //         });
    // }

    function addTVShow(req, res) {
        var sellerId = req.params.sellerId;
        var showId = req.params.showId;
        var show = req.body;
        model.usermodel
            .addTVShow(sellerId,showId, show)
            .then(function (show1) {
                model.showmodel
                    .addTVSeller(sellerId,showId,show)
                    .then(function (user) {
                        res.send(user);
                    }, function (err) {
                        res.sendStatus(500).send(err);
                    });
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
};