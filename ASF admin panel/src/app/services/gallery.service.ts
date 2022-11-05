import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GalleryService {


  private addGalleryUrl = environment.url + "/api/gallery/add_gallery";
  private updateGalleryUrl = environment.url + "/api/gallery/update_gallery/";
  private getAllGalleryUrl = environment.url + "/api/gallery/get_all_gallery";
  private deleteGalleryUrl = environment.url + "/api/gallery/remove_gallery/";

  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    return headers;
  }

  addGallery(data) {
    return this.http.post(this.addGalleryUrl, data, { 'headers': this.getHeader() });
  }
  updateGallery(id, data) {
    return this.http.put(this.updateGalleryUrl + id, data, { 'headers': this.getHeader() });
  }
  getAllGallery(data) {
    return this.http.post(this.getAllGalleryUrl, data, { 'headers': this.getHeader() });
  }
  deleteGallery(id) {
    return this.http.delete(this.deleteGalleryUrl + id, { 'headers': this.getHeader() })
  }

}
