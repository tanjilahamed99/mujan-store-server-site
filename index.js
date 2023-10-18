const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.port || 5000

app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.send('hello this is backend')
})


const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://<username>:<password>@cluster0.8mn4lkn.mongodb.net/?retryWrites=true&w=majority";
const uri = `mongodb+srv://${process.env.DP_USER}:${process.env.DB_PASS}@cluster0.8mn4lkn.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const database = client.db("mujanDB");
        const iphoneCollection = database.collection("iphone");
        const googleCollection = database.collection("google");
        const samsungCollection = database.collection("samsung");
        const sonyCollection = database.collection("sony");
        const intelCollection = database.collection("intel");


        app.get('/iphone', async (req, res) => {
            const query = iphoneCollection.find()
            const result = await query.toArray()
            res.send(result)
        })

        // google
        app.get('/google', async (req, res) => {
            const query = googleCollection.find()
            const result = await query.toArray()
            res.send(result)
        })

        // samsung
        app.get('/samsung', async (req, res) => {
            const query = samsungCollection.find()
            const result = await query.toArray()
            res.send(result)
        })

        // sony
        app.get('/sony', async (req, res) => {
            const query = sonyCollection.find()
            const result = await query.toArray()
            res.send(result)
        })

        // sony
        app.get('/intel', async (req, res) => {
            const query = intelCollection.find()
            const result = await query.toArray()
            res.send(result)
        })



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.listen(port, () => {
    console.log(`app running on port ${port}`)
})