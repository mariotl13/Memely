"use client"

import MemeApiService from "@/shared/services/MemeApi.service";
import { useEffect, useState } from "react";
import { AdminInfo, StatusType } from "../admin/page";
import MemeGenerator from "./meme-generator/meme-generator";
import Vote from "./vote/vote";

export default function Home() {

    const [info, setInfo] = useState<AdminInfo>();

    useEffect(() => {
        const response = MemeApiService.get('http://localhost:3000/api/admin');
        response.then((data: AdminInfo) => {
            setInfo(data);
        })
    }, []);

    const renderSwitch = (param: StatusType) => {
        switch(param) {
            case 'closed':
                return 'Vuelve el viernes para crear tu meme ༼ つ ◕_◕ ༽つ';
            case 'meming':
                return <MemeGenerator></MemeGenerator>;
            case 'voting':
                return <Vote></Vote>;
            }
    }

    return (
        <>
            {renderSwitch(info?.status as StatusType)}
        </>
    )
}