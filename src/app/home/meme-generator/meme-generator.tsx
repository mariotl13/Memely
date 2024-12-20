"use client";

import { useContext, useEffect, useState } from "react";
import "./meme-generator.scss";
import MemeApiService from "@/shared/services/MemeApi.service";
import Spinner from "@/shared/components/spinner/spinner";
import { UserContext } from "@/app/landing/landing";
import Countdown from "@/shared/components/countdown/Countdown";
import MemeImg from "@/shared/components/meme-img/meme-img";

export interface MemesData {
	success: boolean;
	data: {
		memes: Meme[];
	};
}

export interface Meme {
	id: string;
	name: string;
	url: string;
	width: number;
	height: number;
	box_count: number;
}

export default function MemeGenerator() {
	const [meme, setMeme] = useState<Meme>();
	const [memeGenerated, setMemeGenerated] = useState<string>();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const user = useContext(UserContext);

	useEffect(() => {
		if (user) {
			const USER_ID = user.uid;
			MemeApiService.get(
				`${process.env.NEXT_PUBLIC_API_URL}/meme-generator/${USER_ID}`
			).then((data: any) => {
				if (data.memeGenerated) setMemeGenerated(data.memeGenerated);
				setMeme(data.memeTemplate);
				setIsLoading(false);
			});
		}
	}, [user]);

	const handleSubmit = (e: any) => {
		setIsLoading(true);

		// Prevent the browser from reloading the page
		e.preventDefault();

		// Read the form data
		const form = e.target;
		const formData = new FormData(form);

		let body: any = {
			template_id: meme?.id,
			username: "MarioTL13",
			password: "vigilantPotato",
		};

		let values = Array.from(formData.values());
		// const color = values.pop();

		values.forEach((caption, index) => {
			body = {
				...body,
				[`boxes[${index}][text]`]:
					caption.toString().length > 0 ? caption : " ",
			};
		});

		MemeApiService.post("https://api.imgflip.com/caption_image", body).then(
			(data) => {
				const newMeme = {
					points: 0,
					template: meme?.id,
					url: data.data.url,
				};

				const USER_ID = user?.uid;

				MemeApiService.post(
					`${process.env.NEXT_PUBLIC_API_URL}/meme-generator/${USER_ID}`,
					newMeme,
					true
				).then(() => {
					setMemeGenerated(data.data.url);
					setIsLoading(false);
				});
			}
		);
	};

	return (
		<div>
			<Countdown limit={{ hour: 12, minutes: 30 }} />

			<div className="meme-container">
				{isLoading ? (
					<div className="image-placeholder">
						<Spinner></Spinner>
					</div>
				) : (
					<MemeImg
						src={memeGenerated ?? (meme?.url as string)}
						alt="Random meme"
					/>
				)}

				<form method="post" onSubmit={handleSubmit}>
					{Array.from({ length: meme?.box_count ?? 0 }, (_, i) => (
						<label key={i}>
							Caption {i + 1}
							<input
								name={"caption" + i}
								type="text"
								autoComplete="off"
							/>
						</label>
					))}
					<button
						type="submit"
						disabled={isLoading}
						className="submit-button"
					>
						Generar meme
					</button>
				</form>
			</div>
		</div>
	);
}
