import {League, Match, Team} from "@/types/types";
import {useEffect, useState} from "react";

function SearchBar(
    props: {
        list: League[] | Team[] | Match[],
        setSearchResults: Function,
        cardsType: string
    }
) {
    const {list, setSearchResults, cardsType} = props;
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        switch (cardsType) {
            case "league":
                let leagueResults = list as League[];
                leagueResults = leagueResults.filter((league) => {
                    return league.name.toLowerCase().includes(searchQuery.toLowerCase());
                });
                setSearchResults(leagueResults);
                break;
            case "team":
                let teamResults = list as Team[];
                teamResults = teamResults.filter((team) => {
                    return team.name?.toLowerCase().includes(searchQuery.toLowerCase());
                });
                setSearchResults(teamResults);
                break;
            case "match":
                let matchResults = list as Match[];
                matchResults = matchResults.filter((match) => {
                    return true;
                });
                setSearchResults(matchResults);
                break;
        }
    }, [list, searchQuery, setSearchResults]);

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

export default SearchBar;