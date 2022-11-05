import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class IconService {


  private addIconUrl = environment.url + "/api/icon/add_icon";
  private updateIconUrl = environment.url + "/api/icon/update_icon/";
  private getAllIconUrl = environment.url + "/api/icon/get_all_icon";
  private deleteIconUrl = environment.url + "/api/icon/remove_icon/";

  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    return headers;
  }

  addIcon(data) {
    return this.http.post(this.addIconUrl, data, { 'headers': this.getHeader() });
  }
  updateIcon(id, data) {
    return this.http.put(this.updateIconUrl + id, data, { 'headers': this.getHeader() });
  }
  getAllIcon(data) {
    return this.http.post(this.getAllIconUrl, data, { 'headers': this.getHeader() });
  }
  deleteIcon(id) {
    return this.http.delete(this.deleteIconUrl + id, { 'headers': this.getHeader() })
  }

}
