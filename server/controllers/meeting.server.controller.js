exports.getAll = function(req, res) {

    var data = [ {
        name: "Marc Vitalis",
        project: "Scrumie",
        yesterday: "... is history",
        today: "... is present",
        impediment: "... is a mystery"
    }];

    res.status(200).json(data);
}
