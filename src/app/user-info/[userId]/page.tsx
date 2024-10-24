"use client";

import MemeApiService from "@/shared/services/MemeApi.service";
import { useEffect, useState } from "react";
import "./user-info.scss";
import Spinner from "@/shared/components/spinner/spinner";
import { formatDateString } from "@/shared/utils/date";
import MemeImg from "@/shared/components/meme-img/meme-img";

export interface UserData {
	mail: string;
	memes: {
		id: string;
		points: number;
		template: string;
		url: string;
		date: Date;
	}[];
	name: string;
	points: number;
}

export default function UserInfo({ params }: any) {
	const [user, setUser] = useState<UserData>();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const response = MemeApiService.get(
			`${process.env.NEXT_PUBLIC_API_URL}/user-info/${params.userId}`
		);
		response.then((data: UserData) => {
			if (data.memes) {
				data.memes = Object.keys(data.memes).map((key: string) => ({
					...data.memes[key as any],
					id: key,
					date: new Date(formatDateString(key)),
				}));
				data.memes.sort((a, b) => b.date.getTime() - a.date.getTime());
			}
			setUser(data);
			setIsLoading(false);
		});
	}, [params.userId]);

	return (
		<>
			{isLoading ? (
				<Spinner></Spinner>
			) : (
				<div className="user-info">
					<h2 className="user-header">
						{user?.name} - {user?.points} puntos
					</h2>
					{user?.memes && (
						<div className="memes-container">
							{user?.memes.map((meme) => {
								return (
									<div key={meme.id} className="meme">
										<h3>
											{Intl.DateTimeFormat(
												"es-ES"
											).format(meme?.date)}
										</h3>
										<MemeImg
											src={meme?.url}
											alt={"Meme del día" + meme?.id}
										/>
									</div>
								);
							})}
						</div>
					)}
					{!user?.memes && <p>Todavía no ha creado ningún meme</p>}
				</div>
			)}
		</>
	);
}
