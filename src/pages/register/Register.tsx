import {useState} from "react";
import Link from "next/link";

function Register () {
    const [failedRegister, setFailedRegister] = useState(false);
  return (
    <div>
      <h1>Register</h1>
        <form onSubmit={(e) => submitRegisterData(e, setFailedRegister)}>
            <label>
                <p>Nazwa użytkownika</p>
                <input type="text" name="username" placeholder="Wprowadź nazwę"/>
            </label>
            <label>
                <p>Adres email</p>
                <input type="email" name="email" placeholder="Wprowadź adres email"/>
            </label>
            <label>
                <p>Hasło</p>
                <input type="password" name="password" placeholder="Wprowadź hasło"/>
            </label>
            <label>
                <p>Powtórz hasło</p>
                <input type="password" name="password2" placeholder="Wprowadź hasło"/>
            </label>
            <button type="submit">Zarejestruj</button>
            <p> Masz już konto? <Link href="/login">Zaloguj się</Link></p>
        </form>
    </div>
  )
}

export default Register;


function submitRegisterData(e: React.FormEvent<HTMLFormElement>, setFailedRegister: (arg0: boolean) => void) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const body = JSON.stringify({
        username: data.username,
        password: data.password
    })
    const emailRegex = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
    if (data.password !== data.password2 || data.password === '' || data.password2 === '' ) {
        setFailedRegister(true);
        return;
    }

    fetch('http://localhost:8080/register/', {
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
                setFailedRegister(true);
            }
        })
        .catch(error => {
            console.log('Network Error:', error);
            setFailedRegister(true);
        })
        .finally(() => {
            console.log('finally');
        });
}


