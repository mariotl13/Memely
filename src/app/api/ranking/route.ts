import { NextResponse } from "next/server";
import { getData } from "@/firebase/database/database.service";

export const dynamic = 'force-dynamic';
export async function GET() {
    try {
        const data = await getData('users');

        if (data) {
            // Convertir el objeto en un array
            const usersArray = Object.keys(data).map((key) => ({
                id: key,
                name: data[key].name,
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


