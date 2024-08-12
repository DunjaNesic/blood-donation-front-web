import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Official } from '../../../types';

@Injectable({
  providedIn: 'root'
})
export class OfficialsService {

  constructor(private apiservice: ApiService) { }

  getOfficialByUserID(id: number): Observable<Official>{
    return this.apiservice.get<Official>(`/itk/officials/${id}`);
  }

  getAll(url: string, officialsID?: number): Observable<Official[]> {
    return this.apiservice.get<Official[]>(`${url}?officialsID=${officialsID}`);
  }
}
