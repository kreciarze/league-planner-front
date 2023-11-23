import { registerUser } from "@/endpoints";

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
    registerUser(data, failSetters).then();
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