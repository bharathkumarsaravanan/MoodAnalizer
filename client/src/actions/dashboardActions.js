import axios from 'axios';
import { spotifyUserId } from './utils';

axios.defaults.baseURL = 'http://localhost:5001';

export const getUser = async () => {
    const response = await axios.get(`/users/${spotifyUserId}/details`);
    return response.data;
}

export const getPlaylists = async (user) => {
    const response = await axios.get(`/dashboard/${spotifyUserId}/playlists`);
    return response.data;
}