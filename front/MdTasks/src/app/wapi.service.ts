import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class WapiService
{

  private SERVER_URL = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  handleError(error) {
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
  }

  public getTasks()
  {
    return this.httpClient.get(`${this.SERVER_URL}/tasks`).pipe(retry(1),catchError(this.handleError));
  }

  public getCompartiments() : Observable
  {
    return this.httpClient.get(`${this.SERVER_URL}/compartiments`).pipe(retry(1),catchError(this.handleError));
  }

}
