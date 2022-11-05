import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CollectionService {


  private addCollectionSliderUrl = environment.url + "/api/collection/add_collection";
  private updateCollectionSliderUrl = environment.url + "/api/collection/update_collection/";
  private getAllCollectionSliderUrl = environment.url + "/api/collection/get_all_collection";
  private deleteCollectionSliderUrl = environment.url + "/api/collection/remove_collection/";
  private getSingleCollectionDataUrl = environment.url + "/api/collection/get_single_collection";


  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    return headers;
  }

  getSingleCollectionData(data) {
    return this.http.post(this.getSingleCollectionDataUrl, data, { 'headers': this.getHeader() });
  }

  addCollection(data) {
    return this.http.post(this.addCollectionSliderUrl, data, { 'headers': this.getHeader() });
  }
  updateCollection(id, data) {
    return this.http.put(this.updateCollectionSliderUrl + id, data, { 'headers': this.getHeader() });
  }
  getAllCollection(data) {
    return this.http.post(this.getAllCollectionSliderUrl, data, { 'headers': this.getHeader() });
  }
  deleteCollection(id) {
    return this.http.delete(this.deleteCollectionSliderUrl + id, { 'headers': this.getHeader() })
  }




}
