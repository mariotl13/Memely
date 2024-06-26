

export function stringToDate(fechaStr: string) {
    // Asegurarse de que el string tenga 8 caracteres
    if (fechaStr.length !== 8) {
        throw new Error("El formato de la fecha debe ser DDMMAAAA");
    }

    // Extraer el día, mes y año del string
    const dia = parseInt(fechaStr.substring(0, 2), 10);
    const mes = parseInt(fechaStr.substring(2, 4), 10) - 1; // Los meses en JavaScript son de 0 a 11
    const anio = parseInt(fechaStr.substring(4, 8), 10);

    // Crear el objeto Date
    const fecha = new Date(anio, mes, dia);

    // Validar que la fecha sea correcta
    if (fecha.getDate() !== dia || fecha.getMonth() !== mes || fecha.getFullYear() !== anio) {
        throw new Error("Fecha no válida");
    }

    return fecha;
}
