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

    return (
        <>
            <Navbar token={token.current} navigation={teamNavigation} getCurrentPage={"Strona główna"}/>
            <div className="hero min-h-screen bg-base-200">
                <RenderInput leagueId={leagueId as string} itemName={itemName as string} setInputObject={setInputObject} inputObject={inputObject}/>
            </div>
            <Footer/>
        </>
    );
}

export default AddToLeague;

function RenderInput(
    props: {
        itemName: string
        setInputObject: Function
        leagueId: string
        inputObject: Team & Match
    }
){
    const {itemName, setInputObject, inputObject, leagueId} = props;
    const createEndpoint = itemName === "team" ? createTeam : createMatch;
    const [homeTeam, setHomeTeam] = useState<optionObject>({} as optionObject);
    const [visitor, setVisitor] = useState<optionObject>({} as optionObject);
    const [options, setOptions] = useState<optionObject[]>([] as optionObject[]);
    const {token} = useToken();
    const [failed, setFailed] = useState(false);

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

    switch (itemName) {
        case "team":
            return (
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <InputField type={"text"} placeholder={"Nazwa drużyny"} onChange={() => {
                            setInputObject((prev: Team) => {
                                return {
                                    ...prev,
                                    name: inputObject.name
                                }
                            })
                        }} label={"Nazwa drużyny"} value={inputObject.name} required={true} />
                        <InputField type={"text"} placeholder={"Miasto"} onChange={() => {
                            setInputObject((prev: Team) => {
                                return {
                                    ...prev,
                                    city: inputObject.city
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
                                createEndpoint(inputObject, token.current, leagueId);
                            }}
                            >Dodaj</button>
                        </div>
                    </div>
                </div>
            );
        case "match":
            return (
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={async (e) => {
                        e.preventDefault();
                        await createEndpoint(inputObject, token.current, leagueId);
                    }}>
                        <InputField type={"datetime-local"} placeholder={"Data meczu"} onChange={(value: string) => {
                            setInputObject((prev: Match) => {
                                return {
                                    ...prev,
                                    dateTime: value
                                }
                            })
                        }
                        } label={"Data meczu"} value={inputObject.datetime} required={true} />
                        <SelectInput title={"Gospodarz"} items={options} setInputObject={setHomeTeam}/>
                        <SelectInput title={"Gość"} items={options} setInputObject={setVisitor}/>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Adres</span>
                            </label>
                            <input type="text" placeholder="Adres" className="input input-bordered" required onChange={
                                (e) => {
                                    setInputObject((prev: Match) => {
                                        return {
                                            ...prev,
                                            address: e.target ? e.target.value : ""
                                        }
                                    });
                                }
                            }/>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" onClick={
                                (e) => {
                                    e.preventDefault();
                                    setInputObject((prev: Match) => {
                                        prev = {
                                            ...prev,
                                            host: homeTeam.value,
                                            visitor: visitor.value,
                                            city: "",
                                        };
                                        return prev;
                                    });
                                    if(
                                        !homeTeam.value ||
                                        !visitor.value ||
                                        !inputObject.address ||
                                        !inputObject.datetime
                                    ){
                                        setFailed(true);
                                        return;
                                    }
                                    createEndpoint({
                                        ...inputObject,
                                        host: homeTeam.value,
                                        visitor: visitor.value,
                                        city: "",
                                    }, token.current, leagueId);
                                }
                            }>Dodaj</button>
                        </div>
                    </form>
                </div>
            );
    }

}