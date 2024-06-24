"use client"
import Link from "next/link";
import { PropsWithChildren } from "react";
import "./tabs.scss";


export interface TabsProps extends PropsWithChildren {
    tabsConfig: TabsConfig[];
}

export interface TabsConfig {
    label: string;
    url: string;
}

export default function Tabs({tabsConfig}: TabsProps) {

    return (
        <div className="tabs">
            {
                tabsConfig.map(tab => {
                    return <Link className="tab-link" href={tab.url} key={tab.label}>{tab.label}</Link>
                })
            }
        </div>
    );
}
