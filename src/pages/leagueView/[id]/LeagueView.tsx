'use client';
import {useRouter} from "next/router";
import useToken from "@/hooks/useToken";
import {teamNavigation} from "@/components/navbar/navigationObjects";
import Navbar from "../../../components/navbar";
import Footer from "@/components/footer/Footer";

function LeagueView(){
    const router = useRouter();
    let token = useToken();


    return (
        <div>
            <Navbar token={token.current} navigation={teamNavigation} getCurrentPage={"Strona główna"}/>
            {/*TODO: potrzebujemy tu jakiegoś contentu, czegokolwiek w sumie by*/}
            <main className={"flex flex-col items-center justify-center min-h-screen"}> LeagueView {router.query.id}</main>
            <Footer/>
        </div>
    )
}

export default LeagueView;