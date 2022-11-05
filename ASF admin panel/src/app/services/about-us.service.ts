import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {


  private getAboutUsUrl = environment.url + "/api/about_us/get_about_us";
  private addAboutUsUrl = environment.url + "/api/about_us/add_about_us";

  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    return headers;
  }
  getAboutUs() {
    return this.http.get(this.getAboutUsUrl, { 'headers': this.getHeader() });
  }

  addAboutUs(params) {
    return this.http.post(this.addAboutUsUrl, params, { 'headers': this.getHeader() });
  }

}
