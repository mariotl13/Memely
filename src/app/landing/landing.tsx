"use client"

import Tabs, { TabsConfig } from "@/shared/components/tabs/tabs";
import "./landing.scss"
import signUp from "@/firebase/auth/signUp";
import { useRouter } from "next/navigation";
import signIn from "@/firebase/auth/signIn";

export default function Landing({
    inter,
    children,
}: Readonly<{
    inter: any;
    children: React.ReactNode;
}>) {

    const router = useRouter();

    const tabsConfig: TabsConfig[] = [
        {
            label: 'Home',
            url: '/home'
        },
        {
            label: 'Ranking',
            url: '/ranking'
        },
        // TODO: user has role === 'admin'
        ...(true ? [{
            label: 'Admin',
            url: '/admin'
        }] : [])
    ]

    return (
        <html lang="en">
            <body className={inter.className}>
                <header>
                    <button onClick={clientSignUp}>Crear usuario de prueba</button>
                    <button onClick={clientSignIn}>Iniciar sesión</button>
                    <Tabs tabsConfig={tabsConfig}></Tabs>
                </header>
                <main>
                    {children}
                </main>
            </body>
        </html>
    )

    async function clientSignIn() {
        const email = "sartero@deloitte.es";
        const password = "123456";
        const { result, error } = await signIn(email, password);

        if (error) {
            return console.error(error)
        }

        console.log(result)
        return router.push("/home")
    }

    async function clientSignUp() {
        const email = "prueba@gmail.com";
        const password = "prueba123";
        const { result, error } = await signUp(email, password);

        if (error) {
            return console.error(error)
        }

        console.log(result)
        return router.push("/meme-generator")
    }
}