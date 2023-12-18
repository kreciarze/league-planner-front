export const leagueNavigation = [
    { name: 'Strona główna', href: '/homeView'},
    { name: 'Wszystkie ligi', href: '/listLeagues'},
    { name: 'Dodaj ligę', href: '/addNewLeague'},
    { name: 'Wyloguj', href: '/', onClick: (token: string) => Logout(token) },
]

export const teamNavigation = [
    { name: 'Strona główna', href: '/homeView'},
    { name: 'Lista drużyn', href: '/leagueView/[matchId]/listInLeague/team'},
    { name: 'Lista meczów', href: '/leagueView/[matchId]/listInLeague/match'},
    { name: 'Dodaj drużynę', href: '/leagueView/[matchId]/addToLeague/team'},
    { name: 'Dodaj mecz', href: '/leagueView/[matchId]/addToLeague/match'},
    { name: 'Wyloguj', href: '/', onClick: (token: string) => Logout(token) },
]
function Logout(token: string | null) {
    token = null;
    //remove cookie token
    document.cookie = "";
}
