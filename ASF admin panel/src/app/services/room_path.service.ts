import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RoomPathService {


  private addSliderUrl = environment.url + "/api/rooms_path/add_slider";
  private updateSliderUrl = environment.url + "/api/rooms_path/update_slider/";
  private getAllSliderUrl = environment.url + "/api/rooms_path/get_all_slides";

  private getAllRoomsUrl = environment.url + "/api/rooms_path/get_all_rooms";
  private getAllProductOptionsUrl = environment.url + "/api/rooms_path/get_all_product_options";

  private deleteSliderUrl = environment.url + "/api/rooms_path/remove_slide/";

  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    return headers;
  }

  addSlider(data) {
    return this.http.post(this.addSliderUrl, data, { 'headers': this.getHeader() });
  }
  updateSlider(id, data) {
    return this.http.put(this.updateSliderUrl + id, data, { 'headers': this.getHeader() });
  }
  getAllSlider(data) {
    return this.http.post(this.getAllSliderUrl, data, { 'headers': this.getHeader() });
  }
  getAllRooms(data) {
    return this.http.post(this.getAllRoomsUrl, data, { 'headers': this.getHeader() });
  }
  getAllProductOptions(data) {
    return this.http.post(this.getAllProductOptionsUrl, data, { 'headers': this.getHeader() });
  }
  deleteSlider(id) {
    return this.http.delete(this.deleteSliderUrl + id, { 'headers': this.getHeader() })
  }




}
