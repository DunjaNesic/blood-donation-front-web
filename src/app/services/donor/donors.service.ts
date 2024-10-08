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

  createCallToDonor(url: string, body: any): Observable<any> {
    return this.apiService.post<any>(url, body, {});
  }

  getCalledDonors(actionID: number): Observable<Donor[]> {
    const url = `/itk/actions/called-donors?actionID=${actionID}`;
    return this.apiService.get<Donor[]>(url, {
      responseType: 'json'
    });
  }

  getPresentActionDonors(actionID: number): Observable<any[]> {
    const url = `/itk/donors/present?actionID=${actionID}`;
    return this.apiService.get<any[]>(url);
  }

}
