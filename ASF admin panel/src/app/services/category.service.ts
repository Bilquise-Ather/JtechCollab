import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  private addCategoryUrl = environment.url + "/api/category/add_category";
  private updateCategoryUrl = environment.url + "/api/category/update_category/";
  private getAllCategoryUrl = environment.url + "/api/category/get_all_category";
  private deleteCategoryUrl = environment.url + "/api/category/remove_category/";

  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    return headers;
  }

  addCategory(data) {
    return this.http.post(this.addCategoryUrl, data, { 'headers': this.getHeader() });
  }
  updateCategory(id, data) {
    return this.http.put(this.updateCategoryUrl + id, data, { 'headers': this.getHeader() });
  }
  getAllCategory(data) {
    return this.http.post(this.getAllCategoryUrl, data, { 'headers': this.getHeader() });
  }
  deleteCategory(id) {
    return this.http.delete(this.deleteCategoryUrl + id, { 'headers': this.getHeader() })
  }




}
