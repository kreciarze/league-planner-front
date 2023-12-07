import "@/styles/globals.css";
import { createLeague } from "@/endpoints";
import {useEffect, useRef, useState} from "react";
import styleSheet from "@/styles/styleStrings";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer/Footer";

function AddLeague(){
    let token = useRef<string | null>(null);
    useEffect(() => {
        token.current = document.cookie.split('; ').find(row => row.startsWith('token'))?.split('=')[1] || null;
        if(!token || token.current === null) {
            window.location.href = '/login';
        }
    }, [token]);

    const [leagueName, setLeagueName] = useState("");
    return (
        <>
            <Navbar token={token.current} getCurrentPage={"Dodaj ligę"}/>
            <div className="hero min-h-screen bg-base-200">
                <div className="flex flex-col items-center lg:flex-row-reverse">
                    <div className="text-center lg:text-left mx-24">
                        <h1 className="text-5xl font-bold">Podaj nazwę swojej ligi!</h1>
                        <p className="py-6">Będziesz mógł zapisać do niej wszystkie legendy danego sportu i organizować mecze oraz turnieje!</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={async (e) => {
                            e.preventDefault();
                            await createLeague(leagueName, token.current);
                            console.log(leagueName);
                            // window.location.href = '/leagueList';
                        }}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Nazwa ligi</span>
                                </label>
                                <input type="text" placeholder="Nazwa" className="input input-bordered" required onChange={
                                    (e) => {
                                        setLeagueName(e.target.value);
                                    }
                                }/>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Opis ligi</span>
                                </label>
                                <textarea placeholder="Opis ligi" className="textarea h-24 textarea-bordered" required onChange={
                                    (e) => {
                                        console.log(e.target.value)
                                    }
                                }/>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Dodaj</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default AddLeague;

