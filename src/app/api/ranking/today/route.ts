import { NextResponse } from "next/server";
import { getData, setData, transaction } from "@/firebase/database/database.service";
import { getDateId } from "@/shared/utils/date";
import { calcTop3 } from "@/shared/utils/points";


export async function GET() {
    try {
        const memeId = getDateId(new Date());

        const winners = await getData(`winners/${memeId}`);

        return NextResponse.json(winners);
    }
    catch (error) {
        console.error("Error getting data:", error);
        return NextResponse.json(null);
    }
}

export async function POST() {
    try {
        const memeId = getDateId(new Date());

        const votes = await getData(`votes/${memeId}`);
        const users = await getData('users');

        const todayRank = calcTop3(votes);

        Object.keys(todayRank).forEach(async usuario => {
            if (todayRank[usuario] !== 0) {
                await transaction(`users/${usuario}/points`, (currentPoints: number) => currentPoints + todayRank[usuario]);
                await setData(`winners/${memeId}/${usuario}`, {
                    points: todayRank[usuario],
                    name: `${users[usuario].name}`,
                    memeUrl: users[usuario].memes[memeId].url
                });
            }
        });

        return NextResponse.json(true);
    }
    catch (error) {
        console.error("Error setting data:", error);
        return NextResponse.json(false);
    }
}


