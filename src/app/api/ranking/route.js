import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json([
        {
            user: 'Mario',
            points: 13
        },
        {
            user: 'Jose Luis',
            points: 7
        },
        {
            user: 'Samuel',
            points: 13
        },
        {
            user: 'Antonio',
            points: 1
        },
    ])
}