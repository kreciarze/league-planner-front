import Link from "next/link";
import "./background.jpg";
import styleSheet from "@/styles/styleStrings";
function StartingPage(){

    return (
        <>
            <div className="space-y-12 bg-gray-800 text-gray-100 min-h-screen">
                <div className="flex flex-col items-center px-4 py-40 mx-auto text-center md:px-10 lg:px-32 xl:max-w-4xl">
                    <h1 className="text-4xl font-bold sm:text-5xl">
                        Witaj w League Planner!
                    </h1>
                    <p className="px-8 mt-8 mb-12 text-lg">
                        League Planner to aplikacja, która pomoże Ci w organizacji lig dowolnych sportów
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className={styleSheet.purpleButton}>
                            <Link href="/register">Zarejestruj się</Link>
                        </button>
                        <button className={styleSheet.purpleButton}>
                            <Link href="/login">Zaloguj się</Link>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StartingPage;