import { registerUser } from "@/endpoints";
import { FormEvent } from "react";

export type RegisterData = {
    username: string;
    password: string;
    repeatPassword: string;
    email: string;
}

export type FailSettersType = {
    setFailedRegister: (value: boolean) => void;
    setIsPasswordShort: (value: boolean) => void;
    setIsPasswordNotMatching: (value: boolean) => void;
    setIsEmailInvalid: (value: boolean) => void;
}

export default function submitRegisterData(e: FormEvent<HTMLFormElement>, failSetters: FailSettersType) {
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as RegisterData;
    const isDataValid = validateRegisterData(data, failSetters);
    if(!isDataValid)
        return;
    registerUser(data, failSetters).then((response) => {
        if(response.ok === 200) {
            window.location.href = '/login';
        }
    });
}

function validateRegisterData(data: RegisterData, failSetters: FailSettersType) {
    const { setFailedRegister, setIsPasswordShort, setIsPasswordNotMatching, setIsEmailInvalid } = failSetters;

    if (!data.username || !data.password || !data.repeatPassword || !data.email) {
        setFailedRegister(true);
        return false;
    }

    if (data.password.length < 8 || data.repeatPassword.length < 8) {
        setIsPasswordShort(true);
        return false;
    }

    if (data.password !== data.repeatPassword) {
        setIsPasswordNotMatching(true);
        return false;
    }

    const emailRegex = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
    if (!emailRegex.test(data.email)) {
        setIsEmailInvalid(true);
        return false;
    }

    return true;
}
