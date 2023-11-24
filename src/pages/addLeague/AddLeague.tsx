import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { createLeague } from "@/endpoints";
import {useEffect, useRef, useState} from "react";

function AddLeague(){
    let token = useRef<string | null>(null);
    useEffect(() => {
        token.current = document.cookie.split('=')[1];
        if(!token || token.current === null) {
            window.location.href = '/login';
        }
        console.log(token.current);
    }, []);

    const [leagueName, setLeagueName] = useState("");
    return (
        <div className={""}>
            <h1>Dodaj ligę</h1>
            <input type="text" name="leagueName" placeholder="Wprowadź nazwę ligi" onChange={(e) => setLeagueName(e.target.value)}/>
            <button onClick={
                () => {
                    createLeague(leagueName, token.current).then();
                }
            } className={"block"}
            >dodaj ligę
            </button>
        </div>
    )
}

export default AddLeague;

