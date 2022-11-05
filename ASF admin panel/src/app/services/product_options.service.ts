import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductOptionsService {


  private getAllProductOptionsUrl = environment.url + "/api/product_options/get_all_product_options";
  private deleteProductOptionsUrl = environment.url + "/api/product_options/remove_product_options/";
  private getProductOptionsUrl = environment.url + "/api/product_options/addproduct_options";
  private duplicateProductOptionsUrl = environment.url + "/api/common/duplicateproduct_options";

  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    return headers;
  }
  getProductOptions(data) {
    return this.http.post(this.getProductOptionsUrl, data, { 'headers': this.getHeader() });
  }
  getAllProductOptions(data) {
    return this.http.post(this.getAllProductOptionsUrl, data, { 'headers': this.getHeader() });
  }
  deleteProductOptions(id) {
    return this.http.delete(this.deleteProductOptionsUrl + id, { 'headers': this.getHeader() })
  }
  duplicateProductOptions(data) {
    return this.http.post(this.duplicateProductOptionsUrl , data, { 'headers': this.getHeader() })
  }

}
