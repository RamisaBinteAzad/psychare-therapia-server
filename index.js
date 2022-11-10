const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

 
app.use(cors());
app.use(express.json());
 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dydehr7.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
    try {
      const serviceCollection = client
        .db("psychareTherapia")
        .collection("services");
      //   Get All Services
      app.get("/services", async (req, res) => {
       
        const query = {};

          const cursor = serviceCollection.find(query);
          //   const allServices = await cursor.toArray();
          //  const query1 = {};
        // const cursor1 = serviceCollection.find(query1);
          const services = await cursor.limit(3).toArray();
          // console.log(services);
           
        //   res.send({ count, services });
          res.send(services);
         
        // res.send(services);
      });
         app.get("/allServices", async (req, res) => {
           const query = {};

           const cursor = serviceCollection.find(query);
           //   const allServices = await cursor.toArray();
           //  const query1 = {};
           // const cursor1 = serviceCollection.find(query1);
           const allServices = await cursor.toArray();
           console.log(allServices);

           //   res.send({ count, services });
           res.send(allServices);

           // res.send(services);
         });
    } finally {
  }
}

run().catch((err) => console.error(err));
 

app.get("/", (req, res) => {
  res.send("psychare-therapia server is running");
});

app.listen(port, () => {
  console.log(`psychare-therapia server running on ${port}`);
});
