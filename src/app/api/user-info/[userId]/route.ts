import { NextRequest, NextResponse } from "next/server";
import { getData } from "@/firebase/database/database.service";


export async function GET(_request: NextRequest, { params }: any) {
    try {
        const { userId } = params;
        // Obtener datos con el ID proporcionado
        const data = await getData(`users/${userId}`);

        if (data) return NextResponse.json(data);

        return NextResponse.json(null);
    }
    catch (error) {
        console.error("Error getting data:", error);
        return NextResponse.json(null);
    }
}