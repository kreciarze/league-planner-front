import {FormEvent} from "react";
import {FailSettersType, League, Match, RegisterData, Team} from "@/types/types";

const url = 'http://localhost:8080/';

const endpoints = {
    leagues: url + 'leagues/',
    leagueDetails: url + 'leagues/' + ":id",
    leagueScoreboard: url + 'leagues/' + ":id" + '/scoreboard',
    teams: url + 'teams/',
    teamDetails: url + 'teams/' + ":id",
    matches: url + 'matches/',
    matchDetails: url + 'matches/' + ":id",
    login: url + 'login/',
    register: url + 'register/',
}

//TODO: przerzucić wszystkie linki aby korzystały z tego poniżej a nie stringów
export const hrefs = {
    homeView: '/homeView',
    listLeagues: '/listLeagues',
    addNewLeague: '/addNewLeague',
    listTeams: '/listTeams',
    listMatches: '/listMatches',
    addNewTeam: '/addNewTeam',
    addNewMatch: '/addNewMatch',
    leagueView: '/leagueView',
    teamView: '/teamView',
    matchView: '/matchView',
    listInLeague: '/listInLeague',
    listInTeam: '/listInTeam',
}

export function getScoreboard(
    id: string,
    token: string | null
) {
    fetch(endpoints.leagueScoreboard.replace(':id', id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Token " + (token || '')
        }
    })
        .then(response => response.json())
        .then(
            (data) => {
                return data;
            }
        )
        .catch(error => {
            console.log("Error while getting scoreboard: ", error);
        });
}

export async function getLeagueDetails(
    id: string,
    token: string | null
) {
    fetch(endpoints.leagueDetails.replace(':id', id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Token " + (token || '')
        }
    })
        .then(response => response.json())
        .then(
            (data) => {
                return data;
            }
        )
        .catch(error => {
            console.log("Error while getting league details: ", error);
        });
}

export async function deleteLeague(
    id: string,
    token: string | null
) {
    return fetch(endpoints.leagueDetails.replace(':id', id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Token " + (token || '')
        }
    })
        .then(response => {return response})
        .catch(error => {
            console.log("Error while deleting league: ", error);
            return error;
        });
}

export async function updateLeague(
    league: League,
    token: string | null
) {
    fetch(endpoints.leagueDetails.replace(':id', `${league.id}`), {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Token " + (token || '')
        },
        body: JSON.stringify({
            name: league.name,
        })
    })
        .then(response => response.json())
        .then(
            (data) => {
                return data;
            }
        )
        .catch(error => {
            console.log("Error while updating league: ", error);
        });
}

export async function getLeagues(
    token: string | null
) {
    return fetch(endpoints.leagues, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Token " + (token || ''),
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('LoginView failed');
        })
        .then(
            (data) => {
                return data.results;
            })
        .catch(error => {
            console.log("Error in getLeagues: ", error);
        });
}

export async function createLeague(
    body: League,
    token: string | null
) {
    const body_stringify = JSON.stringify({
        name: body.name
    });
    fetch(endpoints.leagues, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Token " + (token || '')
        },
        body: body_stringify
    })
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            else
                throw new Error('LoginView failed');
        })
        .catch(error => {
            console.log("Error while creating leagues: ", error);
            return error;
        });
}

export async function registerUser(
    data: RegisterData,
    failSetters: FailSettersType
){
    return fetch(endpoints.register, {
        method: 'POST',
        body: JSON.stringify({
            username: data.username,
            password: data.password
        }),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    })
        .then(response => {
            if (response.ok) {
                failSetters.setFailedRegister(false);
                return response;
            } else if (response.status === 400) {
                response.json().then(errorData => {
                    console.log(errorData);
                });
            } else {
                console.log('Error while registering user:');
                failSetters.setFailedRegister(true);
            }
        })
        .catch(error => {
            console.log('Error while registering user:', error);
            failSetters.setFailedRegister(true);
            return error;
        });

}

export async function Login(e: FormEvent<HTMLFormElement>, setLoginFailed: (arg0: boolean) => void) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const inputData = Object.fromEntries(formData)
    const body = JSON.stringify({
        username: inputData.username,
        password: inputData.password
    })
    fetch(endpoints.login, {
        method: 'POST',
        body: body,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    })
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error('LoginView failed');
        })
        .then(
            (data) => {
                if(!data.token) throw new Error('LoginView failed');
                document.cookie = `token=${data.token}; sameSite=strict`;
                document.cookie = `username=${inputData.username}; sameSite=strict`;
                console.log(document.cookie)
                window.location.href = '/homeView';
            }
        )
        .catch(error => {
            console.log(error);
            setLoginFailed(true);
        });
}

export async function updateTeam(
    team: Team,
    token: string | null
) {
    fetch(endpoints.teamDetails.replace(':id', `${team.id}`), {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Token " + (token || '')
        },
        body: JSON.stringify({
            name: team.name,
        })
    })
        .then(response => response.json())
        .then(
            (data) => {
                return data;
            }
        )
        .catch(error => {
            console.log("Error while updating team: ", error);
        });
}

export async function getTeamDetails(
    id: string,
    token: string | null
) {
    fetch(endpoints.teamDetails.replace(':id', id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Token " + (token || '')
        }
    })
        .then(response => response.json())
        .then(
            (data) => {
                return data;
            }
        )
        .catch(error => {
            console.log("Error while getting team details: ", error);
        });
}

export async function deleteTeam(
    id: string,
    token: string | null
) {
    return fetch(endpoints.teamDetails.replace(':id', id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Token " + (token || '')
        }
    })
        .then(response => { return response; })
        .catch(error => {
            console.log("Error while deleting team: ", error);
            return error;
        });
}

export async function getTeams(
    token: string | null,
    leagueId: string
) {
    let url = new URL(endpoints.teams);
    url.searchParams.append('league', leagueId);
    url.searchParams.append('page_size', '100');
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Token " + (token || '')
        }
    })
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error('LoginView failed');
        })
        .then(
            (data) => {
                return data;
            }
        )
        .catch(error => {
            console.log("Error while getting teams: ", error);
        });
}

export async function createTeam(
    body: Team,
    token: string | null,
    leagueId: string
) {
    return fetch(endpoints.teams, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Token " + (token || '')
        },
        body: JSON.stringify(
            {
                ...body,
                league: leagueId
            }
        )
    })
        .then(response => {
            return response;
        })
        .catch(error => {
            console.log("Error while creating teams: ", error);
            return error;
        });
}

export async function updateMatch(
    matchId: string,
    hostScore: number,
    visitorScore: number,
    token: string | null
) {
    fetch(endpoints.matchDetails.replace(':id', matchId), {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Token " + (token || '')
        },
        body: JSON.stringify({
            host_score: hostScore,
            visitor_score: visitorScore
        })
    })
        .then(response => response.json())
        .then(
            (data) => {
                return data;
            }
        )
        .catch(error => {
            console.log("Error while updating match: ", error);
        });
}

export async function getMatchDetails(
    id: string,
    token: string | null
) {
    if(!token || !id || id === 'undefined') return null;
    return fetch(endpoints.matchDetails.replace(':id', id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Token " + (token || '')
        }
    })
        .then(response => {
            return response.json();
        }
        )
        .catch(error => {
            console.log("Error while getting match details: ", error);
            return error;
        });
}

export async function deleteMatch(
    id: string,
    token: string | null
) {
    return fetch(endpoints.matchDetails.replace(':id', id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Token " + (token || '')
        }
    })
        .then(response => { return response; })
        .catch(error => {
            console.log("Error while deleting match: ", error);
            return error;
        });
}

export async function getMatches(
    token: string | null,
    leagueId: string
) {
    if(!token || !leagueId || leagueId === 'undefined') return null;
    let url = new URL(endpoints.matches);
    url.searchParams.append('page_size', '100');
    url.searchParams.append('league',  leagueId);
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Token " + (token || '')
        }
    })
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error('LoginView failed');
        })
        .then(
            (data) => {
                console.log({
                    data: data
                })
                return data;
            }
        )
        .catch(error => {
            console.log("Error while getting matches: ", error);
        });
}

export async function createMatch(
    body: Match,
    token: string | null,
    leagueId: string
) {
    console.log({
        league: leagueId,
        host: body.host,
        host_score: 0,
        visitor: body.visitor,
        visitor_score: 0,
        datetime: body.datetime,
        address: body.address,
        city: body.city
    })
    return fetch(endpoints.matches, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Token " + (token || '')
        },
        body: JSON.stringify(
            {
               league: leagueId,
                host: body.host,
                host_score: 0,
                visitor: body.visitor,
                visitor_score: 0,
                datetime: body.datetime,
                address: body.address,
                city: body.city
            }
        )
    })
        .then(response => {
            return response;
        })
        .catch(error => {
            console.log("Error while creating match: ", error);
            return error;
        });
}

