import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PrivacyPolicyService {


  private addPrivacyPolicyUrl = environment.url + "/api/privacy_policy/add_privacy_policy";
  private getPrivacyPolicyUrl = environment.url + "/api/privacy_policy/get_privacy_policy";


  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    return headers;
  }
  getPrivacyPolicy(data) {
    return this.http.post(this.getPrivacyPolicyUrl, data, { 'headers': this.getHeader() });
  }

  addPrivacyPolicy(data) {
    return this.http.post(this.addPrivacyPolicyUrl, data, { 'headers': this.getHeader() });
  }
}
