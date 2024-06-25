
import { ref, get, set } from "firebase/database";
import { database } from "../config";

export const getData = async (path: string) => {
    try {
        const headerRef = ref(database, path);
        const snapshot = await get(headerRef);
        return snapshot.val();
    } catch (error) {
        console.error('Error getting data:', error);
        throw error;
    }
};

export const setData = async (value: any, path?: string) => {
    try {
        const headerRef = ref(database, path);
        const snapshot = await set(headerRef, value);
        return snapshot;
    } catch (error) {
        console.error('Error setting data:', error);
        throw error;
    }
};


// function getGlobalWeekNumber(date) {
//     // Crear una copia de la fecha para no modificar el original
//     let currentDate = new Date(date.getTime());

//     // Ajustar la fecha para que comience el viernes
//     let dayOfWeek = currentDate.getDay();
//     let adjustment = (dayOfWeek >= 5) ? (dayOfWeek - 5) : (dayOfWeek + 2);

//     currentDate.setDate(currentDate.getDate() - adjustment);

//     // Fecha de referencia: 1 de enero del año 2000 (un sábado)
//     let referenceDate = new Date(2000, 0, 1);
//     while (referenceDate.getDay() !== 5) {
//         referenceDate.setDate(referenceDate.getDate() + 1);
//     }

//     // Calcular la diferencia en días entre la fecha ajustada y la fecha de referencia
//     let timeDiff = currentDate - referenceDate;
//     let daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

//     // Calcular el número de la semana global
//     let globalWeekNumber = Math.floor(daysDiff / 7) + 1;

//     return globalWeekNumber;
// }

// // Ejemplo de uso
// let date = new Date('2024-06-25');
// let weekNumber = getGlobalWeekNumber(date);
// console.log(weekNumber);  // Muestra el número de la semana global
