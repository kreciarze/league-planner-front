import {League, Team, Match} from "@/types/types";
import Card from "@/components/card";
import SearchBar from "@/components/searchbar";

export default function LeaguesCardsList(
    props: {
        list: League[] | Team[] | Match[],
        searchResults: League[] | Team[] | Match[],
        setSearchResults: Function,
        cardsType: string
    }
) {
    const {list, searchResults, setSearchResults, cardsType } = props;
    console.log(list)
    return (
        <div className={"flex flex-col items-center my-12"}>
            <SearchBar list={list} setSearchResults={setSearchResults} cardsType={cardsType}/>
            <ul className={"grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-12"}>
                { searchResults.length > 0 &&
                    searchResults?.map((item: League | Team | Match) => {
                        switch (cardsType) {
                            case "league":
                                return <Card key={item.id} itemLeague={item as League} type={"league"}/>
                            case "team":
                                return <Card key={item.id} itemTeam={item as Team} type={"team"}/>
                            case "match":
                                return <Card key={item.id} itemMatch={item as Match} type={"match"}/>
                        }
                    })
                }
            </ul>
        </div>
)}

