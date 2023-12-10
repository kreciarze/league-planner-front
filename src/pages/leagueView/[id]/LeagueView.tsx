import {useRouter} from "next/router";
import useToken from "@/hooks/useToken";
import {teamNavigation} from "@/components/navbar/navigationObjects";
import Navbar from "../../../components/navbar";

function LeagueView(){
    const router = useRouter();
    let token = useToken();

    return (
        <div>
            <Navbar token={token.current} navigation={teamNavigation} getCurrentPage={"Strona główna"}/>
            <h1>LeagueView {router.query.id}</h1>
        </div>
    )
}

export default LeagueView;