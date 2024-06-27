import { NextRequest, NextResponse } from "next/server";
import { getData, setData, transaction } from "@/firebase/database/database.service";
import { getDateId } from "@/shared/utils/date";


export async function GET(_request: NextRequest, { params }: any) {
    try {
        const { userId } = params;
        const dateId = getDateId(new Date());

        const users = await getData(`users`);
        const votes = await getData(`votes`);

        // Guardar todos los memes que no sean los del propio usuario, y que no los haya votado ya
        const memesArray = Object.keys(users).filter(key =>
            key !== userId &&
            users[key]?.memes?.[dateId]?.url &&
            votes?.[dateId]?.[userId]?.[key] === undefined
        ).map((key) => ({
            userId: key,
            url: users[key]?.memes?.[dateId]?.url
        }));

        if (memesArray) return NextResponse.json(memesArray);

        return NextResponse.json(null);
    }
    catch (error) {
        console.error("Error getting data:", error);
        return NextResponse.json(null);
    }
}

export async function POST(request: NextRequest, { params }: any) {
    try {
        const { userId } = params;
        const dateId = getDateId(new Date());
        const body = await request.json();

        await setData(`votes/${dateId}/${userId}/${body.votedUserId}`, body.vote);
        await transaction(`users/${body.votedUserId}/memes/${dateId}/points`, (currentPoints: number) => currentPoints + body.vote);


        // const userRef = database.ref('Luis/age');

        // userRef.transaction((currentAge) => {
        //   if (currentAge === null) {
        //     return 1; // Si age no existe, inicializarlo a 1
        //   }
        //   return currentAge + 1;
        // }, (error, committed, snapshot) => {
        //   if (error) {
        //     console.log('Transaction failed: ', error);
        //   } else if (!committed) {
        //     console.log('Transaction not committed.');
        //   } else {
        //     console.log('Transaction committed: ', snapshot.val());
        //   }
        // });

        return NextResponse.json(true);
    }
    catch (error) {
        console.error("Error getting data:", error);
        return NextResponse.json(false);
    }
}