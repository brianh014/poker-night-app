import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Player, PlayerWithStats } from '../models/player.model';
import { HttpClientService } from './httpClient.service';

@Injectable()
export class PlayerService {
    private base = `${environment.pokerNightApiUrl}/players`;

    constructor(private http: HttpClientService) { }

    getAll(): Promise<Player[]> {
        return this.http.get<Player[]>(this.base).toPromise();
    }

    getAllWithStats(sortField:string = null, sortDirection: string = null, limit: string = null): Promise<PlayerWithStats[]> {
        return this.http.get<PlayerWithStats[]>(`${this.base}/stats`,
            {params: {sort: sortField, dir: sortDirection, limit: limit}})
            .toPromise();
    }

    updateOrCreatePlayer(player: Player): Promise<Player> {
        return this.http.post<Player>(this.base, player).toPromise();
    }
}