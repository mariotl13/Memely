"use client"

import Tabs, { TabsConfig } from "@/shared/components/tabs/tabs";
import { useEffect, useState } from "react";
import MemeApiService from '../../shared/services/MemeApi.service';

export default function Landing({
    inter,
    children,
}: Readonly<{
    inter: any;
    children: React.ReactNode;
}>) {

    const [memes, setMemes] = useState([]);

    useEffect(() => {
        const response = MemeApiService.get("https://api.imgflip.com/get_memes");
        response.then((memes) => setMemes(memes))
    }, []);

    const tabsConfig: TabsConfig[] = [
        {
            label: 'Tab 1',
            url: '/random-meme'
        },
        {
            label: 'Tab 2',
            url: '/contact'
        },
        {
            label: 'Tab 3',
            url: '/contact'
        }
    ]

    return (
        <html lang="en">
            <body className={inter.className}>
                <header>
                    <p>HEADER</p>
                    <Tabs tabsConfig={tabsConfig}></Tabs>
                </header>
                <main>
                    {children}
                </main>
                <footer>FOOTER</footer>
            </body>
        </html>
    )
}