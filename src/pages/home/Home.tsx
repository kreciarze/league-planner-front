import {useEffect, useRef} from "react";
import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";
function Home () {
    let token = useRef<string | null>(null);
    useEffect(() => {
        token.current = document.cookie.split('; ').find(row => row.startsWith('token'))?.split('=')[1] || null;
        if(!token || token.current === null) {
            window.location.href = '/login';
        }
    }, [token]);

    return (
        <nav className={"bg-info-subtle"}>
            <Link href={"/leagues"}>
                <button className={"btn"}>Wszystkie ligi</button>
            </Link>
            <Link href={"/leagues"}>
                <button className={"btn"}>Twoje ligi</button>
            </Link>
            <Link href="/addLeague">
                <button className={"btn"}>Dodaj ligę</button>
            </Link>
            <button className={"btn"} onClick={() => Logout()}>Wyloguj</button>
        </nav>
    )
}

export default Home;

function Logout(token: string | null = null) {
    token = null;
    localStorage.removeItem('token');
    window.location.href = '/';
}
