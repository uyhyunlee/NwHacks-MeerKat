import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth";
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import "./styles.css"
import { emailAddress, profilePicture } from "./firebase.js";

export function Navbar() {

    const navigate = useNavigate();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsUserLoggedIn(!!user); // Set true if user is logged in, false otherwise
        });

        return () => {
            unsubscribe(); // Cleanup function to unsubscribe from onAuthStateChanged
        };
    }, []);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                navigate("/login");
                console.log("Signed out successfully");
            })
            .catch((error) => {
                // An error happened.
                console.log(error);
            });
    };

    return (
        <div className="Navbar">
            <h1 className="header" id="title">MeerKat</h1>
            <img id="smalllogo" src={require('./Group_21.jpg')} />
            {isUserLoggedIn && (
                <div>
                    <img className="personal" id="profilepic" src={profilePicture} />
                    <p className="personal" id="email" >{emailAddress}</p>
                    <button id="signout" onClick={handleLogout}>Sign Out</button>

                </div>
            )}
        </div>
    );
}