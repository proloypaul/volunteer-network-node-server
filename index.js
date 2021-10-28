const { MongoClient } = require('mongodb');
const express = require('express');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 4000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e3dsx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// console.log(uri)

async function run() {
    try{
        await client.connect()
        // console.log("database working")
        const database = client.db("volunteerWork")
        const topicCollection = database.collection("topic")

        // GET method to show data in my server from database
        app.get('/topicdata', async (req, res) => {
            const cursor = await topicCollection.find({})
            const result = await cursor.toArray()
            // console.log("data result", result)
            res.send(result)
        })



    }finally{
        // await client.close()
    }
}
run().catch(console.dir)
app.get('/', (req, res) => {
    res.send("volunteer server open");
});

app.listen(port, () => {
    console.log("volunteer server port", port)
});
