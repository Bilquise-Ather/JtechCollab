import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommonSettingsService {


  private getInitialDataUrl = environment.url + "/api/common_settings/get_common_settings";
  private updateCommonSettingsUrl = environment.url + "/api/common_settings/update_common_settings";

  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    return headers;
  }
  getInitialData() {
    return this.http.get(this.getInitialDataUrl, { 'headers': this.getHeader() });
  }

  updateCommonSettings(params) {
    return this.http.put(this.updateCommonSettingsUrl, params, { 'headers': this.getHeader() });
  }

}
