import {useState} from "react";
import Link from "next/link";
import { login } from "@/endpoints";
import 'bootstrap/dist/css/bootstrap.min.css';
import styleSheet from "@/styles/styleStrings";
import "@/styles/globals.css";

function Login(){
    const [loginFailed, setLoginFailed] = useState(false);

    return(
        <div className={"py-5 my-5"}>
        <div className={styleSheet.centeredContainer + " bg-info-subtle  w-50 py-5"}>
            <h1 className="">Login</h1>
            <p className={loginFailed ? " opacity-100" : " opacity-0"}>Nieprawidłowa nazwa użytkownika lub hasło!</p>
            <form className={styleSheet.form + " w-75"}
                onSubmit={(e) => login(e, setLoginFailed)}>
                <label>
                    <p>Nazwa użytkownika</p>
                    <input className={styleSheet.inputSuccess} type="text" name="username" placeholder="Wprowadź nazwę"/>
                </label>
                <label>
                    <p>Hasło</p>
                    <input className={styleSheet.inputSuccess} type="password" name="password" placeholder="Wprowadź hasło"/>
                </label>
                <button type="submit" className={styleSheet.button}>Zaloguj</button>
                <p> Nie masz konta? <Link href="/register">Zarejestruj się</Link></p>
            </form>
       </div>
        </div>
    )
}

export default Login;

