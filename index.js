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


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        // await client.connect();

        const database = client.db("mujanDB");
        const iphoneCollection = database.collection("iphone");
        const googleCollection = database.collection("google");
        const samsungCollection = database.collection("samsung");
        const sonyCollection = database.collection("sony");
        const intelCollection = database.collection("intel");
        const miCollection = database.collection("mi");
        const cartCollection = database.collection("cart");
        const newsLatterCollection = database.collection("newsLatter");


        // newLatter
        app.post('/newsLatter', async (req, res) => {
            const email = req.body.email
            const result = await newsLatterCollection.insertOne({ email: email })
            res.send(result)
        })


        // car
        app.post('/cart', async (req, res) => {
            const cartProduct = req.body
            const result = await cartCollection.insertOne(cartProduct)
            res.send(result)
        })

        app.get('/cart/:email', async (req, res) => {
            const email = req.params.email
            const filter = { email: email }
            const query = cartCollection.find(filter)
            const result = await query.toArray()
            res.send(result)
        })

        app.delete('/cart/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await cartCollection.deleteOne(query)
            res.send(result)
        })

        // apple related apis
        app.post('/apple', async (req, res) => {
            const newProduct = req.body
            console.log(newProduct)
            const result = await iphoneCollection.insertOne(newProduct)
            res.send(result)
        })

        app.get('/apple', async (req, res) => {
            const query = iphoneCollection.find()
            const result = await query.toArray()
            res.send(result)
        })

        app.get('/apple/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await iphoneCollection.findOne(query)
            res.send(result)
        })
        app.put('/apple/:id', async (req, res) => {
            const id = req.params.id;
            const update = req.body
            const filter = { _id: new ObjectId(id) }
            const updateDoc = {
                $set: {
                    name: update.name,
                    brand: update.brand,
                    price: update.price,
                    photo: update.photo,
                    rating: update.rating,
                    type: update.type,
                    desc: update.desc
                }
            }
            const result = await iphoneCollection.updateOne(filter, updateDoc)
            res.send(result)
        })



        // google
        app.post('/google', async (req, res) => {
            const newProduct = req.body
            console.log(newProduct)
            const result = await googleCollection.insertOne(newProduct)
            res.send(result)
        })

        app.get('/google', async (req, res) => {
            const query = googleCollection.find()
            const result = await query.toArray()
            res.send(result)
        })

        app.get('/google/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await googleCollection.findOne(query)
            res.send(result)
        })
        app.put('/google/:id', async (req, res) => {
            const id = req.params.id;
            const update = req.body
            const filter = { _id: new ObjectId(id) }
            const updateDoc = {
                $set: {

                    name: update.name,
                    brand: update.brand,
                    price: update.price,
                    photo: update.photo,
                    rating: update.rating,
                    type: update.type,
                    desc: update.desc
                }
            }
            const result = await googleCollection.updateOne(filter, updateDoc)
            res.send(result)
        })



        // samsung
        app.post('/samsung', async (req, res) => {
            const newProduct = req.body
            console.log(newProduct)
            const result = await samsungCollection.insertOne(newProduct)
            res.send(result)
        })

        app.get('/samsung', async (req, res) => {
            const query = samsungCollection.find()
            const result = await query.toArray()
            res.send(result)
        })
        app.get('/samsung/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await samsungCollection.findOne(query)
            res.send(result)
        })
        app.put('/samsung/:id', async (req, res) => {
            const id = req.params.id;
            const update = req.body
            const filter = { _id: new ObjectId(id) }
            const updateDoc = {
                $set: {
                    name: update.name,
                    brand: update.brand,
                    price: update.price,
                    photo: update.photo,
                    rating: update.rating,
                    type: update.type,
                    desc: update.desc
                }
            }
            const result = await samsungCollection.updateOne(filter, updateDoc)
            res.send(result)
        })



        // sony
        app.post('/sony', async (req, res) => {
            const newProduct = req.body
            console.log(newProduct)
            const result = await sonyCollection.insertOne(newProduct)
            res.send(result)
        })
        app.get('/sony', async (req, res) => {
            const query = sonyCollection.find()
            const result = await query.toArray()
            res.send(result)
        })
        app.get('/sony/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await sonyCollection.findOne(query)
            res.send(result)
        })
        app.put('/sony/:id', async (req, res) => {
            const id = req.params.id;
            const update = req.body
            const filter = { _id: new ObjectId(id) }
            const updateDoc = {
                $set: {
                    name: update.name,
                    brand: update.brand,
                    price: update.price,
                    photo: update.photo,
                    rating: update.rating,
                    type: update.type,
                    desc: update.desc
                }
            }
            const result = await sonyCollection.updateOne(filter, updateDoc)
            res.send(result)
        })




        // intel
        app.post('/intel', async (req, res) => {
            const newProduct = req.body
            console.log(newProduct)
            const result = await intelCollection.insertOne(newProduct)
            res.send(result)
        })

        app.get('/intel', async (req, res) => {
            const query = intelCollection.find()
            const result = await query.toArray()
            res.send(result)
        })
        app.get('/intel/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await intelCollection.findOne(query)
            res.send(result)
        })
        app.put('/intel/:id', async (req, res) => {
            const id = req.params.id;
            const update = req.body
            const filter = { _id: new ObjectId(id) }
            const updateDoc = {
                $set: {
                    name: update.name,
                    brand: update.brand,
                    price: update.price,
                    photo: update.photo,
                    rating: update.rating,
                    type: update.type,
                    desc: update.desc
                }
            }
            const result = await intelCollection.updateOne(filter, updateDoc)
            res.send(result)
        })



        // mii

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