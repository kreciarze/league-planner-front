export type League = {
    id: number,
    name: string,
    owner: string,
    owner_login: string
};

export type Team = {
    id: number,
    name: string,
    league: number,
    owner: string,
    city: string
};

export type Match = {
    id: number,
    league: number,
    host: number,
    host_score: number,
    visitor: number,
    visitor_score: number,
    datetime: string
    address: string
    city: string
};

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

