import {FormEvent} from "react";
import {FailSettersType, RegisterData} from "@/types/types";

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
    fetch(endpoints.leagueDetails.replace(':id', id), {
        method: 'DELETE',
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
            console.log("Error while deleting league: ", error);
        });
}

export async function updateLeague(
    id: string,
    token: string | null
) {
    fetch(endpoints.leagueDetails.replace(':id', id), {
        method: 'PUT',
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
    leagueName: string,
    token: string | null
) {
    const body = JSON.stringify({
        name: leagueName
    })
    fetch(endpoints.leagues, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Token " + (token || '')
        },
        body: body
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
    const data = Object.fromEntries(formData);
    const body = JSON.stringify({
        username: data.username,
        password: data.password
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
                window.location.href = '/homeView';
            }
        )
        .catch(error => {
            console.log(error);
            setLoginFailed(true);
        });
}

export async function updateTeam(
    id: string,
    token: string | null
) {
    fetch(endpoints.teamDetails.replace(':id', id), {
        method: 'PUT',
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
    fetch(endpoints.teamDetails.replace(':id', id), {
        method: 'DELETE',
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
            console.log("Error while deleting team: ", error);
        });
}

export async function getTeams(
    token: string | null
) {
    return fetch(endpoints.teams, {
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
    teamName: string,
    token: string | null
) {
    const body = JSON.stringify({
        name: teamName
    })
    fetch(endpoints.teams, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Token " + (token || '')
        },
        body: body
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
            console.log("Error while creating teams: ", error);
        });
}

export async function updateMatch(
    id: string,
    token: string | null
) {
    fetch(endpoints.matchDetails.replace(':id', id), {
        method: 'PUT',
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
            console.log("Error while updating match: ", error);
        });
}

export async function getMatchDetails(
    id: string,
    token: string | null
) {
    fetch(endpoints.matchDetails.replace(':id', id), {
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
            console.log("Error while getting match details: ", error);
        });
}

export async function deleteMatch(
    id: string,
    token: string | null
) {
    fetch(endpoints.matchDetails.replace(':id', id), {
        method: 'DELETE',
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
            console.log("Error while deleting match: ", error);
        });
}

export async function getMatches(
    token: string | null
) {
    return fetch(endpoints.matches, {
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
            console.log("Error while getting matches: ", error);
        });
}

export async function createMatch(
    matchName: string,
    token: string | null
) {
    const body = JSON.stringify({
        name: matchName
    })
    fetch(endpoints.matches, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Token " + (token || '')
        },
        body: body
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
            console.log("Error while creating match: ", error);
        });
}

