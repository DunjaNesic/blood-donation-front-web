import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from '../../types';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.baseUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  get<T>(url: string, options?: Options): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}${url}`, options) as Observable<T>;
  }

  post<T>(url: string, body: any, options: any): Observable<T>{
    return this.httpClient.post<T>(`${this.baseUrl}${url}`, body, options) as Observable<T>;  
  }

  put<T>(url: string, body: any, options?: Options): Observable<T> {
    return this.httpClient.put<T>(`${this.baseUrl}${url}`, body, options) as Observable<T>;
  }
}
