


export interface Ranking {
    user: string;
    points: number;
}


export default function Vote() {

    const ranking: Ranking[] = [
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
    ]

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Puntuación</th>
                    </tr>
                </thead>
                <tbody>
                    {...ranking.sort((a, b) => b.points - a.points).map(rank =>
                        <tr key={rank.user}>
                            <td>{rank.user}</td>
                            <td>{rank.points}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}