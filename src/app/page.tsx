import Link from "next/link"
import "./globals.css"

export default function Page () {
    return (
        <div>
        <h1>Witaj w League Planner!</h1>
            <p>League Planner to aplikacja, która pomoże Ci w organizacji lig dowolnych sportów</p>
            <button>
                <Link href="/register">Zarejestruj się</Link>
            </button>
            <button>
                <Link href="/login">Zaloguj się</Link>
            </button>
        </div>
    )

}
