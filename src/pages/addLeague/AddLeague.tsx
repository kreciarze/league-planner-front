import "@/styles/globals.css";
import { createLeague } from "@/endpoints";
import {useEffect, useRef, useState} from "react";
import styleSheet from "@/styles/styleStrings";

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
        <div className={styleSheet.centeredContainer + " col-8 my-5 py-5 px-5 bg-info-subtle"}>
            <h1>Dodaj ligę</h1>
            <input type="text" name="leagueName" placeholder="Wprowadź nazwę ligi" onChange={(e) => setLeagueName(e.target.value)}/>
            <button className={"btn btn-primary w-100 my-3"}
                onClick={
                () => {
                    createLeague(leagueName, token.current);
                }
            }>
            Dodaj ligę
            </button>
        </div>
    )
}

export default AddLeague;

