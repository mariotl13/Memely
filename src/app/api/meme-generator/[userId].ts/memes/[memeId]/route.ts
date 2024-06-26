import { NextRequest, NextResponse } from "next/server";
import { setData } from "@/firebase/database/database.service";

export async function POST(request: NextRequest, { params }: any) {
    try {
        const { userId, memeId } = params;
        const body = await request.json();

        await setData(`users/${userId}/memes/${memeId}`, body);

        return NextResponse.json(true);
    }
    catch (error) {
        console.error("Error getting data:", error);
        return NextResponse.json(false);
    }
}