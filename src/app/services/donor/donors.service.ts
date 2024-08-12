import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Donor } from '../../../types';

@Injectable({
  providedIn: 'root'
})
export class DonorsService {

  constructor(private apiService: ApiService) { }

  getDonors = (url: string): Observable<Donor[]> => {
    return this.apiService.get<Donor[]>(url, 
      {
        responseType: 'json'
      }
    );       
  }
}
