export type League = {
    id: number,
    name: string,
    owner: string,
    owner_login: string
};

export type Team = {
    id: number,
    number: number,
    name: string,
    league: number,
    season: number,
    owner: string,
    city: string
};

export type Match = {
    id: number,
    league: number,
    season: number,
    host: Team,
    host_score: number,
    visitor: Team,
    visitor_score: number,
    datetime: string
    address: string
    city: string
};

export type Season = {
    id: number,
    league: number,
    name: string,
    start_date: string,
    end_date: string
    points_per_win: number,
    points_per_draw: number,
    points_per_lose: number
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

export type breadcrumbItem = {
    name: string,
    href: string
}

export type response = {
    count: number,
    next: string,
    previous: string,
    results: any[]
}

export type scoreBoardRecord = {
    city: string,
    id: number,
    name: string,
    number: number,
    score: number,
    season: number
}