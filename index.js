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
    const teachersData = database.collection('teachers');
    const servicesData = database.collection('services');
    // const myUserCollection = database.collection('users');
    console.log('database successfully coneted')
    //update user+add(post user)-------------------------------------upsert (google login)

//    //Post method  Method (single document)-----------API--Post
   app.post('/studentsData', async(req,res)=>{
    const studentsData = req.body;
    const result = await studentsDataCollection.insertOne(studentsData);
    res.json(result)
  })
   //Get students Metod ---------------------API--get---students
  app.get('/studentsData', async(req, res)=>{
    // const section = req.params.section;
    // const query = { section:'six'};
    const student = studentsDataCollection.find({});
    const result = await student.toArray();
    res.send(result);
   
  })

//   //Get Metod  get all teachers---------------------API--get all
  app.get('/teachers', async(req, res)=>{
    const teachers = teachersData.find({});
    const result = await teachers.toArray();
    res.send(result);
   
  })
//   //Get Metod  get all services--------------------API--get all
  app.get('/services', async(req, res)=>{
    const services = servicesData.find({});
    const result = await services.toArray();
    res.send(result);
   
  })


    
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
