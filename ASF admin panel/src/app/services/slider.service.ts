import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SliderService {


  private addSliderUrl = environment.url + "/api/home_slider/add_slider";
  private updateSliderUrl = environment.url + "/api/home_slider/update_slider/";
  private getAllSliderUrl = environment.url + "/api/home_slider/get_all_slides";
  private deleteSliderUrl = environment.url + "/api/home_slider/remove_slide/";

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
  deleteSlider(id) {
    return this.http.delete(this.deleteSliderUrl + id, { 'headers': this.getHeader() })
  }




}
