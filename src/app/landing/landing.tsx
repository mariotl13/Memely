"use client"

import Tabs, { TabsConfig } from "@/shared/components/tabs/tabs";
import "./landing.scss"

// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDikq7mfP-krJ5IAsQlY1prbc5B5CutChE",
    authDomain: "vigilant-potato-bc522.firebaseapp.com",
    projectId: "vigilant-potato-bc522",
    storageBucket: "vigilant-potato-bc522.appspot.com",
    messagingSenderId: "1666480283",
    appId: "1:1666480283:web:75da1769f7d9a947ed2e3e",
    measurementId: "G-X9XDLHRFMH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default function Landing({
    inter,
    children,
}: Readonly<{
    inter: any;
    children: React.ReactNode;
}>) {

    const tabsConfig: TabsConfig[] = [
        {
            label: 'Generar meme',
            url: '/random-meme'
        },
        {
            label: 'Votación',
            url: '/vote'
        },
        {
            label: 'Ranking',
            url: '/ranking'
        }
    ]

    return (
        <html lang="en">
            <head>
                {/* <link rel="icon" href="../favicon.ico" sizes="any" /> */}
            </head>
            <body className={inter.className}>
                <header>
                    <button onClick={createUser}>Crear usuario de prueba</button>
                    <Tabs tabsConfig={tabsConfig}></Tabs>
                </header>
                <main>
                    {children}
                </main>
            </body>
        </html>
    )

    function createUser() {
        const auth = getAuth();
        const email = "prueba@gmail.com";
        const password = "prueba123";
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("code", errorCode);
                console.log("message", errorCode);
                // ..
            });
    }
}