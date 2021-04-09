import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

  const addEndpoint = 'https://ufzauad358.execute-api.us-east-1.amazonaws.com/prod/';
  const publishEndpoint = 'https://bba57yyk8f.execute-api.us-east-1.amazonaws.com/prod/';
  const searchTweetByDateEndpoint = 'https://q1ytn80oe2.execute-api.us-east-1.amazonaws.com/prod/';
  const searchTweetBytextEndpoint = 'https://faabpshtoe.execute-api.us-east-1.amazonaws.com/prod/';
  const updateTweetEndpoint = 'https://jqgrx6olxi.execute-api.us-east-1.amazonaws.com/prod/';
  const deleteTweetEndpoint = 'https://faabpshtoe.execute-api.us-east-1.amazonaws.com/prod/';
  const cloneTweetEndpoint = 'https://faabpshtoe.execute-api.us-east-1.amazonaws.com/prod/';

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
            tap((tweet) => console.log(JSON.parse(tweet).resultsFound))
        );
    }

    searchTweetByDate (searchData): Observable<any> {
        console.log("TweetService.searchTweetByDate" + searchData);
        return this.http.post<any>(searchTweetByDateEndpoint + 'tweets', JSON.stringify(searchData), httpOptions).pipe(
            tap((tweet) => console.log(tweet))
        );
    }

    searchTweetByText (searchData): Observable<any> {
        console.log("TweetService.searchTweetByText" + searchData);
        return this.http.get<any>(searchTweetBytextEndpoint + 'tweets?searchText=' + searchData.text, httpOptions).pipe(
            tap((tweet) => console.log(tweet))
        );
    }

    deleteTweetById (id: string): Observable<any> {
        console.log("TweetService.deleteTweetById" + id);
        return this.http.delete<any>(deleteTweetEndpoint + 'tweets?id=' + id, httpOptions).pipe(
            tap((tweet) => console.log(tweet))
        );
    }

    cloneTweetById (id: any): Observable<any> {
        console.log("TweetService.cloneTweetById" + id);
        return this.http.post<any>(cloneTweetEndpoint + 'tweets', JSON.stringify(id), httpOptions).pipe(
            tap((newTweet) => console.log(`cloned tweet w/ id=${newTweet.id}`))
        );
    }

    updateTweet (tweet): Observable<any> {
        console.log("TweetService.updateTweet" + tweet);
        console.log(tweet);
        var id = tweet.id;
        return this.http.put<any>(updateTweetEndpoint + 'tweets', JSON.stringify(tweet), httpOptions).pipe(
            tap((tweet) => console.log(`updated tweet w/ id=${id}`))
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
