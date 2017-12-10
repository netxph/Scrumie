const User = require("../models/user.server.model.js");

exports.register = (req, res) => {
    let user = req.body;

    let entry = new User({
        name: user.name,
        password: user.password
    });

    entry.save((error, data) => {
        if(error) {
            console.error(error);
            res.status(500).send();
        } else {
            res.status(204).send();
        }
    });
}
