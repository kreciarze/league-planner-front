import {useState} from "react";
import Link from "next/link";
import "@/styles/globals.css";
import {submitRegisterData} from "./registerLogic";

function Register () {
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
    <div>
      <h1>Register</h1>
        <form onSubmit={(e) => submitRegisterData(e, failSetters)}>
            <label>
                <p className={failedRegister ? "opacity-100" : "opacity-0"}>Rejestracja nie powiodła się!</p>
                <p>Nazwa użytkownika</p>
                <input className="text-black" type="text" name="username" placeholder="Wprowadź nazwę"/>
            </label>
            <label>
                <p className={isEmailInvalid ? "opacity-100" : "opacity-0"}>Email jest nieprawidłowy!</p>
                <p>Adres email</p>
                <input className="text-black" type="email" name="email" placeholder="Wprowadź adres email"/>
            </label>
            <label>
                <p className={isPasswordShort ? "opacity-100" : "opacity-0"}>Hasło jest za krótkie!</p>
                <p>Hasło</p>
                <input className="text-black" type="password" name="password" placeholder="Wprowadź hasło"/>
            </label>
            <label>
                <p className={isPasswordNotMatching ? "opacity-100" : "opacity-0"}>Hasła nie są takie same!</p>
                <p>Powtórz hasło</p>
                <input className="text-black" type="password" name="repeatPassword" placeholder="Wprowadź hasło"/>
            </label>
            <div>
                <button type="submit">Zarejestruj</button>
            </div>
            <p> Masz już konto? <Link href="/login">Zaloguj się</Link></p>
        </form>
    </div>
  )
}

export default Register;




