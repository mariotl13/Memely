"use client";

import MemeApiService from "@/shared/services/MemeApi.service";
import { useEffect, useState } from "react";
import "./user-info.scss";
import Spinner from "@/shared/components/spinner/spinner";
import { formatDateString } from "@/shared/utils/date";

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
					<h3>Memes anteriores</h3>
					{user?.memes && (
						<div className="memes-container">
							{user?.memes.reverse().map((meme) => {
								console.log("a ver", meme.date.getDate());
								console.log(
									"a ver2",
									new Date("2024-1-6").getDate()
								);
								console.log(
									"a ver3",
									new Date("2024-01-06").getDate()
								);

								return (
									<div key={meme.id} className="meme">
										<h3>
											{Intl.DateTimeFormat(
												"es-ES"
											).format(meme?.date)}
										</h3>
										<img
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
