import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Game, NewGame, GamePlayer } from '../models/game.model';
import { Player } from '../models/player.model';
import { HttpClientService } from './httpClient.service';

@Injectable()
export class GameService {
    private base = `${environment.pokerNightApiUrl}/games`;

    constructor(private http: HttpClientService) { }

    getAll(): Promise<Game[]> {
        return this.http.get<Game[]>(this.base).toPromise();
    }

    get(id: string): Promise<Game> {
        return this.http.get<Game>(`${this.base}/${id}`).toPromise();
    }

    createNewGame(newGame: NewGame): Promise<Game>  {
        return this.http.post<Game>(`${this.base}/new`, newGame).toPromise();
    }

    deleteGame(gameId: string): Promise<string>  {
        return this.http.delete<string>(`${this.base}/${gameId}`).toPromise();
    }

    addPlayer(gameId: string, player: Player): Promise<Game>  {
        return this.http.post<Game>(`${this.base}/${gameId}/add-player/${player._id}`, player).toPromise();
    }

    updatePlayer(gameId: string, player: GamePlayer): Promise<Game>  {
        return this.http.post<Game>(`${this.base}/${gameId}/update-player/${player._id}`, player).toPromise();
    }

    deletePlayer(gameId: string, player: GamePlayer): Promise<Game>  {
        return this.http.delete<Game>(`${this.base}/${gameId}/remove-player/${player._id}`).toPromise();
    }
}