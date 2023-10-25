import Link from "next/link"
import "@/styles/globals.css";

export default function Page () {
    return (
        <div className="space-y-12 bg-gray-800 text-gray-100 min-h-screen">
            <div className="flex flex-col items-center px-4 py-40 mx-auto text-center md:px-10 lg:px-32 xl:max-w-4xl">
                <h1 className="text-4xl font-bold sm:text-5xl">
                Witaj w League Planner!
                </h1>
                <p className="px-8 mt-8 mb-12 text-lg">
                    League Planner to aplikacja, która pomoże Ci w organizacji lig dowolnych sportów
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <button className="px-8 py-3 m-2 text-lg font-semibold rounded bg-violet-400 text-gray-900 hover:bg-violet-600 hover:text-white">
                        <Link href="/register">Zarejestruj się</Link>
                    </button>
                    <button className="px-8 py-3 m-2 text-lg font-semibold rounded bg-violet-400 text-gray-900 hover:bg-violet-600 hover:text-white">
                        <Link href="/login">Zaloguj się</Link>
                    </button>
                </div>
            </div>
        </div>
    )

}
