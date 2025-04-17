require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dashboardRouter = require('./features/dashboard');

const app = express();
exports.app = app;
app.use(cors());

app.use('/dashboard', dashboardRouter);


const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/api/token";
exports.SPOTIFY_AUTH_URL = SPOTIFY_AUTH_URL;

app.get('/auth/spotify', (req, res) => {
    const scope = "user-read-private user-read-email";
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}&show_dialog=true`;
    res.redirect(authUrl);
});

app.get('/callback', async (req, res) => {
    const code = req.query.code;
    
    if (!code) {
        return res.status(400).send('No code provided');
    }

    try {
        const response = await axios.post(
            SPOTIFY_AUTH_URL,
            new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                redirect_uri: process.env.REDIRECT_URI,
                client_id: process.env.SPOTIFY_CLIENT_ID,
                client_secret: process.env.SPOTIFY_CLIENT_SECRET,
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        console.log(response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error exchanging code for token:', error);
        res.status(500).json({ error: 'Failed to exchange code for token' });
    }
});

