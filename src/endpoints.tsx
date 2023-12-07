import {FormEvent} from "react";

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
    fetch(endpoints.leagues, {
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
            throw new Error('Login failed');
        })
        .then(
            (data) => {
                return data;
            }
        )
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
                window.location.href = '/home';
                return response.json();
            }
            throw new Error('Login failed');
        })
        .catch(error => {
            console.log("Error while creating leagues: ", error);
            return error;
        });
}

export async function registerUser(
    data: {
        username: string,
        password: string
    },
    failSetters: {
        setFailedRegister: (value: boolean) => void
    }
){
    fetch(endpoints.register, {
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
            if (response.status < 300) {
                window.location.href = '/login';
            } else if (response.status === 400) {
                // Handle specific error cases
                // You can extract the error message from the response and display it to the user.
                response.json().then(errorData => {
                    console.log(errorData);
                    // You can set a state variable to display the error to the user.
                });
            } else {
                console.log('Error while registering user:');
                failSetters.setFailedRegister(true);
            }
        })
        .catch(error => {
            console.log('Error while registering user:', error);
            failSetters.setFailedRegister(true);
        })
}

export async function login(e: FormEvent<HTMLFormElement>, setLoginFailed: (arg0: boolean) => void) {
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
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    })
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error('Login failed');
        })
        .then(
            (data) => {
                if(!data.token) throw new Error('Login failed');
                document.cookie = `token=${data.token}`;
                window.location.href = '/home';
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
    fetch(endpoints.teams, {
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
            throw new Error('Login failed');
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
            throw new Error('Login failed');
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
    fetch(endpoints.matches, {
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
            throw new Error('Login failed');
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
            throw new Error('Login failed');
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

