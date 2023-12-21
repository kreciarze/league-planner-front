import {League, Match, Team} from "@/types/types";
import {useRouter} from "next/router";
import {useState} from "react";
import {deleteLeague, deleteMatch, deleteTeam, updateLeague, updateTeam} from "@/endpoints";

function Card(
    props: {
        itemLeague?: League,
        itemTeam?: Team,
        itemMatch?: Match,
        type: string,
        token: string,
        username: string
    }
) {
    const { itemLeague, itemMatch, itemTeam, type, username, token} = props;

    //TODO: Trzeba zrobić style tak, żeby karty zajmowały więcej miejsca, bo w tle jest za dużo białego który bije po oczach, plus są nieresponsywne
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes"/>
            </figure>
            {
                type === "league" && <LeagueCardBody item={itemLeague as League} token={token} username={username}/>
            }
            {
                type === "team" && <TeamCardBody item={itemTeam as Team} token={token} username={username}/>
            }
            {
                type === "match" && <MatchCardBody item={itemMatch as Match} token={token} username={username}/>
            }
        </div>
    )
}

export default Card;

function LeagueCardBody(
    props: {
        item: League,
        token: string,
        username: string
    }
) {
    const {item, token, username} = props;
    const router = useRouter();
    const [editing, setEditing] = useState(false);
    const [newItem, setNewItem] = useState<League>(item);

    return (
        <div className="card-body">
            {!editing && (
                <>
                    <div>
                        <h2 className="card-title">{newItem.name}</h2>
                    </div>
                    <p className={"text-gray-400"}>
                    Właściciel: {item.owner_login === username ? "Ty" : item.owner_login}
                    </p>

                    <div className="card-actions justify-end">
                        {username === item.owner_login &&(<>
                            <button onClick={() => {
                                setEditing(true);
                            }} className={"btn btn-primary"}>
                                Edytuj
                            </button>
                            <button className={"btn btn-error"}
                                    onClick={() => PromptForDeleteLeague(`${newItem.id}`, token)}>
                                Usuń
                            </button>
                            <button className="btn btn-primary" onClick={() => {
                                router.push(`/leagueView/${newItem.id}`)
                            }}>
                                Przejdź do widoku ligi
                            </button>
                        </>)}
                    </div>
                </>
            )}
            {editing && (
                <>
                    <input type={"text"} defaultValue={item.name} onChange={(e) => {
                        setNewItem((prev: League) => {
                            return {
                                ...prev,
                                name: e.target.value
                            }
                        })
                    }
                    } className={
                        "input input-bordered w-full"
                    }/>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={() => {
                            updateLeague(newItem, token).then(() => {
                                setEditing(false);
                            }
                            );
                        }}>
                            Zapisz zmiany
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

function TeamCardBody(
    props: {
        item: Team,
        token: string,
        username: string
    }
) {
    const {item, token, username} = props;
    const router = useRouter();
    const [editing, setEditing] = useState(false);
    const [newItem, setNewItem] = useState<Team>(item);
    return (
        <div className="card-body">
            {!editing && (
                <>
                    <h2 className="card-title">{newItem.name}</h2>
                    <p className={newItem.city === "Not set" ? "opacity-0" : "text-gray-400"}>
                        Drużyna z {newItem.city}
                    </p>
                    <div className="card-actions justify-end">
                    <button onClick={() => {
                            setEditing(true);
                        }
                        } className={"btn btn-primary"}>
                            Edytuj
                        </button>
                        <button className={"btn btn-error"}
                                onClick={() => PromptForDeleteTeam(`${newItem.id}`, token)}>
                            Usuń
                        </button>
                        <button className="btn btn-primary" onClick={() => {
                            router.push(`/leagueView/${newItem.id}`)
                        }}>
                            Przejdź do widoku drużyny
                        </button>
                    </div>
                </>
            )}
            {editing && (
                <>
                    <input type={"text"} defaultValue={newItem.name} onChange={(e) => {
                        setNewItem((prev: Team) => {
                            return {
                                ...prev,
                                name: e.target.value
                            }
                        })
                    }
                    } className={
                        "input input-bordered w-full"
                    }/>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={() => {
                            updateTeam(newItem, token).then(() => {
                                setEditing(false);
                            }
                            );
                        }}>
                            Zapisz zmiany
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

function MatchCardBody(
    props: {
        item: Match,
        token: string,
        username: string
    }
) {
    const {item, token, username} = props;
    const router = useRouter();
    return (
        <div className="card-body">
            <h2 className="card-title">{item.host?.name} vs. {item.visitor?.name}</h2>
            <p className={"text-gray-400"}>
                {item.datetime ? item.datetime : "Nie ustawiono daty"}
            </p>
            <button className={"btn btn-error"} onClick={() => PromptForDeleteMatch(`${item.id}`, token)}>
                Usuń
            </button>
            <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={() => {
                    router.push(`/leagueView/${router.query.id}/matchView/edit/${item.id}`)
                }}>
                    Edytuj
                </button>
                <button className="btn btn-primary">
                    Przejdź do widoku meczu
                </button>
            </div>
        </div>
    )
}

function PromptForDeleteLeague(id: string, token: string | null) {
    if (confirm("Czy na pewno chcesz usunąć ligę?")) {
        deleteLeague(id, token).then((response) => {
            if(response.ok)
                window.location.reload();
            }
        );
    }
}

function PromptForDeleteTeam(id: string, token: string | null) {
    if (confirm("Czy na pewno chcesz usunąć drużynę?")) {
        deleteTeam(id, token).then((response) => {
            if(response.ok)
                window.location.reload();
            }
        );
    }
}

function PromptForDeleteMatch(id: string, token: string | null) {
    if (confirm("Czy na pewno chcesz usunąć mecz?")) {
        deleteMatch(id, token).then((response) => {
                if(response.ok)
                    window.location.reload();
            }
        );
    }
}

