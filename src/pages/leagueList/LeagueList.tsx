import Navbar from "../../components/navbar";
import Footer from "@/components/footer/Footer";
import {useRouter} from "next/router";
import { useEffect, useRef, useState} from "react";
import {getLeagues} from "@/endpoints";
import {leagueNavigation} from "@/components/navbar/navigationObjects";

type League = {
    id: number,
    name: string,
    owner: string
};

function LeagueList() {
    let token = useRef<string | null>(null);
    const [leagueList, setLeagueList] = useState<League[]>([]);
    const [searchResults, setSearchResults] = useState<League[]>([]);


    useEffect(() => {
        token.current = document.cookie.split('; ').find(row => row.startsWith('token'))?.split('=')[1] || null;
        if(!token || token.current === null) {
            window.location.href = '/login';
        }
        getLeagues(token.current).then((leagues) => {
            setLeagueList(leagues);
            setSearchResults(leagues);
        });
    }, [token]);

  return (
      <>
          <div className={"min-h-screen"}>
              <Navbar token={token.current} navigation={leagueNavigation} getCurrentPage={"Wszystkie ligi"}/>
              <LeaguesCardsList leagueList={leagueList} searchResults={searchResults}
                                setSearchResults={setSearchResults}/>
          </div>
          <Footer/>
      </>
  );
}

export default LeagueList;

function LeaguesCardsList(
    props: {
        leagueList: League[],
        searchResults: League[],
        setSearchResults: Function
    }
) {
    const {leagueList, searchResults, setSearchResults } = props;

    return (
        <div className={"flex flex-col items-center my-12"}>
            <SearchBar leagueList={leagueList} setSearchResults={setSearchResults}/>
            <ul className={"grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-12"}>
                {
                    searchResults.map((league: League) => {
                        return (
                            <LeagueCard league={league} key={league.id}/>
                        )
                    })
                }
            </ul>
        </div>
    )
}

function LeagueCard(
    props: {
        league: League
    }
) {
    const { league} = props;
    const router = useRouter();
    //TODO: Trzeba zrobić style tak, żeby karty zajmowały więcej miejsca, bo w tle jest za dużo białego który bije po oczach
    return (
        <li className="bg-gray-800 rounded-lg shadow-lg">
            <div className="p-4 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-100">{league.name}</h2>
                    <p className="text-gray-400">Właściciel: {league.owner}</p>
                </div>
                <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                            router.push(`/leagueView/${league.id}`);
                }}>
                    Przejdź do ligi
                </button>
            </div>
        </li>
    )
}

function SearchBar(
    props: {
        leagueList: League[],
        setSearchResults: Function
    }
) {
    const {leagueList, setSearchResults} = props;
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const results = leagueList.filter(league =>
            league.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(results);

    },);

    return (
        <div className="flex items-center justify-center w-1/4 px-12 py-8 bg-gray-800 text-gray-100 rounded-lg shadow-lg">
            <div className="flex items-center justify-center w-full">
                <input type="text" placeholder="Wyszukaj ligę" className="w-full rounded p-2 text-black" onChange={
                    (e) => {
                        setSearchQuery(e.target.value);
                    }
                }/>
            </div>
        </div>
    )
}

