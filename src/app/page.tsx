"use client"
import Tabs from "@/shared/components/tabs/tabs";
import { useEffect, useState } from "react";

export default function Home() {

    useEffect(() => {
        console.log("hola?");
    }, []);

    return (
        <>
            <Tabs></Tabs>
        </>
    );
}
