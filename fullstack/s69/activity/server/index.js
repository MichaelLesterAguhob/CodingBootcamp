const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const gameRoutes = require("./routes/game");
const userRoutes = require("./routes/user");

mongoose.connect("mongodb+srv://admin:admin123@cluster0.zlyew.mongodb.net/gameApp?retryWrites=true&w=majority&appName=Cluster0", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'))

const app = express();

const corsOptions = ({
    origin: ['http://localhost:8000', 'http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200
})

app.use(cors(corsOptions));
app.use(express.urlencoded({extended:true}));

app.use("/games", gameRoutes);
app.use("/users", userRoutes);

app.listen(process.env.PORT || 4000, () => {
    console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
});

module.exports = { app, mongoose };