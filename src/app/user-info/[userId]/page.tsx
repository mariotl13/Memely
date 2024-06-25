"use client";

import MemeApiService from "@/shared/services/MemeApi.service";
import { useEffect } from "react";


export default function UserInfo({ params }:any) {

    useEffect(() => {
        const response = MemeApiService.get("http://localhost:3000/api/user-info");
        response.then((data: any) => {
            console.log('infoooo', data);
        })
    }, []);
    return (
        <>
            Página de usuario {params.userId}
        </>
    )
}