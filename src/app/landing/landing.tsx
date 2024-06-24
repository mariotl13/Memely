"use client"

import Tabs, { TabsConfig } from "@/shared/components/tabs/tabs";

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
        },
        // {
        //     label: 'Historial',
        //     url: '/historial'
        // }
    ]

    return (
        <html lang="en">
            <body className={inter.className}>
                <header>
                    <Tabs tabsConfig={tabsConfig}></Tabs>
                </header>
                <main style={{ padding: '64px 0px' }}>
                    {children}
                </main>
                {/* <footer>FOOTER</footer> */}
            </body>
        </html>
    )
}