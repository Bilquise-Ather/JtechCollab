import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TilesService {

  private addTiles19Url = environment.url + "/api/tiles/add_tiles19";
  private getTiles19Url = environment.url + "/api/tiles/get_tiles19";
  private addTiles24Url = environment.url + "/api/tiles/add_tiles24";
  private getTiles24Url = environment.url + "/api/tiles/get_tiles24";
  private getAllTilesListUrl = environment.url + "/api/tiles/get_tiles_for_admin";

  private addTilesDataUrl = environment.url + "/api/tiles/add_tile_data";
  private updateTilesDataUrl = environment.url + "/api/tiles/update_tile_data/";
  private getAllTilesDataUrl = environment.url + "/api/tiles/get_all_tile_data";
  private deleteTilesDataUrl = environment.url + "/api/tiles/remove_tile_data/";

  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    return headers;
  }
  addTiles19(data) {
    return this.http.post(this.addTiles19Url, data, { 'headers': this.getHeader() });
  }
  getTiles19(data) {
    return this.http.post(this.getTiles19Url, data, { 'headers': this.getHeader() });
  }
  addTiles24(data) {
    return this.http.post(this.addTiles24Url, data, { 'headers': this.getHeader() });
  }
  getTiles24(data) {
    return this.http.post(this.getTiles24Url, data, { 'headers': this.getHeader() });
  }
  getAllTilesList(data) {
    return this.http.post(this.getAllTilesListUrl, data, { 'headers': this.getHeader() });
  }


  addTilesData(data) {
    return this.http.post(this.addTilesDataUrl, data, { 'headers': this.getHeader() });
  }
  updateTilesData(id, data) {
    return this.http.put(this.updateTilesDataUrl + id, data, { 'headers': this.getHeader() });
  }
  getAllTilesData(data) {
    return this.http.post(this.getAllTilesDataUrl, data, { 'headers': this.getHeader() });
  }
  deleteTilesData(id) {
    return this.http.delete(this.deleteTilesDataUrl + id, { 'headers': this.getHeader() })
  }


}
