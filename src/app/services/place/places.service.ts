import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Place } from '../../../types';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private apiService: ApiService) { }

  getAll = (url: string): Observable<Place[]> => {
    return this.apiService.get<Place[]>(url, 
      {
        responseType: 'json'
      }
    );       
  }
}
