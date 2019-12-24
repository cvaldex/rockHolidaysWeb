import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

  const addEndpoint = 'https://ufzauad358.execute-api.us-east-1.amazonaws.com/prod/';
  const publishEndpoint = 'https://bba57yyk8f.execute-api.us-east-1.amazonaws.com/prod/';

  const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json'
      })
  };

  @Injectable({
    providedIn: 'root'
  })

  export class TweetService {
    //constructor() { }
    constructor(private http: HttpClient) { }

  private extractData(res: Response) {
      let body = res;
      return body || { };
  }

  addTweet (tweet): Observable<any> {
      console.log("TweetService.addTweet" + tweet);
      return this.http.post<any>(addEndpoint + 'tweet', JSON.stringify(tweet), httpOptions).pipe(
          tap((tweet) => console.log(`added tweet w/ id=${tweet.id}`))
      );
  }

  publishTweet (tweet): Observable<any> {
      console.log("TweetService.publishTweet" + tweet);
      return this.http.post<any>(publishEndpoint + 'publish', JSON.stringify(tweet), httpOptions).pipe(
          tap((tweet) => console.log(`published tweet w/ id=${tweet.resultsFound}`))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
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
