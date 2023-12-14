import useToken from "@/hooks/useToken";
import {useEffect, useState} from "react";
import {League} from "@/types/types";
import {getLeagues, getMatches, getTeams} from "@/endpoints";
import {useRouter} from "next/router";
import Navbar from "@/components/navbar";
import {leagueNavigation, teamNavigation} from "@/components/navbar/navigationObjects";
import CardsList from "@/components/cardsList/CardsList";
import Footer from "@/components/footer/Footer";

function ListInLeague() {
    const router = useRouter();
    const leagueId = router.query.id as string;
    const itemName = router.query.item as string;
    const token = useToken();
    const [itemsList, setItemsList] = useState<League[]>([]);
    const [searchResults, setSearchResults] = useState<League[]>([]);
    const getItems = itemName === "team" ? getTeams : getMatches;

    useEffect(() => {
        getItems(token.current, leagueId).then((items) => {
            console.log(items);
            setItemsList(items.results);
            setSearchResults(items.results);
        });
    }, [token, getItems]);

  return (
      <>
          <div className={"min-h-screen"}>
              <Navbar token={token.current} navigation={teamNavigation} getCurrentPage={"Wszystkie ligi"}/>
              <CardsList list={itemsList} searchResults={searchResults}
                         setSearchResults={setSearchResults} />
          </div>
          <Footer/>
      </>
  );
}

export default ListInLeague;