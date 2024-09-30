"use client";

import "./custom-datepicker.scss";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isSameDay } from "date-fns";
import { formatDateString } from "@/shared/utils/date";

const CustomDatePicker = ({
	allowedDatesStrings,
	onSelectDate,
}: {
	allowedDatesStrings: string[];
	onSelectDate: (selectedDate: Date | null) => void;
}) => {
	const [selectedDate, setSelectedDate] = useState(null);

	// Lista de fechas permitidas
	const allowedDates = allowedDatesStrings.map(
		(dateString) => new Date(formatDateString(dateString))
	);

	// Función para verificar si una fecha es seleccionable
	const isSelectable = (date: any) => {
		return allowedDates.some((allowedDate) => isSameDay(date, allowedDate));
	};

	return (
		<DatePicker
			selected={selectedDate}
			onChange={(date) => setSelectedDate(date as any)}
			filterDate={isSelectable}
			placeholderText="Selecciona una fecha"
			dateFormat="yyyy-M-d"
			onSelect={onSelectDate}
			calendarStartDay={1}
		/>
	);
};

export default CustomDatePicker;
