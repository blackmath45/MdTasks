import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WapiService
{

  private SERVER_URL = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  public fetchData()
  {
    return this.httpClient.get(`${this.SERVER_URL}/api/users`);
  }
}
