const express = require('express');
const { use } = require('express/lib/router');
const cors=require('cors')
app=express()
port=process.env.PORT ||5000
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');


// middle ware===
 app.use(cors())
 app.use(express.json())
// middle ware===

app.get('/', (req, res) => {
    res.send('server is on the way to serve me')
  })
  // =============================================
  

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.z4bsa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
  try {
    await client.connect();
    const electroCollection = client.db("elctroCollection").collection("gadgets");
   
    //  to load all data in server=================
    app.get('/gadgets',async(req,res)=>{
      const query = { };
   
      const cursor = electroCollection.find(query);
      
     const Gadgets= await cursor.toArray( );
     res.send(Gadgets)
    })
    //  to load all data in server=================
//  to Add products=================
app.post('/product', async (req,res)=>{
  const NewProduct=req.body
  console.log("ihdgiudhv",NewProduct);
 const result = await electroCollection.insertOne(NewProduct);
  
  res.send(result)
})
//  to Add products=================




  } finally {
    // await client.close();
  }
}


run().catch(console.dir);

  // =============================================
  
  app.listen(port, () => {
    console.log(`server is running ${port}`)
  })