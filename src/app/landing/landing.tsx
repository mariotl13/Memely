"use client"

import Tabs, { TabsConfig } from "@/shared/components/tabs/tabs";

export default function Landing({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

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
        <>
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
        </>
    )
}