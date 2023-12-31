import '@/styles/globals.css';
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {getScoreboard, getSeasons} from "@/endpoints";
import useToken from "@/hooks/useToken";
import Navbar from "@/components/navbar";
import {leagueNavigation, teamNavigation} from "@/components/navbar/navigationObjects";
import Footer from "@/components/footer/Footer";
import {response, scoreBoardRecord, Season} from "@/types/types";

function Table() {
    const router = useRouter();
    const {token} = useToken();
    const leagueId = `${router.query.id}`;
    const [seasons, setSeasons] = useState<Season[]>([]);
    const [scores, setScores] = useState<scoreBoardRecord[]>([] as scoreBoardRecord[]);
    useEffect(() => {
        getSeasons(token.current, leagueId).then((seasons_data: response) => {
            setSeasons(prev => {
                prev = seasons_data?.results;
                return prev;
            });
        });
    }, [leagueId, token]);
    useEffect(() => {
        const seasonId = seasons?.[0]?.id.toString() ?? "0";
        getScoreboard(seasonId, token.current).then((scores_data: response) => {
            const results: scoreBoardRecord[] = scores_data?.results;
            setScores(prev => {
                prev = results;
                return prev;
            })
        });
    }, [seasons]);

    return (
        <>
            <Navbar token={token.current} navigation={teamNavigation} />
            <div className={"min-h-screen"}>
                <div className="card-body">
                    <table className="table w-full">
                        <thead>
                        <tr>
                            <th className="w-3/12">Miejsce</th>
                            <th className="w-3/12">Drużyna</th>
                            <th className="w-3/12">Miasto</th>
                            <th className="w-3/12">Wynik</th>
                        </tr>
                        </thead>
                        <tbody>
                        {scores?.map((score: scoreBoardRecord, index: number) => (
                            <tr key={score.id}>
                                <td>{index + 1}</td>
                                <td>{score.name}</td>
                                <td>{score.city}</td>
                                <td>{score.score}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Table;