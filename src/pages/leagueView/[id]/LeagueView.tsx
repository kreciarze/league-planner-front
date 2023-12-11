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
            <h1>LeagueView {router.query.id}</h1>
            <Footer/>
        </div>
    )
}

export default LeagueView;