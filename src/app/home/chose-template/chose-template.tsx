"use client";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/landing/landing";
import MemeApiService from "@/shared/services/MemeApi.service";
import GenerateTemplate from "@/shared/components/generate-template/GenerateTemplate";
import Spinner from "@/shared/components/spinner/spinner";

export default function ChoseTemplate() {
	const user = useContext(UserContext);

	const [isLastWinner, setIsLastWinner] = useState(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		if (user) {
			const USER_ID = user.uid;
			MemeApiService.get(
				`${process.env.NEXT_PUBLIC_API_URL}/chose-template/${USER_ID}`
			).then((isLastWinner: boolean) => {
				setIsLastWinner(isLastWinner);
				setIsLoading(false);
			});
		}
	}, [user]);

	return (
		<>
			{isLoading ? (
				<div>
					<Spinner></Spinner>
				</div>
			) : (
				<>
					{!isLastWinner ? (
						<h3>
							Vuelve el viernes para crear tu meme ༼ つ ◕_◕ ༽つ
						</h3>
					) : (
						<GenerateTemplate type="winner"></GenerateTemplate>
					)}
				</>
			)}
		</>
	);
}
