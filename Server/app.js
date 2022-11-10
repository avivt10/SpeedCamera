const connect = require('./mongoConnection');
require('dotenv').config();
const express = require('express');
const app = express();
var cors = require("cors");
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

connect()


app.use('/', require('./routes'));



app.listen(3000 ,() => {
    console.log("Port is listing 3000...")
})

