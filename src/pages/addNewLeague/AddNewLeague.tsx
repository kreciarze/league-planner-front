import "@/styles/globals.css";
import {useState} from "react";
import Navbar from "../../components/navbar";
import Footer from "@/components/footer/Footer";
import useToken from "@/hooks/useToken/UseToken";
import {useRouter} from "next/router";
import {League} from "@/types/types";
import {leagueNavigation} from "@/components/navbar/navigationObjects";
import {createLeague} from "@/endpoints";
import InputField from "@/components/inputField";


function AddNewLeague(){
    const token = useToken();
    const [leagueName, setLeagueName] = useState<League>({} as League);
    const router = useRouter();

    return (
        <>
            <Navbar token={token.current} navigation={leagueNavigation} getCurrentPage={"Strona główna"}/>
            <div className="hero min-h-screen bg-base-200">
                <div className="flex flex-col items-center lg:flex-row-reverse">
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body">
                            <InputField type={"text"} placeholder={"Nazwa ligi"} onChange={setLeagueName} label={"Nazwa ligi"} value={leagueName.name} required={true} />
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Opis ligi</span>
                                </label>
                                <textarea placeholder="Opis ligi" className="textarea h-24 textarea-bordered"/>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary" onClick={
                                    (e) => {
                                        e.preventDefault();
                                        createLeague(leagueName, token.current).then(() => {
                                            router.push('/listLeagues');
                                        }
                                        );
                                    }
                                }>Dodaj
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default AddNewLeague;
