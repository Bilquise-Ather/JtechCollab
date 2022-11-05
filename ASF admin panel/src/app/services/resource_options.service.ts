import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ResourceOptionsService {

  private getAllResourceOptionsUrl = environment.url + "/api/resource_options/get_all_resource_options";
  private deleteResourceOptionsUrl = environment.url + "/api/resource_options/remove_resource_options/";
  private getResourceOptionsUrl = environment.url + "/api/resource_options/addresource_options";
  private getAllResourceOptionsToEditUrl = environment.url + "/api/resource_options/edit_resource_options";
  private getAllResourceListForResourceOptionsUrl = environment.url + "/api/resource_options/get_resource_list_for_resource_options";
  private addResourceOptionUrl = environment.url + "/api/resource_options/add_resource_options";

  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    return headers;
  }
  getResourceOptions(data) {
    return this.http.post(this.getResourceOptionsUrl, data, { 'headers': this.getHeader() });
  }
  getAllResourceOptions(data) {
    return this.http.post(this.getAllResourceOptionsUrl, data, { 'headers': this.getHeader() });
  }
  deleteResourceOptions(id) {
    return this.http.delete(this.deleteResourceOptionsUrl + id, { 'headers': this.getHeader() })
  }
  getResourceOptionsToEdit(data) {
    return this.http.post(this.getAllResourceOptionsToEditUrl, data, { 'headers': this.getHeader() });
  }
  getAllResourceListForResourceOptions(data) {
    return this.http.post(this.getAllResourceListForResourceOptionsUrl, data, { 'headers': this.getHeader() });
  }
  addResourceOption(data) {
    return this.http.post(this.addResourceOptionUrl, data, { 'headers': this.getHeader() });
  }
}
