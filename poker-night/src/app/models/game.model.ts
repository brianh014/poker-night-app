import { Player } from './player.model';

export class Game {
    _id: string;
    date: Date;
    buyIn: number;
    closed: boolean;
    players: GamePlayer[];
    
    buyInTotal(): number {
        let total = 0;
        this.players.forEach(p => total += p.buyIn || 0);
        return total;
    }

    cashOutTotal(): number {
        let total = 0;
        this.players.forEach(p => total += p.cashOut || 0);
        return total;
    }

    cashedOutCount(): number {
        let total = 0;
        this.players.forEach(p => total += p.cashOut != null ? 1 : 0);
        return total
    }
}

export class GamePlayer {
    _id: string;
    player: Player;
    buyIn: number;
    cashOut: number;
    changed = false;
}

export class NewGame {
    date: Date;
    buyIn: number;
}