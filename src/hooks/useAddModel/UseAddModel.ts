import {leagueNavigation, teamNavigation} from "@/components/navbar/navigationObjects";
import {createLeague, createMatch, createTeam} from "@/endpoints";

function UseAddModel(slug: string) {
    const navigation = slug === "league" ? leagueNavigation : teamNavigation;
    const recordCreator = slug === "league" ? createLeague : (slug === "team" ? createTeam : createMatch);
    //TODO: dodać żeby zwracało obiekt z tekstem do wyświetlenia w AddModel.tsx, zrobić osobny plik do trzymania różnych tekstów

    return {
        navigation,
        recordCreator
    }
}

export default UseAddModel;