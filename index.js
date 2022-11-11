const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
      const reviewsCollection = client
        .db("psychareTherapia")
        .collection("reviews ");
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
        // console.log(allServices);

        //   res.send({ count, services });
        res.send(allServices);

        // res.send(services);
      });
      //   Get Specific Service
      app.get("/services/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const service = await serviceCollection.findOne(query);
        res.send(service);
      });
      app.post("/reviews", async (req, res) => {
        const review = req.body;
        const result = await reviewsCollection.insertOne(review);
        res.send(result);
      });
      app.get("/reviews", async (req, res) => {
        //   console.log(req.query);
        // {} deya hoyeche sabguloke khujar jonno
        let query = {};
        console.log(req.query);

        if (req.query.service) {
          query = {
            service: req.query.service,
          };
        }

        const cursor = reviewsCollection.find(query);
        const reviews = await cursor.toArray();
        console.log(reviews);
        //   toArray() - array te convert kora hoyeche client side e use er jonno
        res.send(reviews);
      });

      app.get("/myReviews", async (req, res) => {
        let query = {};

        if (req.query.email) {
          query = {
            email: req.query.email,
          };
        }

        const cursor = reviewsCollection.find(query);
        const myReviews = await cursor.toArray();

        res.send(myReviews);
      });
      //   Delete
      app.delete("/myReviews/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await reviewsCollection.deleteOne(query);
        res.send(result);
      });
        app.post("/addService", async (req, res) => {
          const service = req.body;
          const result = await serviceCollection.insertOne(service);
          res.send(result);
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
