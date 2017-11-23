exports.getAll = (req, res) => {
    data = [{ 
        id: 1, 
        name: "Marc Vitalis", 
        project: "Scrumie",
        yesterday: "is history",
        today: "is present",
        impediment: "is story" }];

    res.status(200).send(data);
}

exports.create = (req, res) => {
    console.log(req.body);
    res.status(204).send();
}
