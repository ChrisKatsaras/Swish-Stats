export function calculateSeasonTotals(playerId: number) {
    return fetch(
        "https://www.balldontlie.io/api/v1/stats?seasons[]=2018&per_page=100&player_ids[]=" +
            playerId +
            "&postseason=false"
    )
        .then(resp => resp.json())
        .then(res => {
            const game = res.data;
            const assists: number[] = [];
            const points: number[] = [];
            const rebounds: number[] = [];
            const tov: number[] = [];
            const steals: number[] = [];
            const blocks: number[] = [];
            game.map((elem: any) => {
                assists.push(elem.ast);
                points.push(elem.pts);
                rebounds.push(elem.reb);
                tov.push(elem.turnover);
                steals.push(elem.stl);
                blocks.push(elem.blk);
            });

            const totalPoints = points.reduce((a, b) => {
                return a + b;
            }, 0);
            const totalAssists = assists.reduce((a, b) => {
                return a + b;
            }, 0);
            const totalRebounds = rebounds.reduce((a, b) => {
                return a + b;
            }, 0);
            const totalSteals = steals.reduce((a, b) => {
                return a + b;
            }, 0);
            const totalBlocks = blocks.reduce((a, b) => {
                return a + b;
            }, 0);
            const totalTOV = tov.reduce((a, b) => {
                return a + b;
            }, 0);

            const playerSeasonTotals = {
                totalAssists,
                totalBlocks,
                totalPoints,
                totalRebounds,
                totalSteals,
                totalTOV
            };
            return playerSeasonTotals;
        });
}

export function getPlayersSeasonTotal(year: number, playerId: number) {
    return fetch(
        "https://www.balldontlie.io/api/v1/season_averages?season=" +
            year +
            "&player_ids[]=" +
            playerId
    )
        .then(resp => resp.json())
        .then(res => {
            return res.data;
        });
}
