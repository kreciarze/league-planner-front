import '@/styles/globals.css';
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {getScoreboard, getSeasons} from "@/endpoints";
import useToken from "@/hooks/useToken";
import Navbar from "@/components/navbar";
import {leagueNavigation, teamNavigation} from "@/components/navbar/navigationObjects";
import Footer from "@/components/footer/Footer";
import {Match, response, scoreBoardRecord, Season} from "@/types/types";
import SelectInput from "@/components/selectInput";
import {optionObject} from "@/components/selectInput/SelectInput";

function Table() {
    const router = useRouter();
    const {token} = useToken();
    const leagueId = `${router.query.id}`;
    const [seasons, setSeasons] = useState<Season[]>([]);
    const [seasonId, setSeasonId] = useState<string>("");
    const [seasonOptions, setSeasonOptions] = useState<optionObject[]>([] as optionObject[]);
    const [scores, setScores] = useState<scoreBoardRecord[]>([] as scoreBoardRecord[]);
    useEffect(() => {
        getSeasons(token.current, leagueId).then((seasons_data: Season[]) => {
            setSeasons(prev => {
                prev = seasons_data ?? [] as Season[];
                return prev;
            });
            setSeasonOptions(prev => {
                prev = seasons_data?.map((season: Season) => {
                    return {
                        value: season.id,
                        label: season.name
                    } as optionObject;
                });
                return prev;
            });
        });
    }, [leagueId, token]);
    useEffect(() => {
        getScoreboard(seasonId, token.current).then((scores_data: response) => {
            const results: scoreBoardRecord[] = scores_data?.results;
            setScores(prev => {
                prev = results;
                return prev;
            })
        });
    }, [seasons, seasonId]);

    return (
        <>
            <Navbar token={token.current} navigation={teamNavigation} />
            <SelectInput title={"Sezon"} items={seasonOptions} setInputObject={(e: string) => {
                setSeasonId(e);
            }
            }/>
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