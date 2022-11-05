import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TermConditionsService {

  private addTermsConditionUrl = environment.url + "/api/term_conditions/add_terms_condition";
  private getTermsConditionUrl = environment.url + "/api/term_conditions/get_terms_condition";

  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    return headers;
  }
  addTermsCondition(data) {
    return this.http.post(this.addTermsConditionUrl, data, { 'headers': this.getHeader() });
  }
  getTermsCondition(data) {
    return this.http.post(this.getTermsConditionUrl, data, { 'headers': this.getHeader() });
  }
}
