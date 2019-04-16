export function calculateSeasonTotals(playerId) {
    return fetch('https://www.balldontlie.io/api/v1/stats?seasons[]=2018&per_page=100&player_ids[]=' + playerId + '&postseason=false')
        .then(resp => resp.json())
        .then(res => { 
            let game = res.data
            let assists = []
            let points = []
            let rebounds = []
            let tov = []
            let steals = []
            let blocks = []
            game.map(function(elem) {
                assists.push(elem.ast)
                points.push(elem.pts)
                rebounds.push(elem.reb)
                tov.push(elem.turnover)
                steals.push(elem.stl)
                blocks.push(elem.blk)
            });

            let totalPoints = points.reduce( (a, b) => { return a + b}, 0);
            let totalAssists = assists.reduce( (a, b) => { return a + b}, 0);
            let totalRebounds = rebounds.reduce( (a, b) => { return a + b}, 0);
            let totalSteal = steals.reduce( (a, b) => { return a + b}, 0);
            let totalBlocks = blocks.reduce( (a, b) => { return a + b}, 0);
            let totalTOV = tov.reduce( (a, b) => { return a + b}, 0);

            let playerSeasonTotals = {
                totalPoints,
                totalAssists,
                totalRebounds,
                totalSteals,
                totalBlocks,
                totalTOV
            }
            return playerSeasonTotals;
        })
}