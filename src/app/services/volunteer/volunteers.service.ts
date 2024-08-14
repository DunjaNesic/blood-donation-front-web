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

  createCallToVolunteer(url: string, body: any): Observable<any> {
    return this.apiService.post<any>(url, body, {});
  }

  getCalledVolunteers(actionID: number): Observable<Volunteer[]> {
    const url = `/itk/actions/called-volunteers?actionID=${actionID}`;
    return this.apiService.get<Volunteer[]>(url, {
      responseType: 'json'
    });
  }
}
