import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  BASE_URL = environment.BASE_URL;
  constructor(private http: HttpClient) { }

  postRequest(uri: string, data: any) {
    return this.http.post(`${this.BASE_URL}${uri}`, data).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getRequest(uri: string) {
    return this.http.get(`${this.BASE_URL}${uri}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateRequest(uri: string, data: any) {
    return this.http.put(`${this.BASE_URL}${uri}`, data).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteRequest(uri: string, data = {}) {
    return this.http.delete(`${this.BASE_URL}${uri}`, {body: data}).pipe(
      map(response => {
        return response;
      })
    );
  }


 

}