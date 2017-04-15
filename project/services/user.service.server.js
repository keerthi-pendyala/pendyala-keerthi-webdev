var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function (app, model) {
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserByUserId);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user", createUser);
    app.post("/api/like/:userId/:pid", liketheshow);
    app.post("/api/undolike/:userId/:pid", undolike);
    app.post("/api/wishlist/:userId/:pid", addtowishlist);
    app.post("/api/removewish/:userId/:pid", removefromwishlist);
    app.post("/api/register", register);
    app.post("/api/login", passport.authenticate('projectlocal'), login);
    app.post("/api/logout", logout);
    app.get("/api/loggedIn", loggedIn);
    app.get("/auth/facebook", passport.authenticate('facebook'), facebookLogin);
    //   app.put("/api/show/purchase/:buyerId",purchaseTVShow);
    //  app.post("/api/seller/:sellerId/:showId", addShow);
    app.post("/api/seller/show/:sellerId/:showId", addTVShow);
    app.get("/api/users", findAllUsers);
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/#/user',
            failureRedirect: '/project/#/userlogin'
        }));


    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    passport.use('projectlocal', new LocalStrategy(localStrategy));
    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookLogin));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function localStrategy(username, password, done) {
        model.usermodel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }


    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function facebookLogin(token, refreshToken, profile, done) {
        model.usermodel
            .findFacebookUser(profile.id)
            .then(
                function (facebookuser) {
                    if (facebookuser) {
                        return done(null, facebookuser);
                    }
                    else {
                        var facebookuser = {
                            firstName: profile.displayName.split(' ')[0],
                            lastName: profile.displayName.split(' ')[1],
                            type: 'buyer',
                            facebook: {
                                token: token,
                                id: profile.id,
                                displayName: profile.displayName
                            }
                        };
                        model.usermodel
                            .createUser(facebookuser)
                            .then(function (user) {
                                done(null, user)
                            }, function (err) {
                                done(err, null)
                            });
                    }
                },
                function (err) {
                    done(err, null);
                });
    }

    function logout(req, res) {
        req.logOut();
        res.sendStatus(200);
    }

    function loggedIn(req, res) {
        console.log(req.user);
        res.send(req.isAuthenticated() ? req.user : '0');

    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model.usermodel
            .findUserByUserId(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

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

    function findAllUsers(req, res) {
        model.usermodel
            .findAllUsers()
            .then(function (users) {
                res.send(users);
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

    function createUser(req, res) {
        model.usermodel
            .createUser(req.body)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }


    function liketheshow(req, res) {
        model.usermodel
            .liketheshow(req.params.userId,req.params.pid)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function addtowishlist(req, res) {
        model.usermodel
            .addtowishlist(req.params.userId,req.params.pid)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function removefromwishlist(req, res) {
        model.usermodel
            .removefromwishlist(req.params.userId,req.params.pid)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function undolike(req, res) {
        model.usermodel
            .undolike(req.params.userId,req.params.pid)
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


    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        model.usermodel
            .createUser(user)
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                }
            );
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

    function addTVShow(req, res) {
        var sellerId = req.params.sellerId;
        var showId = req.params.showId;
        var show = req.body;
        model.usermodel
            .addTVShow(sellerId, showId, show)
            .then(function (show1) {
                model.showmodel
                    .addTVSeller(sellerId, showId, show)
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