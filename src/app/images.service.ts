import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

  const imagesAPIEndpoint = 'https://xb0qdcz4s7.execute-api.us-east-1.amazonaws.com/prod/images';
  
  const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json'
      })
  };

  @Injectable({
    providedIn: 'root'
  })

  export class ImagesService {
    //constructor() { }
    constructor(private http: HttpClient) { }

  private extractData(res: Response) {
      let body = res;
      return body || { };
  }

    getImages (id: string): Observable<any> {
        console.log("ImagesService.getImages" + id);
        return this.http.get<any>(`${imagesAPIEndpoint}?id=${id}`, httpOptions).pipe(
            tap((images) => console.log(`added tweet w/ id=${images.image1}`))
        );
    }

    updateImage (image): Observable<any> {
        console.log("ImagesService.updateImage" + image);

        return this.http.put<any>(imagesAPIEndpoint, JSON.stringify(image), httpOptions).pipe(
            tap((result) => console.log("updated images" + result.affectedRows))
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
