"use client";

import MemeApiService from "@/shared/services/MemeApi.service";
import { useContext, useEffect, useState } from "react";
import './vote.scss';
import Spinner from "@/shared/components/spinner/spinner";
import { UserContext } from "@/app/landing/landing";


export default function Vote() {
    const user = useContext(UserContext);

    const [memes, setMemes] = useState<{
        userId: string;
        url: string;
    }[]>();
    const [currentIndexMeme, setCurrentIndexMeme] = useState<number>(0);
    const [currentVote, setCurrentVote] = useState<number>();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log('holaaaaaa', user);
        if (user) {
            const USER_ID = user.uid;
            const response = MemeApiService.get(`${process.env.NEXT_PUBLIC_API_URL}/vote/${USER_ID}`);
            response.then((memesArray) => {
                setMemes(memesArray);
                setIsLoading(false);
            })
        }
    }, [user]);

    const handleOnClickGrade = (vote: number) => {
        setCurrentVote(vote);
    }

    const handleOnClickConfirmVote = (votedUserId: string) => {
        setIsLoading(true);

        const vote = {
            votedUserId,
            vote: currentVote
        }

        const USER_ID = user?.uid;
        MemeApiService.post(`${process.env.NEXT_PUBLIC_API_URL}/vote/${USER_ID}`, vote, true).then(() => {
            setCurrentVote(undefined);
            setCurrentIndexMeme(currentIndexMeme + 1);
            setIsLoading(false);
        });
    }

    return (
        <div className="votes-container">
            {
                isLoading ? <Spinner></Spinner> :
                <>
                    <h1>
                        {currentIndexMeme === memes?.length ? 'Ya has votado a todos tus compañeros ' : 'Vota los memes de tus compañeros '}
                        {memes?.length ? <>({currentIndexMeme}/{memes?.length})</> : ''}
                    </h1>

                    {currentIndexMeme !== memes?.length &&
                        <>
                            <img src={memes?.[currentIndexMeme]?.url} alt="Current meme to vote" />
                            <div className="vote-buttons">
                                {Array.from({ length: 11 }, (_, i) =>
                                    <button key={i} onClick={() => handleOnClickGrade(i)} className={currentVote === i ? 'selected-vote' : undefined}>
                                        {i}
                                    </button>
                                )}
                            </div>
                            <button onClick={() => handleOnClickConfirmVote(memes?.[currentIndexMeme]?.userId as string)} className="submit-button" disabled={currentVote === undefined}>Votar</button>
                        </>
                    }
                </>
            }
        </div>
    )
}