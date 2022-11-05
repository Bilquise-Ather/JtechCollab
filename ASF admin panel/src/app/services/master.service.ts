import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  constructor(private http: HttpClient) { }

  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    return headers;
  }

  getAllTechnologyList() {
    return this.http.get(environment.url + "/api/questions_master/get_all_technology", { headers: this.getHeader() });
  }

  getAllPositionAppliedForList() {
    return this.http.get(environment.url + "/api/questions_master/get_all_position_applied_for", { headers: this.getHeader() });
  }
}
