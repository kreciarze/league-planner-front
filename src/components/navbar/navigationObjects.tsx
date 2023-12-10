export const leagueNavigation = [
    { name: 'Strona główna', href: '/home'},
    { name: 'Wszystkie ligi', href: '/leagueList'},
    { name: 'Twoje ligi', href: '/leagueList'},
    { name: 'Dodaj ligę', href: '/addLeague'},
    { name: 'Wyloguj', href: '/', onClick: (token: string) => Logout(token) },
]

export const teamNavigation = [
    { name: 'Strona główna', href: '/home'},
    { name: 'Lista drużyn', href: '/teamList'},
    { name: 'Lista meczów', href: '/matchList'},
    {name: 'Lista turniejów', href: '/tournamentList'},
    {name: 'Lista zawodników', href: '/playerList'},
    { name: 'Dodaj drużynę', href: '/addTeam'},
    { name: 'Dodaj mecz', href: '/addMatch'},
    { name: 'Dodaj turniej', href: '/addTournament'},
    { name: 'Dodaj zawodnika', href: '/addPlayer'},
    { name: 'Wyloguj', href: '/', onClick: (token: string) => Logout(token) },
]
function Logout(token: string | null = null) {
    token = null;
    localStorage.removeItem('token');
    window.location.href = '/';
}
