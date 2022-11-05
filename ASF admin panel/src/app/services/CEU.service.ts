import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CEUService {


  private getCEUDataUrl = environment.url + "/api/CEU/get_CEU";
  private updateCEUUrl = environment.url + "/api/CEU/update_CEU";

  private addCEUSeoUrl = environment.url + "/api/CEU/add_CEU_seo";
  private getCEUSeoUrl = environment.url + "/api/CEU/get_CEU_seo";

  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    return headers;
  }
  getCEUData() {
    return this.http.get(this.getCEUDataUrl, { 'headers': this.getHeader() });
  }

  updateCEU(params) {
    return this.http.put(this.updateCEUUrl, params, { 'headers': this.getHeader() });
  }
  getCEUSeo(data) {
    return this.http.post(this.getCEUSeoUrl, data, { 'headers': this.getHeader() });
  }

  addCEUSeo(data) {
    return this.http.post(this.addCEUSeoUrl, data, { 'headers': this.getHeader() });
  }

}
