import { registerUser } from "@/endpoints";
import { FormEvent } from "react";
import { FailSettersType, RegisterData } from "@/types/types";
import {NextRouter, useRouter} from "next/router";


export default function submitRegisterData(e: FormEvent<HTMLFormElement>, failSetters: FailSettersType, router: NextRouter) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as RegisterData;
    const isDataValid = validateRegisterData(data, failSetters);
    if(!isDataValid)
        return;
    registerUser(data, failSetters).then((response) => {
        console.log(response)
        if(response.ok) {
            router.push('/loginView');
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
