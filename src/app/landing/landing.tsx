"use client"

import Tabs, { TabsConfig } from "@/shared/components/tabs/tabs";
import "./landing.scss"

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
                <link rel="icon" href="../favicon.ico" sizes="any" />
            </head>
            <body className={inter.className}>
                <header>
                    <Tabs tabsConfig={tabsConfig}></Tabs>
                </header>
                <main>
                    {children}
                </main>
            </body>
        </html>
    )
}