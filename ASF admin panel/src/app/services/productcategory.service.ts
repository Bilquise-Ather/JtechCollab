import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {


  private addProductCategoryUrl = environment.url + "/api/product_category/add_product_category";
  private updateProductCategoryUrl = environment.url + "/api/product_category/update_product_category/";
  private getAllProductCategoryUrl = environment.url + "/api/product_category/get_all_product_category";
  private deleteProductCategoryUrl = environment.url + "/api/product_category/remove_product_category/";

  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    return headers;
  }

  addProductCategory(data) {
    return this.http.post(this.addProductCategoryUrl, data, { 'headers': this.getHeader() });
  }
  updateProductCategory(id, data) {
    return this.http.put(this.updateProductCategoryUrl + id, data, { 'headers': this.getHeader() });
  }
  getAllProductCategory(data) {
    return this.http.post(this.getAllProductCategoryUrl, data, { 'headers': this.getHeader() });
  }
  deleteProductCategory(id) {
    return this.http.delete(this.deleteProductCategoryUrl + id, { 'headers': this.getHeader() })
  }

}
