"use client";

import MemeApiService from "@/shared/services/MemeApi.service";
import { useEffect, useState } from "react";
import './user-info.scss';
import Spinner from "@/shared/components/spinner/spinner";


export interface UserData {
    mail: string;
    memes: {
        id: string,
        points: number,
        template: string,
        url: string,
        date: Date
    }[];
    name: string;
    points: number;
}

export default function UserInfo({ params }:any) {

    const [user, setUser] = useState<UserData>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const response = MemeApiService.get(`http://localhost:3000/api/user-info/${params.userId}`);
        response.then((data: UserData) => {
            console.log('infoooo', data);
            data.memes = Object.keys(data.memes).map((key: string) => ({
                ...data.memes[key as any],
                id: key,
                date: new Date(key)
            }));
            setUser(data);
            setIsLoading(false);
        })
    }, []);

    return (
        <>
            {isLoading ? <Spinner></Spinner> :
            <div className="user-info">
                <h2 className="user-header">{user?.name} - {user?.points} puntos</h2>
                <h3>Memes anteriores</h3>
                <div className="memes-container">
                    {user?.memes.map(meme => {
                        return <div key={meme.id} className="meme">
                            <h3>{Intl.DateTimeFormat('es-ES').format(meme?.date)}</h3>
                            <img src={meme?.url} alt={'Meme del día'+ meme?.id} />
                        </div>
                    })}
                </div>
            </div>}
        </>
    )
}