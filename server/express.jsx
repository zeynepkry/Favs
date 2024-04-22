const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./config/favsKey.json');
//const { initializeApp } = require("firebase/app");
//const { getAnalytics } = require("firebase/analytics");
const Firestore = require('@google-cloud/firestore');
const bodyParser = require('body-parser');
/*
const firebaseConfig = {
  apiKey: "AIzaSyDjQluZHyKDKCHPgh4vpGVMyvHhgRaro-8",
  authDomain: "favs-669fd.firebaseapp.com",
  projectId: "favs-669fd",
  storageBucket: "favs-669fd.appspot.com",
  messagingSenderId: "449419071456",
  appId: "1:449419071456:web:7501af936288439d466585",
  measurementId: "G-E1W25M9WGF"
};
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://favs-669fd.appspot.com',
});
*/
const app = express();
app.use(express.json())
app.use(bodyParser.json());



// CORS middleware
app.use(cors());
/*
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
*/

app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))

app.set("view engine", "ejs")
//app.use(logger)



// Middleware to parse incoming JSON requests
app.use(express.json());


//app.get('/', logger, (req, res) => {
  //res.send("helloooo "); 
//});

const userRouter = require('./routes/users.jsx')

app.use('/users',userRouter)

//function logger(req,res,next){
  //console.log(req.originalUrl)
 // next()
//}

app.listen(3000)