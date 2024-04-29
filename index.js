const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = 3000

app.use(cors());
app.use(express.json())

// VmokxtbuUEIzLTiN
// aorjon123
// gfdgfgk,bnxhdjhv


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ej6qyrh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });

    app.get('/paintings', async (req, res) => {
      const cursor = paintingCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/paintings/:id', async (req, res) => {
      const id = req.params.id;

      try {
        const query = { _id: new ObjectId(id) };
        const painting = await paintingCollection.findOne(query);

        if (!painting) {
          return res.status(404).send('Painting not found');
        }

        res.send(painting);
      } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
      }

    })



    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})