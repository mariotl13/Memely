"use client"
import Link from "next/link";
import { PropsWithChildren } from "react";


export interface TabsProps extends PropsWithChildren {
    tabsConfig: TabsConfig[];
}

export interface TabsConfig {
    label: string;
    url: string;
}

export default function Tabs({tabsConfig, children}: TabsProps) {

    return (
        <div className="tabs">
            <p>{children}</p>
            {
                tabsConfig.map(tab => {
                    return <Link href={tab.url} key={tab.label}>{tab.label}</Link>
                })
            }
        </div>
    );
}
