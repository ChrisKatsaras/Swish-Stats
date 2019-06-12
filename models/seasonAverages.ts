export class SeasonAverages {
    public games_played: number = 0;
    public player_id: number = 0;
    public season: number = 0;
    public min: string = "00:00";
    public fgm: number = 0;
    public fga: number = 0;
    public fg3m: number = 0;
    public fg3a: number = 0;
    public ftm: number = 0;
    public fta: number = 0;
    public oreb: number = 0;
    public dreb: number = 0;
    public reb: number = 0;
    public ast: number = 0;
    public stl: number = 0;
    public blk: number = 0;
    public turnover: number = 0;
    public pf: number = 0;
    public pts: number = 0;
    public fg_pct: number = 0;
    public fg3_pct: number = 0;
    public ft_pct: number = 0;

    constructor(playerId: number, season: number) {
        this.player_id = playerId;
        this.season = season;
    }
}
