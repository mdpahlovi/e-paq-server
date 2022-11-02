const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// MiddleWire
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("E-Paq Server Running");
});

app.listen(port);
