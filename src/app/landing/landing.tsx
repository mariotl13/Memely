"use client"

import Tabs, { TabsConfig } from "@/shared/components/tabs/tabs";
import { useEffect } from "react";
import apiService from '../../shared/services/api.service';

export default function Landing({
    inter,
    children,
}: Readonly<{
    inter: any;
    children: React.ReactNode;
}>) {

    useEffect(() => {
        apiService.get('https://api.imgflip.com/get_memes')
        .then((responseData: any)=> {
            console.log('dataaaa', responseData);
        })
        .catch((error: any) => {
            console.log('errorrr', error);
        });
    }, []);

    const tabsConfig: TabsConfig[] = [
        {
            label: 'Tab 1',
            url: '/contact'
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

    const value = 'pulsadoooo';

    const handleOnClick = () => {
        console.log(value);
    }

    return (
        <html lang="en">
            <body className={inter.className}>
                <header>
                    <p>HEADER</p>
                    <Tabs tabsConfig={tabsConfig}>
                        <button onClick={handleOnClick}>Soy un botón</button>
                    </Tabs>
                </header>
                <main>
                    {children}
                </main>
                <footer>FOOTER</footer>
            </body>
        </html>
    )
}