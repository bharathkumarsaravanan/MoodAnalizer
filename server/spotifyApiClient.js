const axios = require('axios');
const { getToken, setToken } = require('./tokenstore');
const dotenv = require('dotenv');
const User = require('./src/models/User');

dotenv.config();

async function spotifyClient(userId, config) {

    let token = getToken(userId);
    
    if (!token) {
        const userDetails = await getUser(userId);
        console.log("userDetails", userDetails);
        token = {
            accessToken: userDetails.accessToken,
            refreshToken: userDetails.refreshToken,
        };
    }
    // if (!token) {
    //     throw new Error('No token found');
    // }
    config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token.accessToken}`,
      };
    console.log("token", token, config.headers, token.accessToken);
    try {
        return await axios(config);
    } catch (error) {
        if (error.response.status === 401) {
            const authUrl = `https://accounts.spotify.com/api/token`;
            const response = await axios.post(authUrl, 
                new URLSearchParams({
                    grant_type: 'refresh_token',
                    refresh_token: token.refreshToken,
                    client_id: process.env.SPOTIFY_CLIENT_ID,
                    scope: 'user-read-private user-read-email',
                    client_secret: process.env.SPOTIFY_CLIENT_SECRET,
                }).toString(),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );
            const accessToken = response.data.access_token;
            setToken(userId, accessToken, token.refreshToken);
            config.headers.Authorization = `Bearer ${accessToken}`;
            return await axios(config);
        }
        throw error;
    }
}

async function getUser(userId) {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

module.exports = { spotifyClient, getUser };