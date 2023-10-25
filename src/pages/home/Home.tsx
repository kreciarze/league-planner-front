import {useEffect, useRef} from "react";
import "@/styles/globals.css";
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
        <div className="space-y-12 bg-gray-800 text-gray-100 min-h-screen">
            <div className="flex flex-col items-center px-4 py-40 mx-auto text-center md:px-10 lg:px-32 xl:max-w-4xl">
                <h1 className="text-4xl font-bold sm:text-5xl">
                Witaj w League Planner!
                </h1>
                <p className="px-8 mt-8 mb-12 text-lg">
                    League Planner to aplikacja, która pomoże Ci w organizacji lig dowolnych sportów
                </p>
            </div>
        </div>
    )
}

export default Home;