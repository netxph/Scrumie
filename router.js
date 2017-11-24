let express = require("express");
let meetingCtrl = require("./server/controllers/meeting.server.controller.js");
let sessionCtrl = require("./server/controllers/session.server.controller.js");

let router = express.Router();

router.use(function(req, res, next) {
    console.log(req.headers.authorization);
    next();
});

router.get("/meeting", meetingCtrl.getAll);
router.post("/meeting", meetingCtrl.create);
router.post("/session", sessionCtrl.create);

module.exports = router;
