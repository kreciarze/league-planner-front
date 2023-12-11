import {leagueNavigation, teamNavigation} from "@/components/navbar/navigationObjects";
import {getLeagues, getTeams, getMatches} from "@/endpoints";
function UseListModel(slug: string) {
    const navigation = slug === "league" ? leagueNavigation : teamNavigation;
    const listGetter = slug === "league" ? getLeagues : (slug === "team" ? getTeams : getMatches);

    return {
        navigation,
        listGetter
    }
}

export default UseListModel;