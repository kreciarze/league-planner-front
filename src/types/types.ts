export type League = {
    id: number,
    name: string,
    owner: string
};

export type Team = {
    id: number,
    name: string,
    league: number,
    owner: string
};

export type Match = {
    id: number,
    name: string,
    league: number,
    homeTeam: number,
    awayTeam: number,
    homeTeamScore: number,
    awayTeamScore: number,
    date: string
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

