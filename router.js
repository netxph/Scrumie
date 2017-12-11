let express = require("express");
let jwt = require("jsonwebtoken");
let sessionCtrl = require("./server/controllers/session.server.controller.js");
let meetingCtrl = require("./server/controllers/meeting.server.controller.js");
let accountCtrl = require("./server/controllers/account.server.controller.js");

let router = express.Router();

//authentication middleware
router.use(function(req, res, next) {
    let token = req.headers.authorization;

    if(!req.url.startsWith("/session") && 
        !req.url.startsWith("/account/register"))
    {
        if(!token) {
            return res.status(401).send();
        } else {
            jwt.verify(token, "secret", function(error, decoded) {
                if(error) {
                    return res.status(401).send();
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        }
    } else {
        next();
    }
});

router.get("/meeting", meetingCtrl.getAll);

router.post("/session", sessionCtrl.create);
router.post("/account/register", accountCtrl.register);

module.exports = router;
