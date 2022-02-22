import express from 'express';
const app = express();
import bodyParser from "body-parser"
// import testAPIRouter from "../backend/routes/api/testAPI";
import UserRouter from "./routes/api/Buyer.js";
import VendorRouter from "./routes/api/Vendor.js";
import OrderRouter from "./routes/api/Order.js"
import cors from 'cors';
import mongoose from 'mongoose';
// require("dotenv").config();

const PORT = process.env.PORT || 4000;
const DB_NAME = "dass"
var corsOptions = {
  origin: process.env.corsOptions || "http://localhost:4001"
};
// routes

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect('mongodb+srv://react:123@cluster0.fwltm.mongodb.net/dass?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('MongoDB Connected…')
  })
  .catch(err => console.log(err));
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})
// setup API endpoints
// app.use("/testAPI", testAPIRouter);
app.use("/Buyer", UserRouter);
app.use("/Vendor", VendorRouter);
app.use("/Order",OrderRouter)
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
