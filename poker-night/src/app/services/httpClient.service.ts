import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpClientService {

    constructor(private http: HttpClient,
                private cookieService: CookieService) { }

    private processOptions(options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }) {
        let headers = new HttpHeaders();
        if (this.cookieService.check('poker-night-auth-token')) {
            let token = this.cookieService.get('poker-night-auth-token');
            headers.set('Authorization', token);
        }

        if (options) {
            options.headers = headers;
            return options;
        } else {
            return {headers};
        }
    }

    get<T>(url, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<T> {
        return this.http.get<T>(url, this.processOptions(options));
    }

    post<T>(url, body, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<T> {
        return this.http.post<T>(url, body, this.processOptions(options));
    }

    delete<T>(url, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<T> {
        return this.http.delete<T>(url, this.processOptions(options));
    }
}