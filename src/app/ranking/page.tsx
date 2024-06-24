"use client"

import { useEffect, useState } from "react";
import "./ranking.scss"
import MemeApiService from "@/shared/services/MemeApi.service";
import Spinner from "@/shared/components/spinner/spinner";


export interface Ranking {
    user: string;
    points: number;
}


export default function Vote() {

    const [ranking, setRanking] = useState<Ranking[]>([]);

    useEffect(() => {
        const response = MemeApiService.get("http://localhost:3000/api/ranking");
        response.then((data: any) => {
            console.log('andaaaaa', data);
            setRanking(data);
        } )
    }, []);


    return (
        <>
            {ranking.length === 0 ? <Spinner></Spinner> :
                <table>
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Puntuación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {...ranking.sort((a, b) => b.points - a.points).map(rank =>
                            <tr key={rank.user}>
                                <td>{rank.user}</td>
                                <td>{rank.points}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            }
        </>
    )
}