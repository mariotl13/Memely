import { NextResponse } from "next/server";
import { getData } from "@/firebase/database/database.service";
import { getDateId } from "@/shared/utils/date";

export async function GET() {
    try {
        const templates = await getData('templates');
        const users = await getData('users');

        const winners = await getData('winners');

        const dateId = getDateId(new Date());
        if (templates[dateId] && !winners[dateId]) delete templates[dateId];

        return NextResponse.json({ templates, users });
    }
    catch (error) {
        console.error("Error getting templates:", error);
        return NextResponse.json([]);
    }
}
