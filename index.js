const { MongoClient } = require('mongodb');
const express = require('express');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 4000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e3dsx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri)
app.get('/', (req, res) => {
    res.send("volunteer server open");
});

app.listen(port, () => {
    console.log("volunteer server port", port)
});
