"use client";

import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import { useEffect, useState } from "react";

const Countdown = ({ limit }: { limit: { hour: number; minutes: number } }) => {
	const [targetTime, setTargetTime] = useState<number | null>(null);

	useEffect(() => {
		// Crear un objeto de fecha para las 12:30 PM del día actual
		const target = new Date();
		target.setHours(limit.hour, limit.minutes, 0, 0); // 12:30:00 PM

		setTargetTime(target.getTime()); // Establece el tiempo objetivo en milisegundos
	}, []);

	if (!targetTime) {
		return null; // Evita renderizar hasta que se calcule el tiempo objetivo
	}

	return (
		<FlipClockCountdown
			to={targetTime}
			labelStyle={{
				color: "black",
				fontSize: "16px", // Ajusta el tamaño de la fuente de las etiquetas según el ancho de la pantalla
				fontWeight: 500,
			}}
			digitBlockStyle={{
				width: "32px", // Ajusta el ancho de los dígitos al 10% del ancho de la pantalla
				height: "48px", // Ajusta la altura de los dígitos al 15% del ancho de la pantalla
				fontSize: "16px", // Ajusta el tamaño del texto dentro de los dígitos
			}}
			style={{ justifyContent: "center", marginBottom: "32px" }}
			hideOnComplete={false}
			renderMap={[false, true, true, true]}
		/>
	);
};

export default Countdown;
