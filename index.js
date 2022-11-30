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

const database = async () => {
    const productColection = client.db("e-paq").collection("products");

    // Get All Product With Pagination
    app.get("/products", async (req, res) => {
        const page = parseInt(req.query.page);
        const size = parseInt(req.query.size);
        const curser = productColection.find({});
        const products = await curser
            .skip(page * size)
            .limit(size)
            .toArray();
        const count = await productColection.estimatedDocumentCount();
        res.send({ count, products });
    });

    // Products By Id
    app.post("/productsByIds", async (req, res) => {
        const ids = req.body;
        const objectIds = ids.map((id) => ObjectId(id));
        const query = { _id: { $in: objectIds } };
        const cursor = productColection.find(query);
        const products = await cursor.toArray();
        res.send(products);
    });
};

database().catch(({ name, message }) => console.log(`${name.bgRed.bold} : ${message.red}`));

app.listen(port);
