"use client";

import Spinner from "@/shared/components/spinner/spinner";
import MemeApiService from "@/shared/services/MemeApi.service";
import { ChangeEvent, useEffect, useState } from "react";
import "./admin.scss";
import { Meme, MemesData } from "../home/meme-generator/meme-generator";

export interface AdminInfo {
	status: StatusType;
	meme: Meme;
}

export type StatusType = "closed" | "meming" | "voting";

export default function Admin() {
	const [currentState, setCurrentState] = useState<StatusType>();
	const [adminInfo, setAdminInfo] = useState<AdminInfo>();
	const [isLoading, setisLoading] = useState<boolean>(true);

	useEffect(() => {
		const response = MemeApiService.get(
			`${process.env.NEXT_PUBLIC_API_URL}/admin`
		);
		response.then((data: AdminInfo) => {
			setAdminInfo(data);
			setCurrentState(data.status);
			setisLoading(false);
		});
	}, []);

	const handleOnStatusChange = (event: ChangeEvent) => {
		const target = event.target as HTMLTextAreaElement;
		setAdminInfo({
			status: target.value as StatusType,
			meme: adminInfo?.meme as Meme,
		});
	};

	const handleOnGenerateTemplate = () => {
		setisLoading(true);
		const response = MemeApiService.get(
			"https://api.imgflip.com/get_memes"
		);
		response.then((memes: MemesData) => {
			const randomIndex = Math.floor(
				Math.random() * memes.data.memes.length
			);
			const template = memes.data.memes[randomIndex];

			// Fake texts in templates
			let body: any = {
				template_id: template.id,
				username: "MarioTL13",
				password: "vigilantPotato",
			};

			for (let index = 0; index < template.box_count; index++) {
				body = {
					...body,
					[`boxes[${index}][text]`]: `Caption ${index + 1}`,
				};
			}

			MemeApiService.post(
				"https://api.imgflip.com/caption_image",
				body
			).then((data) => {
				template.url = data.data.url;
				setAdminInfo({
					status: adminInfo?.status as StatusType,
					meme: template,
				});
				setisLoading(false);
			});
		});
	};

	const handleOnSaveChanges = (e: any) => {
		// Prevent the browser from reloading the page
		e.preventDefault();

		setisLoading(true);

		MemeApiService.post(
			`${process.env.NEXT_PUBLIC_API_URL}/admin`,
			adminInfo,
			true
		).then(() => {
			if (currentState === "voting" && adminInfo?.status === "closed") {
				MemeApiService.post(
					`${process.env.NEXT_PUBLIC_API_URL}/ranking/today`
				).then(() => {
					setisLoading(false);
				});
			} else {
				setisLoading(false);
			}

			setCurrentState(adminInfo?.status);
		});
	};

	return (
		<>
			{isLoading ? (
				<Spinner></Spinner>
			) : (
				<>
					<form method="post" onSubmit={handleOnSaveChanges}>
						<label>
							Estado actual:
							<select
								name="status"
								id="status"
								value={adminInfo?.status}
								onChange={(event) =>
									handleOnStatusChange(event)
								}
								style={{ marginLeft: 8 }}
							>
								<option value="closed">Closed</option>
								<option value="meming">Meming</option>
								<option value="voting">Voting</option>
							</select>
						</label>
						<div className="template-container">
							<span>
								Plantilla actual:{" "}
								{adminInfo?.meme?.name ||
									"No hay plantilla para hoy"}
							</span>
							<button onClick={handleOnGenerateTemplate}>
								Generar nueva plantilla
							</button>
							{adminInfo?.meme?.url && (
								<img
									src={adminInfo?.meme?.url}
									alt="Plantilla actual"
								/>
							)}
						</div>
						<button type="submit" className="submit-button">
							Guardar cambios
						</button>
					</form>
				</>
			)}
		</>
	);
}
