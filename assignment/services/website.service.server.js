    module.exports = function (app) {
        app.post('/api/user/:userId/website', createWebsite);
        app.get('/api/user/:userId/website', findAllWebsitesForUser);
        app.get('/api/website/:websiteId', findWebsiteById);
        app.put('/api/website/:websiteId', updateWebsite);
        app.delete('/api/website/:websiteId', deleteWebsite);


        var websites = [
            {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem", created: new Date()},
            {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem", created: new Date()},
            {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem", created: new Date()},
            {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", created: new Date()},
            {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem", created: new Date()},
            {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem", created: new Date()}];

        function findAllWebsitesForUser(req, res) {
            var userId = req.params.userId;
            var sites = [];
            for(var w in websites) {
                if(userId === websites[w].developerId) {
                    sites.push(websites[w]);
                }
            }
            res.json(sites);
        }

        function deleteWebsite(req, res) {
            var websiteId = req.params.websiteId;
            for(var w in websites) {
                if(websites[w]._id === websiteId) {
                    websites.splice(w, 1);
                }
            }
        }

        function findWebsiteById(req, res) {
            var wid = req.params.websiteId;
            for(var w in websites) {
                if(websites[w]._id === wid) {
                    res.send(websites[w]);
                    return;
                }
            }
        }

        function createWebsite(req, res) {
            var userId = req.params.userId;
            var newWebsite = req.body;
            newWebsite.developerId=userId;
            var random = (new Date()).getTime();
            newWebsite._id = random.toString();
            websites.push(newWebsite);
            res.json(newWebsite);
        }

        function updateWebsite(req,res) {
            var newWebsite=req.body;
            var newWebsiteId=req.params.websiteId;
            for(var w in websites) {
                var website = websites[w];
                if(website._id === newWebsiteId) {
                    websites[w].name = newWebsite.name;
                    websites[w].description = newWebsite.description;
                    return res.json(website);
                }
            }
        }
    }

