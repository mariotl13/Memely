"use client"

import MemeApiService from "@/shared/services/MemeApi.service";
import { useEffect, useState } from "react";
import { AdminInfo, StatusType } from "../admin/page";
import MemeGenerator from "./meme-generator/meme-generator";
import Vote from "./vote/vote";
import Winner from "./winner/winner";

export default function Home() {

    const [info, setInfo] = useState<AdminInfo>();
    const [closedVotation, setClosedVotation] = useState<boolean>(false);

    useEffect(() => {
        const response = MemeApiService.get('http://localhost:3000/api/admin');
        response.then((data: AdminInfo) => {
            setInfo(data);

            if (data.status === 'closed') {
                MemeApiService.get(`http://localhost:3000/api/closed-votation`).then((closedVotation: boolean) => {
                    setClosedVotation(closedVotation);
                });
            }
        })
    }, []);

    const renderSwitch = (param: StatusType) => {
        switch(param) {
            case 'closed':
                if (true) {
                    return (<>
                        <Winner></Winner>
                    </>)
                } else {
                    return (<h3>
                        Vuelve el viernes para crear tu meme ༼ つ ◕_◕ ༽つ
                    </h3>)
                }
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