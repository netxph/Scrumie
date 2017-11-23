let express = require("express");

const PORT = 3000;

let app = express();

app.use(express.static("./public"));
app.use("*", (req, res) => {
    res.send("Resource not found (404).");
});

app.listen(PORT, () => {
    console.log(`[${PORT}] server started.`);
});
