const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const ObjectId=require('mongodb').ObjectId;
require('dotenv').config();
const app = express();
const port=5000;


app.use(cors());
app.use(express.json())


// user: abusufian
// pass:xrdpZB48aQFoYtLs


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0epdq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run() {
    try {
      await client.connect();
      const database = client.db("carService");
      const itemCollection = database.collection("item");

      // GET API 

      app.get('/services',async(req,res) => {
        const cursor=itemCollection.find({});
        const services=await cursor.toArray();
        res.send(services);
        
      })

      // SINGLE API 
      app.get('/services/:id',async(req,res) => {
        const id=req.params.id;
        console.log(id);
        const query={_id: ObjectId(id) };
        const service=await itemCollection.findOne(query);
        res.json(service);
        console.log(service)
       
        
      })

      

    //   POST API
    app.post('/services',async(req, res)=>{

        const service=req.body;
        const result = await itemCollection.insertOne(service);
        console.log(result);
        res.json(result);

      
    })

    
      
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);


app.get('/', (req,res)=>{
    res.send("I LOVE YOU NASRIN")
});


app.listen(port,()=>{
    console.log("lisitining this port ",port)
});

/* 
const express=require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors=require('cors');
const app = express();
const port=8080;

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0epdq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run() {
  try {
    await client.connect();

    const database = client.db("nasrin");
    const lovesCollection = database.collection("loves");
    
    
// get

    app.get('/loves',async(req,res)=>{
      const cursor = lovesCollection.find({});
      const loves=await cursor.toArray();
      res.send(loves)
    })



    // post

    app.post('/loves',async(req, res)=>{
      const loved=req.body;
      const result = await lovesCollection.insertOne(loved);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);

    })

// const loved={
//   title:"I LOVE YOU",
//   name:"Nasrin",
//   place:"Hart"
// }



    

  } finally {
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/love', (req, res)=>{
  console.log("NASRIN I REALLLY LOVE YOU LOT")
  res.send('DO YOU MERRY ME')
});

app.listen(port,()=>{
  console.log('lisitining this port running',port)

}); */