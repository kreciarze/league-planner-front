import {deleteLeague, deleteMatch, deleteTeam} from "@/endpoints";

export function PromptForDeleteLeague(id: string, token: string | null) {
    if (confirm("Czy na pewno chcesz usunąć ligę?")) {
        deleteLeague(id, token).then((response) => {
                if(response.ok)
                    window.location.reload();
            }
        );
    }
}

export function PromptForDeleteTeam(id: string, token: string | null) {
    if (confirm("Czy na pewno chcesz usunąć drużynę?")) {
        deleteTeam(id, token).then((response) => {
                if(response.ok)
                    window.location.reload();
            }
        );
    }
}

export function PromptForDeleteMatch(id: string, token: string | null) {
    if (confirm("Czy na pewno chcesz usunąć mecz?")) {
        deleteMatch(id, token).then((response) => {
                if(response.ok)
                    window.location.reload();
            }
        );
    }
}

export function PromptForDeleteSeason(seasonId: number, token: string | null) {
    if (confirm("Czy na pewno chcesz usunąć sezon?")) {
        // deleteSeason(leagueId, seasonId, token).then((response) => {
        //         if(response.ok)
        //             window.location.reload();
        //     }
        // );
    }
}