const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("colors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// MiddleWire
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("E-Paq Server Running");
});

const url = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.ifnkrk6.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url);
const fun = async () => {
    await client.connect();
    const products = client.db("e-paq").collection("products");
    products.insertOne({ name: "Hanna" });
};

fun().catch((error) => console.log(`${error.name.bgRed.bold} ${error.message.red}`));

app.listen(port);
