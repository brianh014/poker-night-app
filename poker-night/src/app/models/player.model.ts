export class Player {
    _id: string;
    name: string;
}

export class PlayerWithStats extends Player {
    boughtIn: number;
    cashedOut: number;
    gamesPlayed: number;
    avgProfit: number;
}