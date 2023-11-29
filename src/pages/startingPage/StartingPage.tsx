import Link from "next/link";
import styleSheet from "@/styles/styleStrings";
import Image from "next/image";
import "./background.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';

function StartingPage(){

    return (
        <>
            <div className="bg-image">
                <Image src={"/background.jpg"}
                    alt="Picture"
                    width={1920}
                    height={1080}
                />
            </div>
            <div className="container-fluid d-flex flex-column justify-content-center align-items-center transition-all duration-500 ease-in-out ">
                <div className="">
                    <h1 className="text-center">
                        Witaj w League Planner!
                    </h1>
                    <p className="">
                        League Planner to aplikacja, która pomoże Ci w organizacji lig dowolnych sportów
                    </p>
                    <div className="d-flex justify-content-evenly">
                        <button className={styleSheet.button}>
                            <Link className={styleSheet.link} href="/register">Zarejestruj się</Link>
                        </button>
                        <button className={styleSheet.button}>
                            <Link className={styleSheet.link} href="/login">Zaloguj się</Link>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StartingPage;