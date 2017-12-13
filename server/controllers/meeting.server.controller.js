const Meeting = require("../models/meeting.server.model.js");

exports.getAll = function(req, res) {

    Meeting.findAll()
        .then((meetings) => {
            return res.status(200).json(meetings);
        })
        .catch((error) => {
            console.log(error);
            return res.status(400).send();
        });
}

exports.create = function(req, res) {
    let meeting = new Meeting(req.body);

    meeting.save((err, meeting) => {
        if(err) {
            console.log(err);
            return res.status(500).send();
        } else {
            return res.status(204).send();
        }
    });
}
