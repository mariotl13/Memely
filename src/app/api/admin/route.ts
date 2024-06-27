import { NextRequest, NextResponse } from "next/server";
import { getData, setData } from "@/firebase/database/database.service";
import { getDateId } from "@/shared/utils/date";
import { AdminInfo } from "@/app/admin/page";

export async function GET() {
    try {
        const dateId = getDateId(new Date());
        const status = await getData('status');
        const meme = await getData(`templates/${dateId}`);

        return NextResponse.json({
            status,
            meme
        } as AdminInfo);
    }
    catch (error) {
        console.error("Error getting data:", error);
        return NextResponse.json(null);
    }
}

export async function POST(request: NextRequest) {
    try {
        const dateId = getDateId(new Date());
        const body: AdminInfo = await request.json();

        await setData('status', body.status);
        await setData(`templates/${dateId}`, body.meme);

        return NextResponse.json(true);
    }
    catch (error) {
        console.error("Error setting data:", error);
        return NextResponse.json(false);
    }
}