require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const appRoutes = require('./app');
const path = require('path');
const app = express();
app.use(express.json());

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://mood-analyzer-mu.vercel.app' 
    : 'http://localhost:3000',
  credentials: true
};

app.use(cors(corsOptions));

app.use('/', appRoutes);

const port = process.env.PORT || 5001;

connectDB();

// Serve static React build files
app.use(express.static(path.join(__dirname, '../../client/build')));

app.get('/health', (req, res) => {
  res.status(200).send('Server is healthy');
});

app.get('*', (req, res) => {
  // Check if the request is for an API route
  if (req.url.startsWith('/api') || 
      req.url.startsWith('/users') || 
      req.url.startsWith('/callback') || 
      req.url.startsWith('/dashboard')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  
  // Otherwise serve the React app
  res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});