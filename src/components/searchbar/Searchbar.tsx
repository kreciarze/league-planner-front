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
                leagueResults = leagueResults.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
                setSearchResults(leagueResults);
                break;
            case "team":
                let teamResults = list as Team[];
                teamResults = teamResults.filter((team) => {
                    return team.name?.toLowerCase().includes(searchQuery.toLowerCase());
                });
                teamResults = teamResults.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
                setSearchResults(teamResults);
                break;
            case "match":
                let matchResults = list as Match[];
                matchResults = matchResults.filter((match) => {
                    return (
                        match.host.name.toLowerCase().includes(searchQuery.toLowerCase())
                    ) || (
                        match.visitor.name.toLowerCase().includes(searchQuery.toLowerCase())
                    ) || (
                        match.datetime?.includes(searchQuery)
                    );
                });
                matchResults = matchResults.sort((a, b) => {
                    return a.datetime?.localeCompare(b.datetime);
                });
                setSearchResults(matchResults);
                break;
        }
    }, [list, searchQuery, setSearchResults]);

    return (
        <div className="flex items-center justify-center w-3/4 md:w-1/2 2xl:w-1/4 px-12 py-8 bg-gray-800 text-gray-100 rounded-lg shadow-lg">
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