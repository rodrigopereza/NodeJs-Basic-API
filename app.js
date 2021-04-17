const express = require("express");

const app = express();
//bring in routes
const postRoutes = require("./routes/post");

//Middleware
const morgan = require("morgan");

//Eviroment
const dotenv = require("dotenv");
dotenv.config();

//DataBase
//MONGO_URI=mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false
const mongose = require("mongoose");
mongose.connect(process.env.MONGO_URI, { useNewUrlParser: true , useUnifiedTopology: true }).then(()=>{
    console.log('DB Connected');
});

mongose.connection.on(`error`, err =>{
    console.log(`DB connection error: ${err.message}`);
});

//Body Parcer
const bodyParser = require("body-parser");

//Validador
const expressValidator = require("express-validator");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(expressValidator());
app.use("/", postRoutes);

const port = process.env.port || 8888;

app.listen(port, ()=> {
    console.log(`A Node Js API is Listenig on port : ${port}`)
});