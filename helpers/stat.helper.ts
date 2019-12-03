import axios from "axios";
import { SeasonAverages } from "../models/seasonAverages";

export function getPlayersSeasonAverages(
    year: number,
    playerIds: number[]
): Promise<SeasonAverages[]> {
    return axios
        .get("https://www.balldontlie.io/api/v1/season_averages", {
            params: {
                "player_ids[]": playerIds,
                season: year
            }
        })
        .then(res => {
            playerIds.forEach(id => {
                if (
                    !res.data.data.find(
                        (seasonTotal: SeasonAverages) =>
                            seasonTotal.player_id === id
                    )
                ) {
                    res.data.data.push(new SeasonAverages(id, year));
                }
            });
            return res.data.data;
        });
}
