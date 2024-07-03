"use client"

import MemeApiService from "@/shared/services/MemeApi.service";
import { useEffect, useState } from "react";
import { AdminInfo, StatusType } from "../admin/page";
import MemeGenerator from "./meme-generator/meme-generator";
import Vote from "./vote/vote";
import Winner from "./winner/winner";
import Spinner from "@/shared/components/spinner/spinner";
import { Winners } from "@/shared/utils/points";

export default function Home() {

    const [info, setInfo] = useState<AdminInfo>();
    const [winners, setWinners] = useState<Winners>();
    const [isLoading, setisLoading] = useState<boolean>(true);


    useEffect(() => {
        const response = MemeApiService.get(`${process.env.NEXT_PUBLIC_API_URL}/admin`);
        response.then((data: AdminInfo) => {
            setInfo(data);

            if (data.status === 'closed') {
                MemeApiService.get(`${process.env.NEXT_PUBLIC_API_URL}/ranking/today`).then((winners: Winners) => {
                    setWinners(winners);
                    setisLoading(false);
                });
            }
            else setisLoading(false);
        })
    }, []);

    const renderSwitch = (param: StatusType) => {
        switch(param) {
            case 'closed':
                if (winners) {
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
            {isLoading ? <Spinner></Spinner> : renderSwitch(info?.status as StatusType)}
        </>
    )
}