import { useState } from "react";
import Link from "next/link";
import styleSheet from "@/styles/styleStrings";
import submitRegisterData from "./registerLogic";
import "@/styles/globals.css";

function Register() {
    const [failedRegister, setFailedRegister] = useState(false);
    const [isPasswordShort, setIsPasswordShort] = useState(false);
    const [isPasswordNotMatching, setIsPasswordNotMatching] = useState(false);
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const failSetters = {
        setFailedRegister,
        setIsPasswordShort,
        setIsPasswordNotMatching,
        setIsEmailInvalid
    }

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-800 text-gray-100">
            <h1 className="font-bold text-3xl sm:text-4xl">
                Register
            </h1>
            <form onSubmit={(e) => submitRegisterData(e, failSetters)}
                  className="flex flex-col bg-gray-700 rounded p-12 mt-6">
                <label>
                    <p className={failedRegister ? "opacity-100 text-red-600 text-lg mb-6 flex justify-center" : "opacity-0"}>
                        Rejestracja nie powiodła się!
                    </p>
                    <p className="font-semibold text-lg">
                        Nazwa użytkownika
                    </p>
                    <input type="text" name="username" placeholder="Wprowadź nazwę"
                           className={styleSheet.textInput} />
                </label>
                <label>
                    <p className="font-semibold text-lg pt-8">
                        Adres email
                    </p>
                    <input type="email" name="email" placeholder="Wprowadź adres email"
                           className={styleSheet.textInput} />
                    <p className={isEmailInvalid ? "opacity-100 text-red-600 text-sm" : "opacity-0"}>
                        Email jest nieprawidłowy!
                    </p>
                </label>
                <label>
                    <p className="font-semibold text-lg pt-2">
                        Hasło
                    </p>
                    <input type="password" name="password" placeholder="Wprowadź hasło"
                           className={styleSheet.textInput} />
                    <p className={isPasswordShort ? "opacity-100 text-red-600 text-sm" : "opacity-0"}>
                        Hasło jest za krótkie!
                    </p>
                </label>
                <label>
                    <p className="font-semibold text-lg pt-2">
                        Powtórz hasło
                    </p>
                    <input type="password" name="repeatPassword" placeholder="Wprowadź hasło"
                           className={styleSheet.textInput} />
                    <p className={isPasswordNotMatching ? "opacity-100 text-red-600 text-sm" : "opacity-0"}>
                        Hasła nie są takie same!
                    </p>
                </label>
                <button type="submit" className={styleSheet.purpleButton}>
                    Zarejestruj
                </button>
                <p className="flex mt-6 justify-center text-md">
                    Masz już konto?
                    <Link href="/login" className="pl-2 text-violet-400 hover:text-purple-400">
                        Zaloguj się
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Register;




