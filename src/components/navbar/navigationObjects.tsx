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
    { name: 'Lista zawodników', href: '/leagueView/[id]/playerList'},
    { name: 'Dodaj drużynę', href: '/leagueView/[id]/addToLeague/team'},
    { name: 'Dodaj mecz', href: '/leagueView/[id]/addToLeague/match'},
    { name: 'Wyloguj', href: '/', onClick: (token: string) => Logout(token) },
]
function Logout(token: string | null) {
    token = null;
    //remove cookie token
    document.cookie = "";
}
