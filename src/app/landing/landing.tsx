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