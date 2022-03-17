import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


const repeatedWordsWhitelistAPIEndpoint = 'https://s2v3quoxh6.execute-api.us-east-1.amazonaws.com/prod/whitelist';
  
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})

export class RepeatedWordsWhitelistService {
    constructor(private http: HttpClient) { }

    private extractData(res: Response) {
        let body = res;
        return body || { };
    }

    getWhitelist (): Observable<any> {
        return this.http.get<any>(repeatedWordsWhitelistAPIEndpoint, httpOptions).pipe(
            tap((response) => console.log(`Get Whitelist OK`))
        );
    }

    private handleError<T> (operation = 'operation', result?: T) {
        console.log("Error");
        return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        console.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
        };
    }
}
