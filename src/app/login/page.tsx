"use client"

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../landing/landing";
import { useRouter } from "next/navigation";

import './login.scss'
import signIn from "@/firebase/auth/signIn";
import signUp from "@/firebase/auth/signUp";
import MemeApiService from "@/shared/services/MemeApi.service";

export default function Login() {

    const [isSignInError, setIsSignInError] = useState(false);
    const [isSignUpError, setIsSignUpError] = useState(false);

    const user = useContext(UserContext);

    const router = useRouter();

    useEffect(() => {
        if (user) router.push("/home")
    }, [user])

    async function handleSignIn(e: any) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        const values = Object.fromEntries(formData) as {email: string, password: string};

        const { result, error } = await signIn(values.email, values.password);

        if (error) {
            setIsSignInError(true);
            return console.error(error)
        }
        return router.push("/home")
    }

    async function handleSignUp(e: any) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        const values = Object.fromEntries(formData) as {email: string, password: string, name: string};

        const { result, error } = await signUp(values.email, values.password);

        if (error) {
            setIsSignUpError(true);
            return console.error(error)
        }

        MemeApiService.post(`${process.env.NEXT_PUBLIC_API_URL}/create-user`, {
            id: result?.user.uid,
            mail: values.email,
            name: values.name
        }, true).then(() => {
            return router.push("/home")
        });
    }

    return (
        <div className="login-container">
            <div className="login">
                <h3>Iniciar sesión</h3>
                {isSignInError && <span className="login-error">Usuario o contraseña incorrectos</span>}
                <form method="post" onSubmit={handleSignIn}>
                    <label>
                        Correo electrónico
                        <input required type="email" name="email"/>
                    </label>
                    <label>
                        Contraseña
                        <input required type="password" name="password"/>
                    </label>
                    <button type="submit" className="submit-button">Iniciar sesión</button>
                </form>
            </div>
            <div className="login">
                <h3>Crear cuenta</h3>
                {isSignUpError && <span className="login-error">Mail o contraseña incorrectos</span>}
                <form method="post" onSubmit={handleSignUp}>
                    <label>
                        Correo electrónico
                        <input required type="email" name="email" />
                    </label>
                    <label>
                        Nombre
                        <input required type="text" name="name" />
                    </label>
                    <label>
                        Contraseña
                        <input required minLength={6} type="password" name="password"/>
                    </label>
                    <button type="submit" className="submit-button">Crear cuenta</button>
                </form>
            </div>
        </div>
    )
}