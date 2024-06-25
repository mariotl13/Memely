"use client"

import Tabs, { TabsConfig } from "@/shared/components/tabs/tabs";
import "./landing.scss"
import signUp from "@/firebase/auth/signUp";
import { useRouter } from "next/navigation";

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
                    <button onClick={clientSignUp}>Crear usuario de prueba</button>
                    <Tabs tabsConfig={tabsConfig}></Tabs>
                </header>
                <main>
                    {children}
                </main>
            </body>
        </html>
    )

    async function clientSignUp() {
        const email = "prueba@gmail.com";
        const password = "prueba123";
        const { result, error } = await signUp(email, password);

        if (error) {
            return console.log(error)
        }

        console.log(result)
        return router.push("/random-meme")
    }
}