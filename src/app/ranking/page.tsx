"use client"

import { useEffect, useState } from "react";
import "./ranking.scss"
import MemeApiService from "@/shared/services/MemeApi.service";
import Spinner from "@/shared/components/spinner/spinner";
import Link from "next/link";


export interface Ranking {
    id: string;
    name: string;
    mail: string;
    points: number;
}

export default function Vote() {

    const [ranking, setRanking] = useState<Ranking[]>([]);
    const [isLoading, setisLoading] = useState<boolean>(true);

    useEffect(() => {
        const response = MemeApiService.get("http://localhost:3000/api/ranking");
        response.then((data: any) => {
            setRanking(data);
            setisLoading(false);
        })
    }, []);

    return (
        <>
            {isLoading ? <Spinner></Spinner> :
                <table>
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Puntuación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {...ranking?.sort((a, b) => b.points - a.points).map(rank =>
                            <tr key={rank.id}>
                                <td><Link href={"/user-info/"+rank.id}>{rank.name} ({rank.mail})</Link></td>
                                <td>{rank.points}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            }
        </>
    )
}