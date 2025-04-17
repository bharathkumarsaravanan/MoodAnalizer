import React from "react";
import { FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
export default function Footer() {

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center">
                <p className="text-white">© 2025, Powered by Moodify</p>
                <div className="social-container">
                    <a href="https://www.instagram.com/moodify_ai/" className="social-icon">
                        <FaInstagram />
                    </a>
                    <a href="https://www.instagram.com/moodify_ai/" className="social-icon">
                        <FaTwitter />
                    </a>
                    <a href="https://www.instagram.com/moodify_ai/" className="social-icon">
                        <FaLinkedin />
                    </a>
                    <a href="https://www.instagram.com/moodify_ai/" className="social-icon">
                        <FaYoutube />
                    </a>
                </div>
            </div>
        </div>
    )
}