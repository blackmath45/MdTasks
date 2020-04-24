import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class WapiService
{

  private SERVER_URL = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  public getTasks()
  {
    return this.httpClient.get(`${this.SERVER_URL}/tasks`);
  }

  public getCompartiments()
  {
    return this.httpClient.get(`${this.SERVER_URL}/compartiments`);
  }
}
