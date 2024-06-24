"use client"

import { useEffect, useState } from "react";
import "./random-meme.scss";
import MemeApiService from "@/shared/services/MemeApi.service";


export interface MemesData {
    success: boolean;
    data: {
        memes: Meme[];
    }
}

export interface Meme {
    id: string;
    name: string;
    url: string;
    width: number;
    height: number;
    box_count: number;
}


export default function RandomMeme() {

    const [meme, setMeme] = useState<Meme>();
    const [memeGenerated, setMemeGenerated] = useState<string>();

    useEffect(() => {
        const response = MemeApiService.get("https://api.imgflip.com/get_memes");
        response.then((memes: MemesData) => {
            const randomIndex = Math.floor(Math.random() * memes.data.memes.length);
            setMeme(memes.data.memes[randomIndex])
        } )
    }, []);

    const handleSubmit = (e: any) => {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);

        let body: any = {
            template_id: meme?.id,
            username: 'MarioTL13',
            password: 'vigilantPotato',
        }

        Array.from(formData.values()).forEach((caption, index) => {
            body = {
                ...body,
                [`boxes[${index}][text]`]: caption
            }
        });

        MemeApiService.post("https://api.imgflip.com/caption_image", body).then((data) => {
            setMemeGenerated(data.data.url);
            console.log(data);
        });
    }

    return (
        <div className="meme-container">
            <img src={meme?.url} alt="random-meme" />

            {memeGenerated && <img src={memeGenerated} alt="memeGenerated" />}

            <div className="inputs-container">
                <form method="post" onSubmit={handleSubmit}>
                    {
                        Array.from({ length: meme?.box_count ?? 0 }, (_, i) =>
                            <div key={i}>
                                <label>
                                    Caption {i + 1}:
                                    <input name={"caption" + i} />
                                </label>
                            </div>
                        )
                    }
                    <button type="submit">Submit form</button>
                </form>
            </div>
        </div>
    )
}