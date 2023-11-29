import { useState } from "react";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';
import styleSheet from "@/styles/styleStrings";
import { submitRegisterData } from "./registerLogic";
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
        <div className={"my-5 py-5"}>
            <div className={styleSheet.centeredContainer + " bg-info-subtle bg-opacity-10 col-lg-6 col-12 py-5 "}>
                <h1 className="text-black">
                    Zarejestruj się
                </h1>
                <form className={styleSheet.form + " w-75"} onSubmit={(e) => submitRegisterData(e, failSetters)}>
                    <label className={"mb-5"}>
                        <p className={failedRegister ? "opacity-100 text-red-600 text-lg mb-6 flex justify-center" : "opacity-0"}>
                            Rejestracja nie powiodła się!
                        </p>
                        <p className="">
                            Nazwa użytkownika
                        </p>
                        <input type="text" name="username" placeholder="Wprowadź nazwę" className={styleSheet.inputSuccess} />
                    </label>
                    <label>
                        <p className="font-semibold text-lg pt-8">
                            Adres email
                        </p>
                        <input type="email" name="email" placeholder="Wprowadź adres email"
                               className={ isEmailInvalid ? styleSheet.inputFailed : styleSheet.inputSuccess } />
                        <p className={isEmailInvalid ? "opacity-100 text-red-600 text-sm" : "opacity-0"}>
                            Email jest nieprawidłowy!
                        </p>
                    </label>
                    <label>
                        <p className="font-semibold text-lg pt-2">
                            Hasło
                        </p>
                        <input type="password" name="password" placeholder="Wprowadź hasło"
                               className={ isPasswordShort ? styleSheet.inputFailed : styleSheet.inputSuccess } />
                        <p className={isPasswordShort ? "opacity-100 text-red-600 text-sm" : "opacity-0"}>
                            Hasło jest za krótkie!
                        </p>
                    </label>
                    <label>
                        <p className="font-semibold text-lg pt-2">
                            Powtórz hasło
                        </p>
                        <input type="password" name="repeatPassword" placeholder="Wprowadź hasło"
                               className={ isPasswordNotMatching ? styleSheet.inputFailed : styleSheet.inputSuccess } />
                        <p className={isPasswordNotMatching ? "opacity-100 text-red-600 text-sm" : "opacity-0"}>
                            Hasła nie są takie same!
                        </p>
                    </label>
                    <button type="submit" className={styleSheet.button}>
                        Zarejestruj
                    </button>
                    <p className="">
                        <span>Masz już konto? </span>
                        <Link href="/login">
                            Zaloguj się
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register;




