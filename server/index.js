const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const verifyToken = require('./verifyToken.js');


const serviceAccount = require('./config/favsKey.json');
const Firestore = require('@google-cloud/firestore');
const bodyParser = require('body-parser');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://favs-669fd.appspot.com',
});

const firestore = admin.firestore();

const app = express();
app.use(express.json());
app.use(bodyParser.json());

// CORS middleware
app.use(cors());

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Middleware to parse incoming JSON requests
app.use(express.json());

const userRouter = require('./routes/users.js');

app.use('/users', userRouter);

app.listen(3000);








