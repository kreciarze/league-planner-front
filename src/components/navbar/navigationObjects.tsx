export const leagueNavigation = [
    { name: 'Strona główna', href: '/homeView'},
    { name: 'Wszystkie ligi', href: '/listModel/league'},
    { name: 'Dodaj ligę', href: '/addModel/league'},
    { name: 'Wyloguj', href: '/', onClick: (token: string) => Logout(token) },
]

export const teamNavigation = [
    { name: 'Strona główna', href: '/homeView'},
    { name: 'Lista drużyn', href: '/listModel/team'},
    { name: 'Lista meczów', href: '/listModel/match'},
    { name: 'Lista zawodników', href: '/playerList'},
    { name: 'Dodaj drużynę', href: '/addModel/team'},
    { name: 'Dodaj mecz', href: '/addModel/match'},
    { name: 'Wyloguj', href: '/', onClick: (token: string) => Logout(token) },
]
function Logout(token: string | null) {
    token = null;
    //remove cookie token
    document.cookie = "";
}
