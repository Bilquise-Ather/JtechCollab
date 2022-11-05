import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private getAllColorsUrl = environment.url + "/api/common/get_all_colors";
  private addColorUrl = environment.url + "/api/common/add_color";

  private getAllThicknessUrl = environment.url + "/api/common/get_all_thickness";
  private addThicknessUrl = environment.url + "/api/common/add_thickness";
  private getAllLengthUrl = environment.url + "/api/common/get_all_length";
  private addLengthUrl = environment.url + "/api/common/add_length";
  private getAllMaterialUrl = environment.url + "/api/common/get_all_material";
  private addMaterialUrl = environment.url + "/api/common/add_material";
  private addProductUrl = environment.url + "/api/common/add_product";
  private getProductUrl = environment.url + "/api/common/get_product";
  private getSubProductUrl = environment.url + "/api/common/get_sub_product";
  private getProjectUrl = environment.url + "/api/common/get_project_detail";
  private getAllProductCategoryUrl = environment.url + "/api/common/get_all_product_category";

  private getAllProductSizeUrl = environment.url + "/api/common/get_all_product_size";
  private addSizeUrl = environment.url + "/api/common/add_size";

  private getAllWearLayerUrl = environment.url + "/api/common/get_all_wear_layer";
  private addWearLayerUrl = environment.url + "/api/common/add_wear_layer";

  private getAllPadUrl = environment.url + "/api/common/get_all_pad";
  private addPadUrl = environment.url + "/api/common/add_pad";

  private getAllCoreUrl = environment.url + "/api/common/get_all_core";
  private addCoreUrl = environment.url + "/api/common/add_core";
  private getAllProductListForSubProductUrl = environment.url + "/api/common/get_all_product_list_for_sub_product";
  private getAllProjectCategoryListUrl = environment.url + "/api/common/get_all_project_category_list";
  private getAllProjectListUrl = environment.url + "/api/common/get_all_project_list";


  private addSubProductUrl = environment.url + "/api/common/add_sub_product";
  private addProjectUrl = environment.url + "/api/common/add_project";

  private getAllProjectsUrl = environment.url + "/api/common/get_all_product_options";
  private deleteProjectsUrl = environment.url + "/api/common/remove_product_options/";

  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    return headers;
  }
  getAllProjects(data) {
    return this.http.post(this.getAllProjectsUrl, data, { 'headers': this.getHeader() });
  }
  deleteProjects(id) {
    return this.http.delete(this.deleteProjectsUrl + id, { 'headers': this.getHeader() })
  }

  getProduct(data) {
    return this.http.post(this.getProductUrl, data, { 'headers': this.getHeader() });
  }
  getAllProjectCategoryList(data){
    return this.http.post(this.getAllProjectCategoryListUrl, data, { 'headers': this.getHeader() });

  }
  getAllProjectList(data){
    return this.http.post(this.getAllProjectListUrl, data, { 'headers': this.getHeader() });

  }
  getSubProduct(data) {
    return this.http.post(this.getSubProductUrl, data, { 'headers': this.getHeader() });
  }

  getProject(data) {
    return this.http.post(this.getProjectUrl, data, { 'headers': this.getHeader() });
  }

  getAllColors(data) {
    return this.http.post(this.getAllColorsUrl, data, { 'headers': this.getHeader() });
  }

  addColor(data) {
    return this.http.post(this.addColorUrl, data, { 'headers': this.getHeader() });
  }

  addProject(data) {
    return this.http.post(this.addProjectUrl, data, { 'headers': this.getHeader() });
  }


  getAllThickness(data) {
    return this.http.post(this.getAllThicknessUrl, data, { 'headers': this.getHeader() });
  }

  addThickness(data) {
    return this.http.post(this.addThicknessUrl, data, { 'headers': this.getHeader() });
  }
  getAllLength(data) {
    return this.http.post(this.getAllLengthUrl, data, { 'headers': this.getHeader() });
  }

  addLength(data) {
    return this.http.post(this.addLengthUrl, data, { 'headers': this.getHeader() });
  }
  getAllMaterial(data) {
    return this.http.post(this.getAllMaterialUrl, data, { 'headers': this.getHeader() });
  }

  addMaterial(data) {
    return this.http.post(this.addMaterialUrl, data, { 'headers': this.getHeader() });
  }

  addProduct(data) {
    return this.http.post(this.addProductUrl, data, { 'headers': this.getHeader() });
  }
  getAllProductCategory(data) {
    return this.http.post(this.getAllProductCategoryUrl, data, { 'headers': this.getHeader() });
  }

  getAllProductSize(data) {
    return this.http.post(this.getAllProductSizeUrl, data, { 'headers': this.getHeader() });
  }
  addSize(data) {
    return this.http.post(this.addSizeUrl, data, { 'headers': this.getHeader() });
  }

  getAllCore(data) {
    return this.http.post(this.getAllCoreUrl, data, { 'headers': this.getHeader() });
  }

  addCore(data) {
    return this.http.post(this.addCoreUrl, data, { 'headers': this.getHeader() });
  }

  getAllPad(data) {
    return this.http.post(this.getAllPadUrl, data, { 'headers': this.getHeader() });
  }

  addPad(data) {
    return this.http.post(this.addPadUrl, data, { 'headers': this.getHeader() });
  }

  getAllWearLayer(data) {
    return this.http.post(this.getAllWearLayerUrl, data, { 'headers': this.getHeader() });
  }

  addWearLayer(data) {
    return this.http.post(this.addWearLayerUrl, data, { 'headers': this.getHeader() });
  }
  getAllProductListForSubProduct(data) {
    return this.http.post(this.getAllProductListForSubProductUrl, data, { 'headers': this.getHeader() });
  }
  addSubProduct(data) {
    return this.http.post(this.addSubProductUrl, data, { 'headers': this.getHeader() });
  }



}
