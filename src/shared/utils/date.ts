
export function getDateId(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function padToTwoDigits(number: string) {
    return number.toString().padStart(2, '0');
}

export function formatDateString(dateString: string) {
    // Divide el string por los guiones
    const [year, month, day] = dateString.split('-');

    // Asegúrate de que el mes y el día tengan dos dígitos
    const formattedMonth = padToTwoDigits(month);
    const formattedDay = padToTwoDigits(day);

    // Devuelve el string con el formato correcto
    return `${year}-${formattedMonth}-${formattedDay}`;
}
