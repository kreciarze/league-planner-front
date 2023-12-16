import Navbar from "../../components/navbar";
import Footer from "@/components/footer/Footer";
import { useEffect, useState } from "react";
import { League } from "@/types/types";
import CardsList from "@/components/cardsList";
import useToken from "@/hooks/useToken";
import {getLeagues} from "@/endpoints";
import {leagueNavigation} from "@/components/navbar/navigationObjects";

function ListLeagues() {
    let token = useToken();
    const [itemsList, setItemsList] = useState<League[]>([]);
    const [searchResults, setSearchResults] = useState<League[]>([]);


    useEffect(() => {
        getLeagues(token.current).then((items) => {
            setItemsList(items);
            setSearchResults(items);
        });
    }, [token]);

  return (
      <>
          <div className={"min-h-screen"}>
              <Navbar token={token.current} navigation={leagueNavigation} getCurrentPage={"Wszystkie ligi"}/>
              <CardsList list={itemsList} searchResults={searchResults}
                                setSearchResults={setSearchResults} cardsType={"league"}/>
          </div>
          <Footer/>
      </>
  );
}

export default ListLeagues;
