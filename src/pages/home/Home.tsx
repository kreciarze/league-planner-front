import {useEffect, useRef} from "react";
import "@/styles/globals.css";
import Link from "next/link";
import Navbar from "@/components/navbar";
function Home () {
    let token = useRef<string | null>(null);
    useEffect(() => {
        token.current = document.cookie.split('; ').find(row => row.startsWith('token'))?.split('=')[1] || null;
        if(!token || token.current === null) {
            window.location.href = '/login';
        }
    }, [token]);



    return (
        <>
            <Navbar token={token.current}/>

        </>
    )
}

export default Home;

