type RegisterData = {
    username: string;
    password: string;
    repeatPassword: string;
    email: string;
}

type FailSettersType = {
    setFailedRegister: (arg0: boolean) => void;
    setIsPasswordShort: (arg0: boolean) => void;
    setIsPasswordNotMatching: (arg0: boolean) => void;
    setIsEmailInvalid: (arg0: boolean) => void;
}

export function submitRegisterData(e: React.FormEvent<HTMLFormElement>, failSetters: FailSettersType) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as RegisterData;
    const isDataValid = validateRegisterData(data, failSetters);
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
                failSetters.setFailedRegister(true);
            }
        })
        .catch(error => {
            console.log('Network Error:', error);
            failSetters.setFailedRegister(true);
        })
        .finally(() => {
            console.log('finally');
        });
}

function validateRegisterData(data: RegisterData, failSetters: FailSettersType) {
    if(data.password.length < 8 || data.repeatPassword.length < 8) {
        failSetters.setIsPasswordShort(true);
        return false;
    }
    if(data.password !== data.repeatPassword) {
        failSetters.setIsPasswordNotMatching(true);
        return false;
    }
    const emailRegex = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
    if(!emailRegex.test(data.email)) {
        failSetters.setIsEmailInvalid(true);
        return false;
    }
    return true;
}