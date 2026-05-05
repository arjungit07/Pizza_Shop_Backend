const express = require("express");
const morgan = require("morgan");
const cors = require('cors');

// const connectDB = require('./config/config')
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/config");
const data = require("./data/pizza-data");
require("colors");

//config
dotenv.config();

//conection
//
connectDB();
const app = express();

//middlewares;
app.use(morgan("dev"));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);


const allowedOrigins = [
  "https://online-pizza-delivery-app.vercel.app",
  "http://localhost:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    if (
      !origin || 
      allowedOrigins.includes(origin) || 
      origin.includes("vercel.app")
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
// app.use(function (req, res, next) {	
//     res.setHeader('Access-Control-Allow-Origin', 'https://online-pizza-delivery-app.vercel.app',);    
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');   
//     res.setHeader('Access-Control-Allow-Credentials', true);    
//     next();
// });

//route
app.use("/api/pizza", require("./router/pizzaRouter"));
app.use("/api/users", require("./router/userRouter"));
app.use("/api/orders", require("./router/orderRouter"));
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `Server running on ${process.env.NODE_ENV}mode on port no.${process.env.PORT}`
      .bgRed.white
  );
});
