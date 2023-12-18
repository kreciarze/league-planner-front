import Navbar from "@/components/navbar";
import useToken from "@/hooks/useToken";
import {teamNavigation} from "@/components/navbar/navigationObjects";
import Footer from "@/components/footer/Footer";
import InputField from "@/components/inputField";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {getMatchDetails, updateMatch} from "@/endpoints";
import {Match} from "@/types/types";

function EditMatch() {
    const {token} = useToken();
    const router = useRouter();
    const leagueId = `${router.query.id}`;
    const matchId = `${router.query.matchId}`
    const host = "";
    const visitor = "";
    const [hostScore, setHostScore] = useState(0);
    const [visitorScore, setVisitorScore] = useState(0);

    useEffect(() => {
        if(!matchId)
            router.push(`/leagueView/${leagueId}/`)
        getMatchDetails(matchId, token.current).then((data: Match) => {
            setHostScore(data.host_score);
            setVisitorScore(data.visitor_score);
        })
    }, []);

    return (
      <>
          <Navbar token={token.current} navigation={teamNavigation} />
          <div className={"min-h-screen"}>
              <div className="card-body">
                  <InputField type={"number"} placeholder={"0"} onChange={setHostScore} required={true} label={`Wynik gospodarza ${host}`} value={`${hostScore}`} />
                  <InputField type={"number"} placeholder={"0"} onChange={setVisitorScore} required={true} label={`Wynik gościa ${visitor}`} value={`${visitorScore}`} />
                  <button className="btn btn-primary" onClick={()=>{
                      updateMatch(matchId, hostScore, visitorScore, token.current).then(() => {
                          router.push(`/leagueView/${leagueId}/`)
                      })
                  }}>
                      Zapisz wynik meczu
                  </button>
              </div>
          </div>
          <Footer/>
      </>
    )
}

export default EditMatch;