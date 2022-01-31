const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const personRoutes = require("./routes/personRoutes");

const app = express();

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@apicluster.utp1q.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(3333)
    })
    .catch((err) => console.log(err));

// start - API routes

app.use("/person", personRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "hi"
    });
});

// end - API routes