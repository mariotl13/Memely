import { NextRequest, NextResponse } from "next/server";
import { getData, setData } from "@/firebase/database/database.service";
import { getDateId } from "@/shared/utils/date";


export async function GET(_request: NextRequest, { params }: any) {
    try {
        const { userId } = params;
        const memeId = getDateId(new Date());
        const memeGenerated = await getData(`users/${userId}/memes/${memeId}/url`);
        const memeTemplate = await getData(`templates/${memeId}`);

        return NextResponse.json(
            {
                memeGenerated,
                memeTemplate
            }
        );
    }
    catch (error) {
        console.error("Error getting data:", error);
        return NextResponse.json(null);
    }
}

export async function POST(request: NextRequest, { params }: any) {
    try {
        const { userId } = params;
        const memeId = getDateId(new Date());
        const body = await request.json();

        await setData(`users/${userId}/memes/${memeId}`, body);

        return NextResponse.json(true);
    }
    catch (error) {
        console.error("Error getting data:", error);
        return NextResponse.json(false);
    }
}