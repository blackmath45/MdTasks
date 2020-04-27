import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})

export class WapiService
{

  private SERVER_URL = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

//https://blog.angular-university.io/rxjs-error-handling/
//https://angular.io/tutorial/toh-pt4#why-services
//https://www.pluralsight.com/guides/sending-request-processing-mapped-response-retrieve-data

/*
  handleError(error)
  {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent)
      {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
      }
      else
      {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
  }*/

  public getTasks()
  {
    //return this.httpClient.get(`${this.SERVER_URL}/tasks`).pipe(retry(1),catchError(this.handleError));

    /*return this.httpClient.get(`${this.SERVER_URL}/tasks`).pipe(
    catchError(err => {
    console.log('Handling error locally and rethrowing it...', err);
    return throwError(err);
  })
)
.subscribe(
res => {
let data = { 'status' : 'GOOD', 'data' : res}
console.log(data);
//return res;
},
err => {
let data = { 'status' : 'BAD', 'data' : err}
console.log(data);
//console.log('HTTP Error', err)
},
() => console.log('HTTP request completed.')
);*/



  return this.httpClient.get(`${this.SERVER_URL}/tasks`).pipe(
    map((data: Task[]) =>
    {
      console.log(typeof(data));
      return data;
    }), catchError( error =>
      {
      return throwError( 'Something went wrong!' );
    })
)
/*

return this.http.get<SomeType>(url, {headers: this.headers})
  .pipe(
     map( response => {  // NOTE: response is of type SomeType
         // Does something on response.data
         // modify the response.data as you see fit.

         // return the modified data:
         return response; // kind of useless
     }),
     catchError( error => {
         throwError(error); // From 'rxjs'
     })
  ); // end of pipe

*/

  };

  public getCompartiments() : Observable<Object>
  {
    return this.httpClient.get(`${this.SERVER_URL}/compartiments`);//.pipe(retry(1),catchError(this.handleError));
  };

}
