import {useState} from "react";
import Link from "next/link";
import "@/styles/globals.css";

function Login(){
    const [loginFailed, setLoginFailed] = useState(false);

    return(
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-800 text-gray-100">
            <h1 className="font-bold text-3xl sm:text-4xl">
                Login
            </h1>
            <p className="text-red-600 mt-3">
                Nieprawidłowa nazwa użytkownika lub hasło!
            </p>
            <form onSubmit={(e) => submitLoginCredentials(e, setLoginFailed)} 
            className="flex flex-col bg-gray-700 rounded p-12 mt-6">
                <label>
                    <p className="font-semibold text-lg">
                        Nazwa użytkownika
                    </p>
                    <input type="text" name="username" placeholder="Wprowadź nazwę"
                    className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2 text-black"/>
                </label>
                <label>
                    <p className="font-semibold text-lg pt-2">
                        Hasło
                    </p>
                    <input type="password" name="password" placeholder="Wprowadź hasło"
                    className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2 text-black"/>
                </label>
                <button type="submit" className="flex items-center justify-center h-12 px-6 w-64 bg-violet-600 mt-12 rounded font-semibold text-lg text-white hover:bg-violet-700">
                    Zaloguj
                </button>
                <div>
                    <p className="flex mt-6 justify-center text-md">
                        Nie masz konta?
                        <Link href="/register" className="pl-2 text-violet-400 hover:text-purple-400">
                            Zarejestruj się
                        </Link>
                    </p>
                </div>
            </form>
       </div>
    )
}

export default Login;

function submitLoginCredentials(e: React.FormEvent<HTMLFormElement>, setLoginFailed: (arg0: boolean) => void) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const body = JSON.stringify({
        username: data.username,
        password: data.password
    })
    fetch('http://localhost:8080/login/', {
        method: 'POST',
        body: body,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
        .then(response => {
            if (response.status === 200) {
                window.location.href = '/home';
            } else {
                setLoginFailed(true);
            }
        })
        .catch(error => {
            setLoginFailed(true);
        });
}