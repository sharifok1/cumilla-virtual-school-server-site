const express = require('express');
const { MongoClient } = require("mongodb");
const cors = require('cors');

const app = express();
require('dotenv').config();
// const  ObjectId = require('mongodb').ObjectId;
const port = process.env.PORT || 3010
app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.he93e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri)

async function run(){
  try {
    await client.connect();
    const database = client.db('education-website');
    const studentsDataCollection = database.collection('studentsData');
    // const myUserCollection = database.collection('users');
    console.log('database successfully coneted')
    //update user+add(post user)-------------------------------------upsert (google login)

//    //Post method  Method (single document)-----------API--Post
   app.post('/studentsData', async(req,res)=>{
    const studentsData = req.body;
    const result = await studentsDataCollection.insertOne(studentsData);
    res.json(result)
    console.log(result)
  })

//   //Get Metod  get all myDocs---------------------API--get all
//   app.get('/myDocs', async(req, res)=>{
//     const myDocs = myDocsCollection.find({});
//     const result = await myDocs.toArray();
//     res.json(result)
//   })


    
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/' , (req, res)=>{
  res.json('cumilla virtual school server is running');
})

app.listen(port, ()=> {
  console.log('education server is running and listing from',port)
})
