import '@/styles/globals.css';
import {useRouter} from "next/router";
import Navbar from "@/components/navbar";
import useToken from "@/hooks/useToken";
import {teamNavigation} from "@/components/navbar/navigationObjects";
import Footer from "@/components/footer/Footer";
import {Match, Season, Team} from "@/types/types";
import {createMatch, createSeason, createTeam, getSeasons, getTeams} from "@/endpoints";
import {useEffect, useState} from "react";
import InputField from "@/components/inputField";
import SelectInput from "@/components/selectInput";
import {optionObject} from "@/components/selectInput/SelectInput";

function AddToLeague() {
    const {token} = useToken();
    const router = useRouter();
    const leagueId = router.query.id as string;
    const itemName = router.query.item;
    const [inputObject, setInputObject] = useState<Team & Match & Season>({} as Team & Match & Season);

    const [failed, setFailed] = useState(false);
    return (
        <>
            <Navbar token={token.current} navigation={teamNavigation} getCurrentPage={"Strona główna"}/>
            <div className="hero min-h-screen bg-base-200">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        {
                            itemName === "match" &&
                            <MatchInputBody inputObject={inputObject} setInputObject={setInputObject} leagueId={leagueId}
                                            setFailed={setFailed}/>
                        }
                        {
                            itemName === "team" &&
                            <TeamInputBody inputObject={inputObject} setInputObject={setInputObject} leagueId={leagueId}
                                           setFailed={setFailed}/>
                        }
                        {
                            itemName === "season" &&
                            <SeasonInputBody inputObject={inputObject} setInputObject={setInputObject} leagueId={leagueId}
                                             setFailed={setFailed}/>
                        }
                        {
                            failed && <p className={"text-red-500"}>Wypełnij wszystkie pola</p>
                        }
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default AddToLeague;

function TeamInputBody(
    props: {
        setInputObject: Function
        inputObject: Team
        leagueId: string
        setFailed: Function
    }
) {
    const {setInputObject, inputObject, leagueId, setFailed} = props;
    const {token} = useToken();
    const router = useRouter();
    const [seasonOptions, setSeasonOptions] = useState<optionObject[]>([] as optionObject[]);
    useEffect(() => {
        getSeasons(token.current, leagueId).then((seasons) => {
            setSeasonOptions(seasons?.results?.map((season: Season) => {
                return {
                    value: season.id,
                    label: season.name
                }
            }));
        });
    }, [token, leagueId]);
    return (<>
        <InputField type={"text"} placeholder={"Nazwa drużyny"} onChange={(e: string) => {
            setInputObject((prev: Team) => {
                return {
                    ...prev,
                    name: e
                }
            })
        }} label={"Nazwa drużyny"} value={inputObject.name} required={true} />
        <SelectInput title={"Sezon"}  items={seasonOptions} setInputObject={(e: string) => {
            setInputObject((prev: Team) => {
                return {
                    ...prev,
                    season: e
                }
            })
        }}/>
        <InputField type={"text"} placeholder={"Miasto"} onChange={(e: string) => {
            setInputObject((prev: Team) => {
                return {
                    ...prev,
                    city: e
                }
            })
        }} label={"Miasto"} value={inputObject.city} required={false} />
        <InputField type={"number"} placeholder={"Numer druzyny"} onChange={(e: string) => {
            setInputObject((prev: Team) => {
                return {
                    ...prev,
                    number: e
                }
            })
        }
        } label={"Numer druzyny"} value={inputObject.number} required={true} />
        <div className="form-control">
            <label className="label">
                <span className="label-text">Opis drużyny</span>
            </label>
            <textarea placeholder="Opis drużyny" className="textarea h-24 textarea-bordered" required/>
        </div>
        <div className="form-control mt-6">
            <button className="btn btn-primary" onClick={() => {
                createTeam(inputObject, token.current, leagueId).then((response)=>{
                    if(response.ok)
                        router.push(`/leagueView/${leagueId}`)
                    else
                        setFailed(true);
                })
            }}
            >Dodaj</button>
        </div>
    </>)
}

function MatchInputBody(
    props: {
        setInputObject: Function
        inputObject: Match
        leagueId: string
        setFailed: Function
    }
) {
    const {setInputObject, inputObject, leagueId, setFailed} = props;
    const {token} = useToken();
    const router = useRouter();
    const [teamOptions, setTeamOptions] = useState<optionObject[]>([] as optionObject[]);
    const [seasonOptions, setSeasonOptions] = useState<optionObject[]>([] as optionObject[]);
    useEffect(() => {
        getTeams(token.current, leagueId).then((teams) => {
            setTeamOptions(prev => {
                return teams.map((team: Team) => {
                    return {
                        value: team.id,
                        label: team.name
                    }
                })
            });
        });
        getSeasons(token.current, leagueId).then((seasons) => {
            setSeasonOptions(seasons?.map((season: Season) => {
                return {
                    value: season.id,
                    label: season.name
                }
            }));
        });
    }, [token, leagueId]);

    return (
        <>
            <InputField type={"datetime-local"} placeholder={"Data meczu"} onChange={(value: string) => {
                setInputObject((prev: Match) => {
                    return {
                        ...prev,
                        datetime: value
                    }
                })
            }
            } label={"Data meczu"} value={inputObject.datetime} required={true} />
            <SelectInput title={"Gospodarz"} items={teamOptions} setInputObject={(e: string) => {
                setInputObject((prev: Match) => {
                    return {
                        ...prev,
                        host: e
                    }
                })
            }}/>
            <SelectInput title={"Gość"} items={teamOptions} setInputObject={(e: Team) => {
                setInputObject((prev: Match) => {
                    return {
                        ...prev,
                        visitor: e
                    }
                })
            }
            }/>
            <InputField type={"text"} placeholder={"Adres"} onChange={(e: Team) => {
                setInputObject((prev: Match) => {
                    return {
                        ...prev,
                        address: e
                    }
                })
            }} label={"Adres"} value={inputObject.address} required={true} />
            <InputField type={"text"} placeholder={"Miasto"} onChange={(e: string) => {
                setInputObject((prev: Match) => {
                    return {
                        ...prev,
                        city: e
                    }
                })
            }
            } label={"Miasto"} value={inputObject.city} required={true} />
            <SelectInput title={"Sezon"} items={seasonOptions} setInputObject={(e: string) => {
                setInputObject((prev: Match) => {
                    return {
                        ...prev,
                        season: e
                    }
                })
            }
            }/>
            <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={
                    () => {
                        if(
                            inputObject.address === undefined ||
                            inputObject.city === undefined ||
                            inputObject.datetime === undefined ||
                            inputObject.host === undefined ||
                            inputObject.visitor === undefined ||
                            inputObject.host === inputObject.visitor
                        ) {
                            setFailed(true);
                            return;
                        }
                        createMatch(inputObject, token.current, leagueId).then((response) => {
                            if (response.ok)
                                router.push(`/leagueView/${leagueId}`)
                            else
                                setFailed(true);
                        })
                    }
                }>Dodaj</button>
            </div>
        </>
    )
}

function SeasonInputBody(
    props: {
        setInputObject: Function
        inputObject: Season
        leagueId: string
        setFailed: Function
    }
){
    const {setInputObject, inputObject, leagueId, setFailed} = props;
    const {token} = useToken();
    const router = useRouter();

    useEffect(() => {
        setInputObject((prev: Season) => {
            return {
                ...prev,
                league: leagueId
            }
        });
    }, [leagueId]);

    return (<>
        <InputField type={"text"} placeholder={"Nazwa sezonu"} onChange={(e: string) => {
            setInputObject((prev: Team) => {
                return {
                    ...prev,
                    name: e
                }
            })
        }} label={"Nazwa sezonu"} value={inputObject.name} required={true} />
        <InputField type={"date"} placeholder={"Data rozpoczęcia"} onChange={(e: string) => {
            setInputObject((prev: Team) => {
                return {
                    ...prev,
                    start_date: e
                }
            })
        }} label={"Data rozpoczęcia"} value={inputObject.start_date} required={true} />
        <InputField type={"date"} placeholder={"Data zakończenia"} onChange={(e: string) => {
            setInputObject((prev: Team) => {
                return {
                    ...prev,
                    end_date: e
                }
            })
        }} label={"Data zakończenia"} value={inputObject.end_date} required={true} />
        <InputField type={"number"} placeholder={"points per win"} onChange={(e: string) => {
            setInputObject((prev: Team) => {
                return {
                    ...prev,
                    points_per_win: e
                }
            })
        }}
        label={"points per win"} value={inputObject.points_per_win} required={true} />
        <InputField type={"number"} placeholder={"points per draw"} onChange={(e: string) => {
            setInputObject((prev: Team) => {
                return {
                    ...prev,
                    points_per_draw: e
                }
            })
        }}
        label={"points per draw"} value={inputObject.points_per_draw} required={true} />
        <InputField type={"number"} placeholder={"points per lose"} onChange={(e: string) => {
            setInputObject((prev: Team) => {
                return {
                    ...prev,
                    points_per_lose: e
                }
            })
        }}
        label={"points per lose"} value={inputObject.points_per_lose} required={true} />
        <div className="form-control mt-6">
            <button className="btn btn-primary" onClick={() => {
                if(
                    inputObject.name === undefined ||
                    inputObject.start_date === undefined ||
                    inputObject.end_date === undefined
                ) {
                    setFailed(true);
                    return;
                }
                createSeason(inputObject, token.current).then((response)=>{
                    if(response.ok)
                        router.push(`/leagueView/${leagueId}`)
                    else
                        setFailed(true);
                })
            }}
            >Dodaj</button>
        </div>
    </>)
}