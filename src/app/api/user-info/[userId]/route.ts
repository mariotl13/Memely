import { NextRequest, NextResponse } from "next/server";
import { getData } from "@/firebase/database/database.service";
import { getDateId } from "@/shared/utils/date";


export async function GET(_request: NextRequest, { params }: any) {
    try {
        const { userId } = params;
        // Obtener datos con el ID proporcionado
        const user = await getData(`users/${userId}`);

        const winners = await getData('winners');

        const dateId = getDateId(new Date());
        if (user.memes[dateId] && !winners[dateId]) delete user.memes[dateId];

        return NextResponse.json(user);
    }
    catch (error) {
        console.error("Error getting data:", error);
        return NextResponse.json(null);
    }
}