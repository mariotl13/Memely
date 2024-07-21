"use client";

import { useEffect, useState } from "react";
import "./history.scss";
import MemeApiService from "@/shared/services/MemeApi.service";
import CustomDatePicker from "@/shared/components/custom-datepicker/custom-datepicker";
import Spinner from "@/shared/components/spinner/spinner";
import { getDateId } from "@/shared/utils/date";

export default function History() {
	const [isLoading, setIsLoading] = useState(true);
	const [historyData, setHistoryData] = useState<{
		templates: { [key: string]: any };
		users: { [key: string]: any };
	}>({ templates: {}, users: {} });
	const [selectedDate, setSelectedDate] = useState("");

	useEffect(() => {
		const response = MemeApiService.get(
			`${process.env.NEXT_PUBLIC_API_URL}/history`
		);
		response.then((data) => {
			setHistoryData(data);
			setIsLoading(false);
		});
	}, []);

	const allowedDatesStrings = Object.keys(historyData.templates);

	const handleOnSelectDate = (selectedDate: Date | null) => {
		setSelectedDate(getDateId(selectedDate as Date));
	};

	let currentMemesByDate;
	if (selectedDate) {
		currentMemesByDate = Object.keys(historyData.users)
			.filter((user) => historyData.users[user]["memes"]?.[selectedDate])
			.map((user) => {
				const userValue = historyData.users[user];
				return {
					userName: userValue.name,
					url: userValue?.["memes"]?.[selectedDate]?.url,
				};
			});
	}

	return (
		<>
			{isLoading ? (
				<Spinner></Spinner>
			) : (
				<div className="history-container">
					<h3>Selecciona una fecha</h3>
					<CustomDatePicker
						allowedDatesStrings={allowedDatesStrings}
						onSelectDate={handleOnSelectDate}
					/>
					{selectedDate && (
						<>
							<h2>
								Plantilla:{" "}
								{historyData.templates[selectedDate].name}
							</h2>
							<div className="memes-container">
								{currentMemesByDate &&
									currentMemesByDate.map((meme) => {
										return (
											<div
												key={meme.userName}
												className="meme"
											>
												<h3>{meme.userName}</h3>
												<img
													src={meme.url}
													alt={
														"Meme del día" +
														meme.url
													}
												/>
											</div>
										);
									})}
							</div>
						</>
					)}
				</div>
			)}
		</>
	);
}
