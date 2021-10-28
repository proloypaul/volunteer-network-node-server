const { MongoClient } = require('mongodb');
const express = require('express');
require('dotenv').config()
const cors = require('cors')
const app = express()
const ObjectId = require('mongodb').ObjectId
const port = process.env.PORT || 4000;

app.use(express.json())
app.use(cors())
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e3dsx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// console.log(uri)

async function run() {
    try{
        await client.connect()
        // console.log("database working")
        const database = client.db("volunteerWork")
        const topicCollection = database.collection("topic")
        const userCollection = database.collection("users")

        // GET method to show data in my server from database
        app.get('/topicdata', async (req, res) => {
            const cursor = await topicCollection.find({})
            const result = await cursor.toArray()
            // console.log("data result", result)
            res.send(result)
        })

        // POST method collect clint data send to database 
        app.post('/users', async (req, res) => {
            const userData = req.body
            // console.log("user data", userData);
            const result = await userCollection.insertOne(userData)
            console.log("inset database result", result)
            res.json(result)
        })

        // GET method to collect user data from database
        app.get('/users', async (req, res) => {
            const cursor = await userCollection.find({});
            const result = await cursor.toArray()
            res.send(result)
        })

        // DELETE method to delete user
        app.delete('/users:id', async (req, res) => {
            const userId = req.params.id
            console.log("user id ", userId)
            const query = {_id: ObjectId(userId)}
            const result = await userCollection.deleteOne(query);
            console.log("delete result", result)
            res.json(result)
           
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
