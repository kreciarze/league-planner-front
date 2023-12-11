import Navbar from "../../../components/navbar";
import Footer from "@/components/footer/Footer";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { getLeagues } from "@/endpoints";
import { League, Match, Team } from "@/types/types";
import CardsList from "@/components/cardsList/";
import useListModel from "@/hooks/useListModel";


function ListModel() {
    let token = useRef<string | null>(null);
    let router = useRouter();
    let { navigation, listGetter } = useListModel(router.query.slug as string);
    const [itemsList, setItemsList] = useState<League[] | Team[] | Match[]>([]);
    const [searchResults, setSearchResults] = useState<League[]>([]);


    useEffect(() => {
        token.current = document.cookie.split('; ').find(row => row.startsWith('token'))?.split('=')[1] || null;
        if(!token || token.current === null) {
            window.location.href = '/loginView';
        }
        listGetter(token.current).then((items) => {
            console.log(items);
            setItemsList(items);
            setSearchResults(items);
        });
    }, [token, listGetter]);

  return (
      <>
          <div className={"min-h-screen"}>
              <Navbar token={token.current} navigation={navigation} getCurrentPage={"Wszystkie ligi"}/>
              <CardsList list={itemsList} searchResults={searchResults}
                                setSearchResults={setSearchResults}/>
          </div>
          <Footer/>
      </>
  );
}

export default ListModel;
