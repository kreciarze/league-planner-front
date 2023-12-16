import {League, Match, Team} from "@/types/types";
import {useRouter} from "next/router";

function Card(
    props: {
        itemLeague?: League,
        itemTeam?: Team,
        itemMatch?: Match,
        type: string
    }
) {
    const { itemLeague, itemMatch, itemTeam, type} = props;
    const router = useRouter();
    const text = {
        type: props.type === "league" ? "ligi" : props.type === "team" ? "drużyny" : "meczu",
        name: itemLeague ? itemLeague.name : itemMatch ? `${itemMatch.host} vs ${itemMatch.visitor}` : itemTeam?.name
    }
    const itemId = itemLeague?.id || itemMatch?.id || itemTeam?.id;

    //TODO: Trzeba zrobić style tak, żeby karty zajmowały więcej miejsca, bo w tle jest za dużo białego który bije po oczach, plus są nieresponsywne
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes"/>
            </figure>
            <div className="card-body">
                <h2 className="card-title">{text.name}</h2>
                <p className={"text-gray-400"}>
                    {type === "league" && `Właściciel: ${itemLeague?.owner_login}`}
                    {type === "team" && `Liga: ${itemTeam?.owner}`}
                    {type === "match" && `Liga: ${itemMatch?.datetime}`}
                </p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => {router.push(`/leagueView/${itemId}`)}}>
                        Przejdź do widoku {text.type}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card;