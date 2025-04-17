require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const appRoutes = require('./app');
const path = require('path');
const app = express();
app.use(express.json());
app.use(cors());

app.use('/', appRoutes);

const port = process.env.PORT || 5001;

connectDB();

// Serve static React build files
app.use(express.static(path.join(__dirname, '../../client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});