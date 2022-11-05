import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ResourceService {


  private addResourceUrl = environment.url + "/api/resource/add_resource";
  private updateResourceUrl = environment.url + "/api/resource/update_resource/";
  private getAllResourceUrl = environment.url + "/api/resource/get_all_resource";
  private getAllResourceToEditUrl = environment.url + "/api/resource/edit_resource";
  private deleteResourceUrl = environment.url + "/api/resource/remove_resource/";

  private addResourceSeoUrl = environment.url + "/api/resource/add_resource_seo";
  private getResourceSeoUrl = environment.url + "/api/resource/get_resource_seo";

  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    return headers;
  }
  getResource(data) {
    return this.http.post(this.getAllResourceUrl, data, { 'headers': this.getHeader() });
  }
  addResource(data) {
    return this.http.post(this.addResourceUrl, data, { 'headers': this.getHeader() });
  }
  updateResource(id, data) {
    return this.http.put(this.updateResourceUrl + id, data, { 'headers': this.getHeader() });
  }
  deleteResource(id) {
    return this.http.delete(this.deleteResourceUrl + id, { 'headers': this.getHeader() })
  }
  getResourceToEdit(data) {
    return this.http.post(this.getAllResourceToEditUrl, data, { 'headers': this.getHeader() });
  }
  getResourceSeo(data) {
    return this.http.post(this.getResourceSeoUrl, data, { 'headers': this.getHeader() });
  }

  addResourceSeo(data) {
    return this.http.post(this.addResourceSeoUrl, data, { 'headers': this.getHeader() });
  }
}
