import {useState} from "react";
import Link from "next/link";
import { Login } from "@/endpoints";
import "@/styles/globals.css";
import styleSheet from "@/styles/styleStrings";

function LoginView(){
    const [loginFailed, setLoginFailed] = useState(false);

    return(
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-800 text-gray-100">
            <h1 className="font-bold text-3xl sm:text-4xl">
                Login
            </h1>
            {loginFailed && (
                <p className="text-red-600 mt-3">
                    Nieprawidłowa nazwa użytkownika lub hasło!
                </p>
            )}
            <form onSubmit={(e) => Login(e, setLoginFailed)}
                  className="flex flex-col bg-gray-700 rounded p-12 mt-6">
                <label>
                    <p className="font-semibold text-lg p-2">
                        Nazwa użytkownika
                    </p>
                    <input type="text" name="username" placeholder="Wprowadź nazwę"
                           className={styleSheet.textInput + " w-full my-8"}/>
                </label>
                <label>
                    <p className="font-semibold text-lg pt-2">
                        Hasło
                    </p>
                    <input type="password" name="password" placeholder="Wprowadź hasło"
                           className={styleSheet.textInput + " w-full my-8"}/>
                </label>
                <button type="submit" className={styleSheet.purpleButton}>
                    Zaloguj
                </button>
                <div>
                    <p className="flex mt-6 justify-center text-md">
                        Nie masz konta?
                        <Link href="/registerView" className="pl-2 text-violet-400 hover:text-purple-400">
                            Zarejestruj się
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default LoginView;

