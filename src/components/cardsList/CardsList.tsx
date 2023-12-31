import {League, Team, Match, Season} from "@/types/types";
import Card from "@/components/card";
import SearchBar from "@/components/searchbar";
import useToken from "@/hooks/useToken";

export default function LeaguesCardsList(
    props: {
        list: League[] | Team[] | Match[] | Season[],
        searchResults: League[] | Team[] | Match[] | Season[],
        setSearchResults: Function,
        cardsType: string,
    }
) {
    const {list, searchResults, setSearchResults, cardsType } = props;
    const {token, username} = useToken();
    return (
        <div className={"flex flex-col items-center my-12"}>
            <SearchBar list={list} setSearchResults={setSearchResults} cardsType={cardsType}/>
            <ul className={"grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 my-12"}>
                { searchResults?.length > 0 &&
                    searchResults?.map((item: League | Team | Match | Season) => {
                        switch (cardsType) {
                            case "league":
                                return <Card key={item.id} itemLeague={item as League} type={"league"} token={token.current ?? ""} username={username.current ?? ""}/>;
                            case "team":
                                return <Card key={item.id} itemTeam={item as Team} type={"team"} token={token.current ?? ""} username={username.current ?? ""}/>;
                            case "match":
                                return <Card key={item.id} itemMatch={item as Match} type={"match"} token={token.current ?? ""} username={username.current ?? ""}/>;
                            case "season":
                                return <Card key={item.id} itemSeason={item as Season} type={"season"} token={token.current ?? ""} username={username.current ?? ""}/>;
                        }
                    })
                }
            </ul>
        </div>
)}

