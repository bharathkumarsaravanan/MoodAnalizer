require('dotenv').config();
const axios = require('axios');
const User = require('../models/User');

exports.getAccessToken = async (req, res) => {
    try {
        const scope = "user-read-private user-read-email";
        const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}&show_dialog=true`;
        res.redirect(authUrl);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.handleCallback = async (req, res) => {
    const code = req.query.code;
    
    if (!code) {
        return res.status(400).send('No code provided');
    }

    try {
        const response = await axios.post(
            process.env.SPOTIFY_AUTH_URL,
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
        // Get user profile data from Spotify
        const userProfileResponse = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${response.data.access_token}`
            }
        });
        
        // Add user profile data to response
        const email = userProfileResponse.data.email;
        const user_id = userProfileResponse.data.id;

        const user = await User.findOneAndUpdate(
            { email: email },
            { 
                accessToken: response.data.access_token, 
                refreshToken: response.data.refresh_token,
                email: email,
                name: userProfileResponse.data.display_name
            },
            { new: true, upsert: true }
        );
        res.redirect(`http://localhost:5001/spotify-logged-in?userId=${user._id}`);
    } catch (error) {
        console.error('Error exchanging code for token:', error);
        res.status(500).json({ error: 'Failed to exchange code for token' });
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        setTimeout(() => {
            res.json(user);
        }, 5000);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.logoutUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, {
            $unset: { accessToken: "", refreshToken: "" }
        });
        res.sendStatus(200).send({message: "User logged out successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}