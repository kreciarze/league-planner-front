import {useState} from "react";
import Link from "next/link";

function Register () {
    const [failedRegister, setFailedRegister] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-800 text-gray-100">
        <h1 className="font-bold text-3xl sm:text-4xl">
            Register
        </h1>
        <form onSubmit={(e) => submitRegisterData(e, setFailedRegister)}
        className="flex flex-col bg-gray-700 rounded p-12 mt-6">
            <label>
                <p className="font-semibold text-lg">
                    Nazwa użytkownika
                </p>
                <input type="text" name="username" placeholder="Wprowadź nazwę"
                className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2 text-gray-900"/>
            </label>
            <label>
                <p className="font-semibold text-lg pt-2">
                    Adres email
                </p>
                <input type="email" name="email" placeholder="Wprowadź adres email"
                className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2 text-gray-900"/>
            </label>
            <label>
                <p className="font-semibold text-lg pt-2">
                    Hasło
                </p>
                <input type="password" name="password" placeholder="Wprowadź hasło"
                className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2 text-gray-900"/>
            </label>
            <label>
                <p className="font-semibold text-lg pt-2">
                    Powtórz hasło
                </p>
                <input type="password" name="password2" placeholder="Wprowadź hasło"
                className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2 text-gray-900"/>
            </label>
            <button type="submit" className="flex items-center justify-center h-12 px-6 w-64 bg-violet-600 mt-12 rounded font-semibold text-lg text-white hover:bg-violet-700">
                Zarejestruj
            </button>
            <p className="flex mt-6 justify-center text-md"> 
                Masz już konto? 
                <Link href="/login" className="pl-2 text-violet-400 hover:text-purple-400">
                    Zaloguj się
                </Link>
            </p>
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


