import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { PaginationParams, TransfusionAction } from '../../../types';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  constructor(private apiService: ApiService) { }

  getActions = (url: string, params: PaginationParams): Observable<TransfusionAction[]> => {
    return this.apiService.get<TransfusionAction[]>(url, 
      {
        params,
        responseType: 'json'
      }
    );       
  }
}
