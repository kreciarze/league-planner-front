import {useState, FormEvent} from "react";
import Link from "next/link";
import "@/styles/globals.css";
import { login } from "@/endpoints";

function Login(){
    const [loginFailed, setLoginFailed] = useState(false);

    return(
        <div>
            <h1 className="">Login</h1>
            <p className="text-white">Nieprawidłowa nazwa użytkownika lub hasło!</p>
            <form onSubmit={(e) => login(e, setLoginFailed)}>
                <label>
                    <p>Nazwa użytkownika</p>
                    <input className={"text-black"} type="text" name="username" placeholder="Wprowadź nazwę"/>
                </label>
                <label>
                    <p>Hasło</p>
                    <input className={"text-black"} type="password" name="password" placeholder="Wprowadź hasło"/>
                </label>
                <button type="submit">Zaloguj</button>
                <p> Nie masz konta? <Link href="/register">Zarejestruj się</Link></p>
            </form>
       </div>
    )
}

export default Login;

