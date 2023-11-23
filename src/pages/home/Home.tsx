import {useEffect, useRef} from "react";
import "@/styles/globals.css";
import Link from "next/link";
function Home () {
    let token = useRef<string | null>(null);
    useEffect(() => {
        token.current = localStorage.getItem('token');
        if(!token || token.current === null) {
            window.location.href = '/login';
        }
        console.log(token.current);
    }, [token]);
    if(!token) return null;

    return (
        <div className={"bg-white text-black w-full h-full"}>
            <nav className={"flex justify-evenly"}>
                <div></div>
                <div className={"flex space-x-4"}>
                    <Link href={"/leagues"}>
                        <button>Wszystkie ligi</button>
                    </Link>
                    <Link href={"/leagues"}>
                        <button>Twoje ligi</button>
                    </Link>
                    <Link href="/addLeague">
                        <button>Dodaj ligę</button>
                    </Link>
                    <button onClick={() => Logout()}>Wyloguj</button>
                </div>
            </nav>
        </div>
    )
}

export default Home;

function Logout(token: string | null = null) {
    token = null;
    localStorage.removeItem('token');
    window.location.href = '/';
}
