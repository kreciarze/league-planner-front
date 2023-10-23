import {useState} from "react";

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
                <input type="password" name="password" placeholder="Wprowadź hasło"/>
            </label>
            <button type="submit">Zarejestruj</button>
            <p> Masz już konto? <a href="/login">Zaloguj się</a></p>
        </form>
    </div>
  )
}

export default Register;


function submitRegisterData(e: React.FormEvent<HTMLFormElement>, setFailedRegister: (arg0: boolean) => void) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    if(data.password !== data.password2) {
        setFailedRegister(true);
        return;
    }
    fetch('http://localhost:8080/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
        .then(response => {
            if (response.status === 200) {
                window.location.href = '/login';
            } else {
                setFailedRegister(true);
            }
        })
        .catch(error => {
            setFailedRegister(true);
        });
}