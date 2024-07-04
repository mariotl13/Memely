import { NextRequest, NextResponse } from "next/server";
import { setData } from "@/firebase/database/database.service";


export async function POST(request: NextRequest) {
    try {
        const body: {
            id: string,
            mail: string,
            name: string,
        } = await request.json();

        await setData(`users/${body.id}`, {
            mail: body.mail,
            name: body.name,
            points: 0
        });

        return NextResponse.json(true);
    }
    catch (error) {
        console.error("Error setting data:", error);
        return NextResponse.json(false);
    }
}