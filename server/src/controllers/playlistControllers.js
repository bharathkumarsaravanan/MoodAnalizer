require('dotenv').config();
const axios = require('axios');
const User = require("../models/User");
const {spotifyClient} = require('../../spotifyApiClient');

exports.getPlaylists = async (req, res) => {
   const { user } = req.params;
   const { limit } = req.query;
   const userDetailsuser = await User.findById(user);
   const accessToken = userDetailsuser.accessToken;

   try {
     const response = await spotifyClient(user, {
        method: 'GET',
        url: 'https://api.spotify.com/v1/me/playlists',
     });
     
     setTimeout(() => {
         res.json(response.data);
     }, 5000);
     
   } catch (error) {
        console.error('Error fetching playlists:', error);
        res.status(500).json({error: 'Failed to fetch playlists'});
   }
}