import {useEffect} from "react";

function Home () {
    let token;
    useEffect(() => {
        token = localStorage.getItem('token');
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