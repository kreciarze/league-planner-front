import {useEffect, useRef} from "react";

function Home () {
    let token = useRef<string | null>(null);
    useEffect(() => {
        token.current = localStorage.getItem('token');
        if(!token) {
            window.location.href = '/login';
        }
    }, []);
    if(!token) return null;

    return (
        <div>
            <h1>Witaj w League Planner!</h1>
            <p>League Planner to aplikacja, która pomoże Ci w organizacji lig dowolnych sportów</p>
        </div>
    )
}

export default Home;