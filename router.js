let express = require("express");
let ctrl = require("./server/controllers/meeting.server.controller.js");

let router = express.Router();

router.get("/meeting", ctrl.getAll);

module.exports = router;
