import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/global/logo.jpg';


export default function Login() {
    const navigate = useNavigate();
    const openSpotifyLogin = () => {
        const popup = window.open(
            "http://localhost:5001/users/auth/spotify",
            "Spotify Login",
            "width=600,height=700"
        );

        const checkPopup = setInterval(() => {
            if (!popup || popup.closed) {
                clearInterval(checkPopup);
                // Check for access token in URL
                const params = new URLSearchParams(popup.location.search);
                const userId = params.get("userId");

                if (userId) {
                    // Store the access token (e.g., localStorage)
                    console.log("User ID:", userId);
                    localStorage.setItem("spotify_user_id", userId);
                    navigate(`/home/dashboard`);
                }
            }
        }, 1000);
    };

    return (
        <div className="login-page flex items-center justify-center bg-gradient-to-b from-gray-800 to-black">
            <div className="login-container grid grid-cols-1 mt-20 bg-black rounded-lg py-10 px-2 items-center w-1/3 justify-center gap-20 shadow-lg">
                    <div className="flex flex-col items-center justify-center gap-5">
                    <div className="flex flex-col items-center justify-center ">
                        <img src={logo} alt="logo" className="w-20" />
                        <h1 className="text-6xl text-center font-bold text-primary header-font">Login to Moodify</h1>
                    </div>
                    <p className="text-center text-white px-8">Welcome to Moodify! Discover a new way to experience your Spotify playlists. Login to analyze your music's mood and create perfectly curated playlists that match your vibe.</p>
                </div>
                <div className="flex justify-center">
                        <button className="font-bold bg-primary text-black px-6 py-3 rounded-lg shadow-lg w-1/2" onClick={openSpotifyLogin}>Login with Spotify</button>
                </div>
            </div>
        </div>
    )
}
