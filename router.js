let express = require("express");
let auth = require("./auth.js");
let sessionCtrl = require("./server/controllers/session.server.controller.js");
let meetingCtrl = require("./server/controllers/meeting.server.controller.js");
let accountCtrl = require("./server/controllers/account.server.controller.js");

let router = express.Router();

router.post("/session", sessionCtrl.create);
router.post("/account/register", accountCtrl.register);

router.get("/meeting", auth.check, meetingCtrl.getAll);
router.post("/meeting", auth.check, meetingCtrl.create);

module.exports = router;
