import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Volunteer } from '../../../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VolunteersService {

  constructor(private apiService: ApiService) { }

  getVolunteers = (url: string): Observable<Volunteer[]> => {
    return this.apiService.get<Volunteer[]>(url, 
      {
        responseType: 'json'
      }
    );       
  }
}
