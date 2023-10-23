import {useState} from "react";
import Link from "next/link";

function Login(){
    const [loginFailed, setLoginFailed] = useState(false);

    return(
        <div>
            <h1 className="bg-amber-600">Login</h1>
            <p className="text-white">Nieprawidłowa nazwa użytkownika lub hasło!</p>
            <form onSubmit={(e) => submitLoginCredentials(e, setLoginFailed)}>
                <label>
                    <p>Nazwa użytkownika</p>
                    <input type="text" name="username" placeholder="Wprowadź nazwę"/>
                </label>
                <label>
                    <p>Hasło</p>
                    <input type="password" name="password" placeholder="Wprowadź hasło"/>
                </label>
                <button type="submit">Zaloguj</button>
                <p> Nie masz konta? <Link href="/register">Zarejestruj się</Link></p>
            </form>
       </div>
    )
}

export default Login;

function submitLoginCredentials(e: React.FormEvent<HTMLFormElement>, setLoginFailed: (arg0: boolean) => void) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const body = JSON.stringify({
        username: data.username,
        password: data.password
    });
    fetch('http://localhost:8080/login/', {
        method: 'POST',
        body: body,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
        .then(response => {
            if (response.status === 200) {
                window.location.href = '/home';
            } else {
                setLoginFailed(true);
            }
        })
        .catch(error => {
            setLoginFailed(true);
        });
}