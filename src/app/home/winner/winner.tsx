"use client";

import { useEffect, useState } from 'react';
import './winner.scss';
import Confetti from 'react-confetti';
import MemeApiService from '@/shared/services/MemeApi.service';
import { Winners } from '@/app/api/ranking/today/route';
import Spinner from '@/shared/components/spinner/spinner';


export default function Winner() {

    const [winners, setWinners] = useState<{
        points: number;
        name: string;
        memeUrl: string;
    }[]>([]);
    const [isLoading, setisLoading] = useState<boolean>(true);

    useEffect(() => {
        const response = MemeApiService.get('http://localhost:3000/api/ranking/today');
        response.then((winners: Winners) => {
            const values = Object.values(winners);
            // Ordenar el array en función de los valores de points, de mayor a menor
            values.sort((a, b) => b.points - a.points);

            setWinners(values);
            setisLoading(false);
        })
    }, []);

    return (
        <>
            {isLoading ? <Spinner></Spinner> :
            <>
                <Confetti recycle={false}/>
                <div className='winners-container'>
                    {winners?.map(winner => {
                        return <div key={winner.name} className='winner'>
                            <h3>{winner.name} - {winner.points} puntos</h3>
                            <img src={winner.memeUrl} alt="Meme ganador" className={'points-'+winner.points}/>
                        </div>
                    })}
                </div>
            </>
            }
        </>
    )
}