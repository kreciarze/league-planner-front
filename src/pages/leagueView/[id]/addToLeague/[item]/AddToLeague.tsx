import '@/styles/globals.css';
import {useRouter} from "next/router";
import Navbar from "@/components/navbar";
import useToken from "@/hooks/useToken";
import {teamNavigation} from "@/components/navbar/navigationObjects";
import Footer from "@/components/footer/Footer";
import {Match, Team} from "@/types/types";
import {createMatch, createTeam, getTeams} from "@/endpoints";
import {useEffect, useState} from "react";
import InputField from "@/components/inputField";
import SelectInput from "@/components/selectInput";
import {optionObject} from "@/components/selectInput/SelectInput";

function AddToLeague() {
    const {token} = useToken();
    const router = useRouter();
    const leagueId = router.query.id as string;
    const itemName = router.query.item;
    const [inputObject, setInputObject] = useState<Team & Match>({} as Team & Match);

    const [failed, setFailed] = useState(false);
    return (
        <>
            <Navbar token={token.current} navigation={teamNavigation} getCurrentPage={"Strona główna"}/>
            <div className="hero min-h-screen bg-base-200">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        {
                            itemName === "match" &&
                            <MatchInputBody inputObject={inputObject} setInputObject={setInputObject}
                                            leagueId={leagueId} setFailed={setFailed}/>
                        }
                        {
                            itemName === "team" &&
                            <TeamInputBody inputObject={inputObject} setInputObject={setInputObject} leagueId={leagueId}
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
    return (<>
        <InputField type={"text"} placeholder={"Nazwa drużyny"} onChange={(e: string) => {
            setInputObject((prev: Team) => {
                return {
                    ...prev,
                    name: e
                }
            })
        }} label={"Nazwa drużyny"} value={inputObject.name} required={true} />
        <InputField type={"text"} placeholder={"Miasto"} onChange={(e: string) => {
            setInputObject((prev: Team) => {
                return {
                    ...prev,
                    city: e
                }
            })
        }} label={"Miasto"} value={inputObject.city} required={true} />
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
    const [options, setOptions] = useState<optionObject[]>([] as optionObject[]);
    useEffect(() => {
        getTeams(token.current, leagueId).then((teams) => {
            setOptions(teams?.results.map((team: Team) => {
                return {
                    value: team.id,
                    label: team.name
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
            <SelectInput title={"Gospodarz"} items={options} setInputObject={(e: string) => {
                setInputObject((prev: Match) => {
                    return {
                        ...prev,
                        host: e
                    }
                })
            }}/>
            <SelectInput title={"Gość"} items={options} setInputObject={(e: string) => {
                setInputObject((prev: Match) => {
                    return {
                        ...prev,
                        visitor: e
                    }
                })
            }
            }/>
            <InputField type={"text"} placeholder={"Adres"} onChange={(e: string) => {
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
