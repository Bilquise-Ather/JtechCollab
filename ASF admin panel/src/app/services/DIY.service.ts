import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DIYService {


  private addDIYUrl = environment.url + "/api/DIY/add_DIY";
  private updateDIYUrl = environment.url + "/api/DIY/update_DIY/";
  private getAllDIYUrl = environment.url + "/api/DIY/get_all_DIY";
  private deleteDIYUrl = environment.url + "/api/DIY/remove_DIY/";

  private addDIYSeoUrl = environment.url + "/api/DIY/add_DIY_seo";
  private getDIYSeoUrl = environment.url + "/api/DIY/get_DIY_seo";


  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    return headers;
  }

  addDIY(data) {
    return this.http.post(this.addDIYUrl, data, { 'headers': this.getHeader() });
  }
  updateDIY(id, data) {
    return this.http.put(this.updateDIYUrl + id, data, { 'headers': this.getHeader() });
  }
  getAllDIY(data) {
    return this.http.post(this.getAllDIYUrl, data, { 'headers': this.getHeader() });
  }
  deleteDIY(id) {
    return this.http.delete(this.deleteDIYUrl + id, { 'headers': this.getHeader() })
  }

  getDIYSeo(data) {
    return this.http.post(this.getDIYSeoUrl, data, { 'headers': this.getHeader() });
  }

  addDIYSeo(data) {
    return this.http.post(this.addDIYSeoUrl, data, { 'headers': this.getHeader() });
  }
}
