import {leagueNavigation, teamNavigation} from "@/components/navbar/navigationObjects";
import {createLeague, createMatch, createTeam} from "@/endpoints";

function UseAddModel(slug: string) {
    slug = slug.includes("+") ? slug.split("+")[0] : slug;
    const navigation = slug === "league" ? leagueNavigation : teamNavigation;
    const createEndpoint = slug === "league" ? createLeague : (slug === "team" ? createTeam : createMatch);
    //TODO: dodać żeby zwracało obiekt z tekstem do wyświetlenia w AddNewLeague.tsx, zrobić osobny plik do trzymania różnych tekstów

    return {
        navigation,
        createEndpoint,
        addModelType: slug,
    }
}

export default UseAddModel;