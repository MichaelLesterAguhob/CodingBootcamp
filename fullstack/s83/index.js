const express = require('express');
const mongoose = require('mongoose');

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb+srv://admin:admin1234@aguhobdb.e7hub.mongodb.net/movie-catalog-app?retryWrites=true&w=majority&appName=aguhobDB');
mongoose.connection.once('open', () => console.log('Connected to database'))

const userRoutes = require('./routes/user');
const movieRoutes = require('./routes/movie')

app.use('/users', userRoutes);
app.use('/movies', movieRoutes);

app.listen(4000, () => {console.log(`Running on port: 4000`)})

module.exports = (app, mongoose);