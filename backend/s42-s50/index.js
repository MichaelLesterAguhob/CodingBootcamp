
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
require('dotenv').config();

mongoose.connect(process.env.MONGODB_STRING);

mongoose.connection.on('open', () => console.log('Now connected to MongoDB Atlas'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: ['http://localhost:8000'],
    credentials: true,
    optionSuccessStatus: 200,
    // methods: ['GET', 'POST'],
    // allowedHeaders: ['Content-Type', 'Authorization]
}

app.use(cors(corsOptions));

if(require.main == module) {
    app.listen(process.env.PORT, () => console.log(`API is now online on pot ${process.env.PORT}`));
}

module.exports = {app, mongoose};

