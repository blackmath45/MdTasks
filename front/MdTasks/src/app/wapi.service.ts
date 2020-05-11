import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { from, Observable, throwError, of } from 'rxjs';
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

  public getTasks()
  {
    return this.httpClient.get(`${this.SERVER_URL}/tasks`).pipe(
      map((data: Task[]) =>
      {
        const res = { 'status' : 'GOOD', 'data' : data}
        return res;
      }),
      retry(1),
      catchError(error =>
        {
          const res = { 'status' : 'BAD', 'data' : error.message};
          return of(res);
        })
      )
    };

  public updateTaskCompartiment(id, id_compartiment)
  {
/*
    login(username, password): Observable<any> {
  const body = new HttpParams()
    .set('username', username)
    .set('password', password);

  return this.http.post('/login',
    body.toString(),
    {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    }
  );
}*/
    const body = new HttpParams()
      .set('ID_Compartiment', id_compartiment);

    return this.httpClient.patch(`${this.SERVER_URL}/tasks/compartiment/` + id, body).pipe(
      map((data) =>
      {
        const res = { 'status' : 'GOOD', 'data' : data}
        return res;
      }),
      retry(1),
      catchError(error =>
        {
          const res = { 'status' : 'BAD', 'data' : error.message};
          return of(res);
        })
      )
    };

  public getCompartiments()// : Observable<Object>
  {
    return this.httpClient.get(`${this.SERVER_URL}/compartiments`).pipe(
      map((data: Task[]) =>
      {
        const res = { 'status' : 'GOOD', 'data' : data}
        return res;
      }),
      retry(1),
      catchError(error =>
        {
          const res = { 'status' : 'BAD', 'data' : error.message};
          return of(res);
        })
      )
  };

}
