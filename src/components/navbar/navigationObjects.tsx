import {breadcrumbItem} from "@/types/types";

export const leagueNavigation = [
    { name: 'Strona główna', href: '/homeView'},
    { name: 'Wszystkie ligi', href: '/listLeagues'},
    { name: 'Dodaj ligę', href: '/addNewLeague'},
    { name: 'Wyloguj', href: '/', onClick: (token: string) => Logout(token) },
]

export const teamNavigation = [
    { name: 'Strona główna', href: '/homeView'},
    { name: 'Lista drużyn', href: '/leagueView/[id]/listInLeague/team'},
    { name: 'Lista meczów', href: '/leagueView/[id]/listInLeague/match'},
    { name: 'Lista sezonów', href: '/leagueView/[id]/listInLeague/season'},
    { name: 'Dodaj drużynę', href: '/leagueView/[id]/addToLeague/team'},
    { name: 'Dodaj mecz', href: '/leagueView/[id]/addToLeague/match'},
    { name: 'Dodaj sezon', href: '/leagueView/[id]/addToLeague/season'},
    { name: 'Tabela wyników', href: '/leagueView/[id]/table'},
    { name: 'Wyloguj', href: '/', onClick: (token: string) => Logout(token) },
]

function Logout(token: string | null) {
    token = null;
    //remove cookie token
    document.cookie = "";
}



