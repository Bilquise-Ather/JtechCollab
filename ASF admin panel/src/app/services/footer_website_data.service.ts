import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FooterWebsiteDataService {

  private addFooterWebsiteDataUrl = environment.url + "/api/footer_website_data/add_footer_website_data";
  private getFooterWebsiteDataUrl = environment.url + "/api/footer_website_data/get_footer_website_data";

  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    return headers;
  }
  addFooterWebsiteData(data) {
    return this.http.post(this.addFooterWebsiteDataUrl, data, { 'headers': this.getHeader() });
  }
  getFooterWebsiteData(data) {
    return this.http.post(this.getFooterWebsiteDataUrl, data, { 'headers': this.getHeader() });
  }
}
