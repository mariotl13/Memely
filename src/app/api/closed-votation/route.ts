import { NextResponse } from "next/server";
import { getData } from "@/firebase/database/database.service";
import { getDateId } from "@/shared/utils/date";

export async function GET() {
    try {
        const dateId = getDateId(new Date());
        const status = await getData('status');
        const votes = await getData(`votes/${dateId}`);

        return NextResponse.json(status === 'closed' && !!votes);
    }
    catch (error) {
        console.error("Error getting data:", error);
        return NextResponse.json(false);
    }
}
