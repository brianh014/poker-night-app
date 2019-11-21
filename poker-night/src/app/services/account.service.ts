import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { of, BehaviorSubject, empty, Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientService } from './httpClient.service';
import { User } from '../models/user.model';

@Injectable()
export class AccountService {
    private base = `${environment.pokerNightApiUrl}/account`;
    private _currentUser: BehaviorSubject<User>;

    constructor(private http: HttpClientService,
                private cookieService: CookieService) { 
        this._currentUser = <BehaviorSubject<User>>new BehaviorSubject(new User());
    }

    get currentUser(): Observable<User> {
        return this._currentUser.asObservable();
    }

    login(username: string, password: string): Promise<any> {
        return this.http.get(`${this.base}/login`, {params: {username, password}})
            .pipe(
                tap((res: any) => {
                    if (res) {
                        this.cookieService.set('poker-night-auth-token', res.token);
                        let user = new User();
                        user.username = res.username;
                        user.isAdmin = res.isAdmin;
                        this._currentUser.next(Object.assign(new User(), user));
                    }
                })
            ).toPromise();
    }
    
    loadContext(): Promise<User> {
        return this.http.get<User>(`${this.base}/context`)
            .pipe(
                tap(user => {
                    if (user) {
                        this._currentUser.next(Object.assign(new User(), user));
                    } else {
                        this._currentUser.next(null);
                    }
                })
            ).toPromise();
    }

    logOut() {
        this.cookieService.delete('poker-night-auth-token');
        this._currentUser.next(null);
    }
    

}