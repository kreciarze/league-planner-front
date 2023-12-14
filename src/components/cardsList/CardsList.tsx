'use client';
import {League, Team, Match} from "@/types/types";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {it} from "node:test";

export default function LeaguesCardsList(
    props: {
        list: League[] | Team[] | Match[],
        searchResults: League[] | Team[] | Match[],
        setSearchResults: Function
    }
) {
    const {list, searchResults, setSearchResults } = props;
    return (
        <div className={"flex flex-col items-center my-12"}>
            <SearchBar list={list} setSearchResults={setSearchResults}/>
            <ul className={"grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-12"}>
                { searchResults.length > 0 &&
                    searchResults?.map((item: League | Team | Match) => {
                        return (
                            <Card item={item} key={item.id} />
                    )
                    })
                }
            </ul>
        </div>
)}

function Card(
    props: {
        item: League | Team | Match
    }
) {
    const { item} = props;
    const router = useRouter();

    //TODO: Trzeba zrobić style tak, żeby karty zajmowały więcej miejsca, bo w tle jest za dużo białego który bije po oczach, plus są nieresponsywne
    return (
        <li className="bg-gray-800 rounded-lg shadow-lg">
            <div className="p-4 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-100">
                        {item.name ? item.name : item.homeTeam + " vs " + item.awayTeam}
                    </h2>
                </div>
                <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                    router.push(`/leagueView/${item.id}`);
                }}>
                Przejdź do ligi
                </button>
            </div>
        </li>
        )
}

function SearchBar(
    props: {
        list: League[] | Team[] | Match[],
        setSearchResults: Function
    }
) {
    const {list, setSearchResults} = props;
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const results = list.filter(item =>
            Object.keys(item)[1]?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(results);
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

