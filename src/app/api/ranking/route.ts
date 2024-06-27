import { NextResponse } from "next/server";
import { getData, transaction } from "@/firebase/database/database.service";
import { getDateId } from "@/shared/utils/date";

export async function GET() {
    try {
        const data = await getData('users');

        if (data) {
            // Convertir el objeto en un array
            const usersArray = Object.keys(data).map((key) => ({
                id: key,
                name: data[key].name,
                mail: data[key].mail,
                points: data[key].points
            }));
            return NextResponse.json(usersArray);
        }

        return NextResponse.json([{ user: 'null', points: 0 }]);
    }
    catch (error) {
        console.error("Error getting data:", error);
        return NextResponse.json([{ user: 'null', points: 0 }]);
    }
}

export async function POST() {
    try {
        const memeId = getDateId(new Date());

        const votes = await getData(`votes/${memeId}`);
        const todayRank = calcTop3(votes);

        Object.keys(todayRank).forEach(async usuario => {
            if (todayRank[usuario] !== 0) {
                await transaction(`users/${usuario}/points`, (currentPoints: number) => currentPoints + todayRank[usuario]);
            }
        });

        return NextResponse.json(true);
    }
    catch (error) {
        console.error("Error getting data:", error);
        return NextResponse.json(false);
    }
}

type Puntuaciones = {
    [usuario: string]: {
        [destinatario: string]: number
    }
};

type PuntuacionesRecibidas = {
    [usuario: string]: number
};

type PuntosAsignados = {
    [usuario: string]: number
};

function calcTop3(votes: Puntuaciones) {
    // Crear un objeto para almacenar las puntuaciones totales recibidas por cada usuario
    let puntuacionesRecibidas: PuntuacionesRecibidas = {};

    // Calcular la puntuación total recibida por cada usuario
    Object.keys(votes).forEach(usuario => {
        Object.keys(votes[usuario]).forEach(destinatario => {
            if (!puntuacionesRecibidas[destinatario]) {
                puntuacionesRecibidas[destinatario] = 0;
            }
            puntuacionesRecibidas[destinatario] += votes[usuario][destinatario];
        });
    });

    // Convertir el objeto en una matriz de pares [usuario, puntuación]
    let puntuacionesArray = Object.entries(puntuacionesRecibidas);

    // Ordenar la matriz por la puntuación en orden descendente
    puntuacionesArray.sort((a, b) => b[1] - a[1]);

    // Crear un objeto para almacenar los puntos asignados a los usuarios
    let puntosAsignados: PuntosAsignados = {};
    let puntosPosiciones = [3, 2, 1]; // Puntos para el 1er, 2do y 3er lugar
    let posicionActual = 0;
    let puntosActuales = puntosPosiciones[posicionActual];

    puntuacionesArray.forEach((usuario, i) => {
        // Si estamos en una posición más allá de la 3ra, no asignamos más puntos
        if (posicionActual >= puntosPosiciones.length) return;

        // Si no es el primer usuario y la puntuación actual es diferente a la puntuación anterior, avanzamos de posición
        if (i > 0 && puntuacionesArray[i][1] < puntuacionesArray[i - 1][1]) {
            posicionActual++;
            puntosActuales = puntosPosiciones[posicionActual] || 0; // En caso de que nos pasemos de las posiciones
        }

        // Asignar puntos al usuario
        puntosAsignados[usuario[0]] = puntosActuales;
    });

    return puntosAsignados;
}

