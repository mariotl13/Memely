import { NextRequest, NextResponse } from "next/server";
import { getData, setData, transaction } from "@/firebase/database/database.service";
import { getDateId } from "@/shared/utils/date";


export async function GET(_request: NextRequest, { params }: any) {
    try {
        const { userId } = params;
        const dateId = getDateId(new Date());

        const users = await getData(`users`);
        const votes = await getData(`votes`);

        if (votes?.[dateId]?.[userId]) return NextResponse.json(null);

        // Guardar todos los memes que no sean los del propio usuario
        const memesArray = Object.keys(users).filter(key =>
            key !== userId &&
            users[key]?.memes?.[dateId]?.url
        ).map((key) => ({
            userId: key,
            url: users[key]?.memes?.[dateId]?.url
        }));

        if (memesArray) return NextResponse.json(memesArray);

        return NextResponse.json(null);
    }
    catch (error) {
        console.error("Error getting data:", error);
        return NextResponse.json(null);
    }
}

export async function POST(request: NextRequest, { params }: any) {
    try {
        const { userId } = params;
        const dateId = getDateId(new Date());
        const body = await request.json();

        for (const currentVote of body) {
            await setData(`votes/${dateId}/${userId}/${currentVote.votedUserId}`, currentVote.vote);
            await transaction(`users/${currentVote.votedUserId}/memes/${dateId}/points`, (currentPoints: number) => currentPoints + currentVote.vote);
        }

        return NextResponse.json(true);
    }
    catch (error) {
        console.error("Error getting data:", error);
        return NextResponse.json(false);
    }
}