module.exports = function (app) {
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserByUserId);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user", createUser);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email:"alice.wonderland@gmail.com" },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email:"bobmarley@hotmail.com" },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email:"Garcia.c@hotmail.com" },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi",email:"jannunzi@yahoo.com" }
    ];

    function deleteUser(req, res) {
        var userId = req.params.userId;
        for(var u in users) {
            if(users[u]._id === userId) {
                users.splice(u, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function createUser(req, res) {
        if(user.password === user.verifypassword) {
            var newUser = req.body;
            newUser._id = (new Date()).getTime() + "";
            users.push(newUser);
            res.json(newUser);
        }
        else
            res.sendStatus(404);
    }

    function updateUser(req, res) {
        var userId = req.params['userId'];
        console.log(userId);
        for(var u in users) {
            var user = users[u];
            if( user._id === userId ) {
                console.log('found user');
                console.log(user);
                console.log('new user');
                var newUser = req.body;
                console.log(newUser);
                users[u].firstName = newUser.firstName;
                users[u].lastName = newUser.lastName;
                users[u].email = newUser.email;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            findUserByCredentials(req, res);
        } else if(username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUserId(req, res) {
        var userId = req.params['userId'];
        for(var u in users) {
            var user = users[u];
            if( user._id === userId ) {
                res.send(user);
                return;
            }
        }
        res.sendStatus(404);
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];
        var user = users.find(function(u){
            return u.username == username;
        });
        if(user) {
            res.send(user);
        } else {
            res.sendStatus(404);
        }
    }

    function findUserByCredentials(req, res){
        var username = req.query['username'];
        var password = req.query['password'];
        var user = users.find(function(u){
            return u.username == username && u.password == password;
        });
        if(user) {
            res.send(user);
        } else {
            res.sendStatus(404);
        }
    }
};