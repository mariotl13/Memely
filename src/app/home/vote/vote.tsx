"use client";

import MemeApiService from "@/shared/services/MemeApi.service";
import { useContext, useEffect, useState } from "react";
import "./vote.scss";
import Spinner from "@/shared/components/spinner/spinner";
import { UserContext } from "@/app/landing/landing";
import Countdown from "@/shared/components/countdown/Countdown";
import MemeImg from "@/shared/components/meme-img/meme-img";

export default function Vote() {
	const user = useContext(UserContext);

	const [memes, setMemes] = useState<
		| {
				userId: string;
				url: string;
		  }[]
		| null
	>();

	const [tops, setTops] = useState<{
		[key: string]: any;
	}>({
		top1: undefined,
		top2: undefined,
		top3: undefined,
	});

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (user) {
			const USER_ID = user.uid;
			const response = MemeApiService.get(
				`${process.env.NEXT_PUBLIC_API_URL}/vote/${USER_ID}`
			);
			response.then((memesArray) => {
				setMemes(memesArray);
				setIsLoading(false);
			});
		}
	}, [user]);

	const handleSetTop = (
		topToChange: "top1" | "top2" | "top3",
		user: string
	) => {
		const newTops = { ...tops };
		Object.keys(tops)
			.filter((key) => key !== topToChange && tops[key] === user)
			.forEach((key) => {
				newTops[key] = undefined;
			});
		newTops[topToChange] = user;
		setTops(newTops);
	};

	const handleOnClickConfirmVotes = () => {
		setIsLoading(true);

		const votes = Object.entries(tops).map(([key, value]) => ({
			votedUserId: value,
			vote: key === "top1" ? 3 : key === "top2" ? 2 : 1,
		}));

		const USER_ID = user?.uid;
		MemeApiService.post(
			`${process.env.NEXT_PUBLIC_API_URL}/vote/${USER_ID}`,
			votes,
			true
		).then(() => {
			setMemes(null);
			setIsLoading(false);
		});
	};

	return (
		<div className="votes-container">
			{isLoading ? (
				<Spinner></Spinner>
			) : (
				<>
					<Countdown limit={{ hour: 14, minutes: 0 }} />

					<h1>
						{memes
							? "Vota el resto de memes"
							: "Ya has votado los memes de hoy"}
					</h1>

					{memes && (
						<div className="memes-container">
							{memes.map((meme) => {
								return (
									<div
										key={meme.userId}
										className="meme-detail"
									>
										<MemeImg
											src={meme?.url}
											alt="Current meme to vote"
										/>

										<div className="button-wrap">
											<input
												type="radio"
												name="top1"
												id={`${meme.userId}top1`}
												value={meme.userId}
												checked={
													tops.top1 === meme.userId
												}
												onChange={(event) =>
													handleSetTop(
														"top1",
														event.target.value
													)
												}
											/>
											<label
												htmlFor={`${meme.userId}top1`}
												className={
													tops.top1 &&
													tops.top1 !== meme.userId
														? "already-selected-top"
														: ""
												}
											>
												<img
													src="icons/medal-gold.svg"
													alt="Gold medal"
												/>
											</label>
											<input
												type="radio"
												name="top2"
												id={`${meme.userId}top2`}
												value={meme.userId}
												checked={
													tops.top2 === meme.userId
												}
												onChange={(event) =>
													handleSetTop(
														"top2",
														event.target.value
													)
												}
											/>
											<label
												htmlFor={`${meme.userId}top2`}
												className={
													tops.top2 &&
													tops.top2 !== meme.userId
														? "already-selected-top"
														: ""
												}
											>
												<img
													src="icons/medal-silver.svg"
													alt="Silver medal"
												/>
											</label>
											<input
												type="radio"
												name="top3"
												id={`${meme.userId}top3`}
												value={meme.userId}
												checked={
													tops.top3 === meme.userId
												}
												onChange={(event) =>
													handleSetTop(
														"top3",
														event.target.value
													)
												}
											/>
											<label
												htmlFor={`${meme.userId}top3`}
												className={
													tops.top3 &&
													tops.top3 !== meme.userId
														? "already-selected-top"
														: ""
												}
											>
												<img
													src="icons/medal-bronze.svg"
													alt="Bronze medal"
												/>
											</label>
										</div>
									</div>
								);
							})}
						</div>
					)}

					{memes && (
						<button
							onClick={handleOnClickConfirmVotes}
							className="submit-button"
							disabled={
								!Object.values(tops).every(
									(value) => value !== undefined
								)
							}
						>
							Confirmar votos
						</button>
					)}
				</>
			)}
		</div>
	);
}
