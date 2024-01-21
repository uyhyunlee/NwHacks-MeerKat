import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { signInWithGoogle } from "./firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.js";
import "./styles.css"


export function Login() {

    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/events");
            } else {
                navigate("/login")
            }
        });

    }, []);

    return (
        <div className="Login">
            <img id="biglogo" src={require('./Group_21.jpg')} />
            <button id="googlebtn" onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    )
}