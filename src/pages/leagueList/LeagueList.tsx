import Navbar from "@/components/navbar";
import Footer from "@/components/footer/Footer";
import {useRouter} from "next/router";
import {useEffect, useRef, useState} from "react";
import {getLeagues} from "@/endpoints";

type League = {

};

function LeagueList() {
    let token = useRef<string | null>(null);
    const [leagueList, setLeagueList] = useState<League[]>([]);

    useEffect(() => {
        token.current = document.cookie.split('; ').find(row => row.startsWith('token'))?.split('=')[1] || null;
        if(!token || token.current === null) {
            window.location.href = '/login';
        }
        getLeagues(token.current).then((leagues) => {
                console.log(JSON.stringify(leagues));
            }
        );
    }, [token]);

  return (
      <>
          <Navbar token={token.current} getCurrentPage={"Wszystkie ligi"}/>
          <Footer/>
      </>
  );
}

export default LeagueList;