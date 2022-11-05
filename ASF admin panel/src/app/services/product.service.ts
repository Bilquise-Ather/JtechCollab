import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private addProductUrl = environment.url + "/api/product/add_product";
  private updateProductUrl = environment.url + "/api/product/update_product/";
  private getAllProductUrl = environment.url + "/api/product/get_all_product";
  private deleteProductUrl = environment.url + "/api/product/remove_product/";
  private getProductUrl = environment.url + "/api/product/add_product";

  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    return headers;
  }
  getProduct(data) {
    return this.http.post(this.getProductUrl, data, { 'headers': this.getHeader() });
  }
  addProduct(data) {
    return this.http.post(this.addProductUrl, data, { 'headers': this.getHeader() });
  }
  updateProduct(id, data) {
    return this.http.put(this.updateProductUrl + id, data, { 'headers': this.getHeader() });
  }
  getAllProduct(data) {
    return this.http.post(this.getAllProductUrl, data, { 'headers': this.getHeader() });
  }
  deleteProduct(id) {
    return this.http.delete(this.deleteProductUrl + id, { 'headers': this.getHeader() })
  }

}
