const express = require("express");
const bodyparser = require('body-parser')
const app = express();
app.use(bodyparser.json());
const mongoose = require("mongoose");

const UserRouter = require("./API/Routes/User-route");

const MONGODB_LINK = 'mongodb://sarthak-rapidops:sarthak@rapidops-shard-00-00-0d1fa.mongodb.net:27017,rapidops-shard-00-01-0d1fa.mongodb.net:27017,rapidops-shard-00-02-0d1fa.mongodb.net:27017/cucumber?ssl=true&replicaSet=rapidops-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose.connect(MONGODB_LINK, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("Connected");
}).catch(err => {
    console.log("Mongoose: Error - ", err.message);
});

app.use('/user', UserRouter);

app.listen(3000);


