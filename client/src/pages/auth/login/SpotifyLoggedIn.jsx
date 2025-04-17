import React from 'react';
import { useParams } from 'react-router-dom';

export default function SpotifyLoggedIn() {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    return (
        <div>
            <h1>Spotify Logged In</h1>
            <p>User ID: {userId}</p>
        </div>
    );
}