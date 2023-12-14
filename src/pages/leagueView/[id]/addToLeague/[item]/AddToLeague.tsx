import {useRouter} from "next/router";
import Navbar from "@/components/navbar";
import useToken from "@/hooks/useToken";
import {teamNavigation} from "@/components/navbar/navigationObjects";
import Footer from "@/components/footer/Footer";
import {Match, Team} from "@/types/types";
import {createMatch, createTeam } from "@/endpoints";
import {useState} from "react";
import InputField from "@/components/inputField";

function AddToLeague() {
    const token = useToken();
    const router = useRouter();
    const leagueId = router.query.id;
    const itemName = router.query.item;
    const [inputObject, setInputObject] = useState<Team & Match>({} as Team & Match);

    return (
        <>
            <Navbar token={token.current} navigation={teamNavigation} getCurrentPage={"Strona główna"}/>
            <div className="hero min-h-screen bg-base-200">
                <RenderInput token={token.current} leagueId={leagueId as string} itemName={itemName as string} setInputObject={setInputObject} inputObject={inputObject}/>
            </div>
            <Footer/>
        </>
    );
}

export default AddToLeague;

function RenderInput(
    props: {
        token: string | null
        itemName: string
        setInputObject: Function
        leagueId: string
        inputObject: Team & Match
    }
){
    const {token, itemName, setInputObject, inputObject, leagueId} = props;
    const createEndpoint = itemName === "team" ? createTeam : createMatch;
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
                                createEndpoint(inputObject, token, leagueId);
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
                        await createEndpoint(inputObject, token, leagueId);
                    }}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Data meczu</span>
                            </label>
                            <input type="date" placeholder="Data" className="input input-bordered" required onChange={
                                (e) => {
                                    setInputObject((prev: Match) => {
                                        return {
                                            ...prev,
                                            date: e.target.value
                                        }
                                    });
                                }
                            }/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Gospodarz</span>
                            </label>
                            <input type="text" placeholder="Gospodarz" className="input input-bordered" required onChange={
                                (e) => {
                                    setInputObject((prev: Match) => {
                                        return {
                                            ...prev,
                                            host: e.target.value
                                        }
                                    });
                                }
                            }/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Gość</span>
                            </label>
                            <input type="text" placeholder="Gość" className="input input-bordered" required onChange={
                                (e) => {
                                    setInputObject((prev: Match) => {
                                        return {
                                            ...prev,
                                            visitor: e.target.value
                                        }
                                    });
                                }
                            }/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Adres</span>
                            </label>
                            <input type="text" placeholder="Adres" className="input input-bordered" required onChange={
                                (e) => {
                                    setInputObject((prev: Match) => {
                                        return {
                                            ...prev,
                                            address: e.target.value
                                        }
                                    });
                                }
                            }/>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Dodaj</button>
                        </div>
                    </form>
                </div>
            );
    }

}