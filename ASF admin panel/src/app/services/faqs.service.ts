import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FaqsService {


  private addFaqsUrl = environment.url + "/api/faqs/add_faqs";
  private updateFaqsUrl = environment.url + "/api/faqs/update_faqs/";
  private getAllFaqsUrl = environment.url + "/api/faqs/get_all_faqs";
  private deleteFaqsUrl = environment.url + "/api/faqs/remove_faqs/";

  private addFaqsSeoUrl = environment.url + "/api/faqs/add_faqs_seo";
  private getFaqsSeoUrl = environment.url + "/api/faqs/get_faqs_seo";

  private addSearchSeoUrl = environment.url + "/api/faqs/add_search_seo";
  private getSearchSeoUrl = environment.url + "/api/faqs/get_search_seo";

  private addGallerySeoUrl = environment.url + "/api/faqs/add_gallery_seo";
  private getGallerySeoUrl = environment.url + "/api/faqs/get_gallery_seo";

  private addProjectSeoUrl = environment.url + "/api/faqs/add_project_seo";
  private getProjectSeoUrl = environment.url + "/api/faqs/get_project_seo";

  private addVisualiserSeoUrl = environment.url + "/api/faqs/add_visualiser_seo";
  private getVisualiserSeoUrl = environment.url + "/api/faqs/get_visualiser_seo";


  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    return headers;
  }
  addFaqs(data) {
    return this.http.post(this.addFaqsUrl, data, { 'headers': this.getHeader() });
  }
  updateFaqs(id, data) {
    return this.http.put(this.updateFaqsUrl + id, data, { 'headers': this.getHeader() });
  }
  getAllFaqs(data) {
    return this.http.post(this.getAllFaqsUrl, data, { 'headers': this.getHeader() });
  }
  deleteFaqs(id) {
    return this.http.delete(this.deleteFaqsUrl + id, { 'headers': this.getHeader() })
  }
  getFaqsSeo(data) {
    return this.http.post(this.getFaqsSeoUrl, data, { 'headers': this.getHeader() });
  }

  addFaqsSeo(data) {
    return this.http.post(this.addFaqsSeoUrl, data, { 'headers': this.getHeader() });
  }

  getSearchSeo(data) {
    return this.http.post(this.getSearchSeoUrl, data, { 'headers': this.getHeader() });
  }

  addSearchSeo(data) {
    return this.http.post(this.addSearchSeoUrl, data, { 'headers': this.getHeader() });
  }

  getGallerySeo(data) {
    return this.http.post(this.getGallerySeoUrl, data, { 'headers': this.getHeader() });
  }

  addGallerySeo(data) {
    return this.http.post(this.addGallerySeoUrl, data, { 'headers': this.getHeader() });
  }

  getProjectSeo(data) {
    return this.http.post(this.getProjectSeoUrl, data, { 'headers': this.getHeader() });
  }

  addProjectSeo(data) {
    return this.http.post(this.addProjectSeoUrl, data, { 'headers': this.getHeader() });
  }
  getVisualiserSeo(data) {
    return this.http.post(this.getVisualiserSeoUrl, data, { 'headers': this.getHeader() });
  }

  addVisualiserSeo(data) {
    return this.http.post(this.addVisualiserSeoUrl, data, { 'headers': this.getHeader() });
  }
}
