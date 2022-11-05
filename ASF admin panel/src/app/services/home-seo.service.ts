import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HomeSeoService {
  private addHomeSeoUrl = environment.url + "/api/home_seo/add_home_seo";
  private getHomeSeoUrl = environment.url + "/api/home_seo/get_home_seo";


  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    return headers;
  }
  getHomeSeo(data) {
    return this.http.post(this.getHomeSeoUrl, data, { 'headers': this.getHeader() });
  }

  addHomeSeo(data) {
    return this.http.post(this.addHomeSeoUrl, data, { 'headers': this.getHeader() });
  }
}
