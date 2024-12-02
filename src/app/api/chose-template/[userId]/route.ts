import { NextRequest, NextResponse } from "next/server";
import { getData } from "@/firebase/database/database.service";
import { formatDateString, getDateId } from "@/shared/utils/date";


export async function GET(_request: NextRequest, { params }: any) {
    try {
        const { userId } = params;

        const winners = await getData(`winners`);
        const datesArray = Object.keys(winners).map((key: string) => (new Date(formatDateString(key))));
        datesArray.sort((a, b) => b.getTime() - a.getTime());

        return NextResponse.json(winners?.[getDateId(datesArray[0])]?.[userId]?.points === 3);
    }
    catch (error) {
        console.error("Error getting data:", error);
        return NextResponse.json(false);
    }
}
