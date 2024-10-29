// const express=require("express")
// const mongoose=require("mongoose")
// const cors=require("cors")
// const bodyParser=require("body-parser");
// const router = require("./src/Routes/ApiRouter");
// require("dotenv").config();
// const app=express();

// // middleware cors bodyparser not found and api manegment start
//    app.use(cors())
//    app.use(bodyParser.json())
//    app.use("/api/v1",router)
// app.use("*",(req,res)=>{
//     try {
//         res.status(404).json({stauts:"not found"})
//     } catch (error) {
//         res.status(404).json({status:"some thing went rong"})
//     }
// })
// // middleware cors bodyparser not found manegment end

// // mongoConneted start
//  mongoose.connect(process.env.MONGO_URI)
//  .then(()=>console.log(`db connected`))
//  .catch((err)=>console.log(err))
// // mongoConneted end
// module.exports=app;

// Importing required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./src/Routes/ApiRouter");
require("dotenv").config();

class AppServer {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.middlewares();
    this.routes();
    this.databaseConnect();
    this.errorHandling();
  }

  // Setup middlewares
 middlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
  }

  // Setup routes
  routes() {
    this.app.use("/api/v1", router);
  }

  // Database connection
  databaseConnect() {
    mongoose.connect(process.env.MONGO_URI)
      .then(() => console.log("DB connected"))
      .catch((err) => console.log("DB connection error:", err));
  }

  // Error handling for undefined routes
  errorHandling() {
    this.app.use("*", (req, res) => {
      res.status(404).json({ status: "not found" });
    });
  }

  // Start server
  start() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

// Instantiate and start the server
const server = new AppServer();
server.start();

module.exports = server.app;
