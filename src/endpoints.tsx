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
                console.log('Unexpected Error');
                failSetters.setFailedRegister(true);
            }
        })
        .catch(error => {
            console.log('Network Error:', error);
            failSetters.setFailedRegister(true);
        })
        .finally(() => {
            return null;
        });
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
            console.log("errorek: ", error);
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
            throw new Error('Login failed');
        })
        .then(
            (data) => {
                return data;
            }
        )
        .catch(error => {
            console.log("errorek: ", error);
        });
}