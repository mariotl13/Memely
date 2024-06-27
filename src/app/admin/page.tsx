"use client";

import Spinner from "@/shared/components/spinner/spinner";
import MemeApiService from "@/shared/services/MemeApi.service";
import { ChangeEvent, useEffect, useState } from "react";
import './admin.scss';
import { Meme, MemesData } from "../home/meme-generator/meme-generator";


export interface AdminInfo {
    status: StatusType;
    meme: Meme;
}

export type StatusType = 'closed' | 'meming' | 'voting';

export default function Admin() {

    const [adminInfo, setAdminInfo] = useState<AdminInfo>();
    const [isLoading, setisLoading] = useState<boolean>(true);

    useEffect(() => {
        const response = MemeApiService.get("http://localhost:3000/api/admin");
        response.then((data: AdminInfo) => {
            setAdminInfo(data);
            setisLoading(false);
        })
    }, []);

    const handleOnStatusChange = (event: ChangeEvent ) => {
        const target = event.target as HTMLTextAreaElement;
        setAdminInfo({
            status: target.value as StatusType,
            meme: adminInfo?.meme as Meme
        });
    }

    const handleOnGenerateTemplate = () => {
        const response = MemeApiService.get("https://api.imgflip.com/get_memes");
        response.then((memes: MemesData) => {
            const randomIndex = Math.floor(Math.random() * memes.data.memes.length);
            setAdminInfo({
                status: adminInfo?.status as StatusType,
                meme: memes.data.memes[randomIndex]
            });
        } )
    }

    const handleOnSaveChanges = (e: any) => {
        // Prevent the browser from reloading the page
        e.preventDefault();

        setisLoading(true);
        MemeApiService.post(`http://localhost:3000/api/admin`, adminInfo, true).then(() => {
            setisLoading(false);
        });
    }

    return (
        <>
            {isLoading ? <Spinner></Spinner> :
            <>
                <form method="post" onSubmit={handleOnSaveChanges}>
                    <label>Estado actual:
                        <select name="status" id="status" value={adminInfo?.status} onChange={(event) => handleOnStatusChange(event)} style={{marginLeft: 8}}>
                            <option value="closed">Closed</option>
                            <option value="meming">Meming</option>
                            <option value="voting">Voting</option>
                        </select>
                    </label>
                    <div className="template-container">
                        <span>Plantilla actual: {adminInfo?.meme?.name || 'No hay plantilla para hoy'}</span>
                        <button onClick={handleOnGenerateTemplate}>Generar nueva plantilla</button>
                        {adminInfo?.meme?.url && <img src={adminInfo?.meme?.url} alt="Plantilla actual" />}
                    </div>
                    <button type="submit" className="submit-button">Guardar cambios</button>
                </form>
            </>
            }
        </>
    )
}