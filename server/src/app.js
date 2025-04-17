const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const userControllers = require('./controllers/userControllers');
const playlistsRoutes = require('./routes/playlistsRoutes');

app.use(express.json());


app.use('/users', userRoutes);
app.use('/callback', userControllers.handleCallback);
app.use('/dashboard', playlistsRoutes);

module.exports = app;