import {breadcrumbItem} from "@/types/types";

export const leagueNavigation = [
    { name: 'Strona główna', href: '/homeView'},
    { name: 'Wszystkie ligi', href: '/listLeagues'},
    { name: 'Dodaj ligę', href: '/addNewLeague'},
    { name: 'Wyloguj', href: '/', onClick: (token: string) => Logout(token) },
]

export const teamNavigation = [
    { name: 'Strona główna', href: '/homeView'},
    { name: 'Szczegóły ligi', href: '/leagueView/[id]'},
    { name: 'Lista drużyn', href: '/leagueView/[id]/listInLeague/team'},
    { name: 'Lista meczów', href: '/leagueView/[id]/listInLeague/match'},
    { name: 'Dodaj drużynę', href: '/leagueView/[id]/addToLeague/team'},
    { name: 'Dodaj mecz', href: '/leagueView/[id]/addToLeague/match'},
    { name: 'Wyloguj', href: '/', onClick: (token: string) => Logout(token) },
]

function Logout(token: string | null) {
    token = null;
    //remove cookie token
    document.cookie = "";
}

export function MapBreadcrumbs(item: string) {
    let path = item.split("/");
    let breadcrumbs: breadcrumbItem[] = [];
    const leagueView = path.includes("leagueView") ? "Liga" + " " + path[path.indexOf("leagueView") + 1] : "";
    const addLeague = path.includes("addNewLeague") ? "Dodaj nową ligę" : "";
    const listLeagues = path.includes("listLeagues") ? "Wszystkie ligi" : "";
    const listInLeague = path.includes("listInLeague") ? "Lista " + (path[path.indexOf("listInLeague") + 1] === "team" ? "drużyn" : "meczów") : "";
    const addToLeague = path.includes("addToLeague") ? "Dodaj " + (path[path.indexOf("addToLeague") + 1] === "team" ? "drużynę" : "mecz") : "";

    path[path.indexOf("leagueView")] = leagueView;
    path[path.indexOf("addNewLeague")] = addLeague;
    path[path.indexOf("listLeagues")] = listLeagues;
    path[path.indexOf("listInLeague")] = listInLeague;
    path[path.indexOf("addToLeague")] = addToLeague;

    path = path.filter((item) => item.match(/[a-zA-Z]/) && item !== "match" && item !== "team" && item !== "edit")
    if(path.length > 0 && path[0] !== "Strona główna" && path[0] !== "homeView")
        path.unshift("Strona główna");
    breadcrumbs = MapHrefs(path);

    return breadcrumbs;
}

function MapHrefs(path: string[]) {
    let breadcrumbs: breadcrumbItem[] = [];

    path.forEach((item) => {
        let href = "";
        if(item === "Strona główna")
            href = "/homeView";
        else if(item.includes("Liga")){
            let id = item.split(" ")[1];
            href = `/leagueView/${id}`;
        }
        else if(item === "Wszystkie ligi")
            href = "/listLeagues";
        else if(item === "Dodaj nową ligę")
            href = "/addNewLeague";
        else if(item === "Lista drużyn"){
            href = "/leagueView/[id]/listInLeague/team";
            href.replace("[id]", path[path.indexOf("Liga") + 1]);
        }
        else if(item === "Lista meczów"){
            let id = path[path.indexOf("Liga") + 1];
            href = `/leagueView/${id}/listInLeague/match`;
        }
        else if(item === "Dodaj drużynę"){
            href = "/leagueView/[id]/addToLeague/team";
            href.replace("[id]", path[path.indexOf("Liga") + 1]);
        }
        else if(item === "Dodaj mecz"){
            href = "/leagueView/[id]/addToLeague/match";
            href.replace("[id]", path[path.indexOf("Liga") + 1]);
        }
        else if(item === "Edytuj"){
            href = "/leagueView/[id]/matchView/edit/[matchId]";
            href.replace("[id]", path[path.indexOf("Liga") + 1]);
            href.replace("[matchId]", path[path.indexOf("mecz") + 1]);

        }
        else if(item === "Wyloguj")
            href = "/";
        else
            href = "#";

        breadcrumbs.push({name: item, href: href});
    })
    return breadcrumbs;
}