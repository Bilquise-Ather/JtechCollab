import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private rolesUrl = environment.url + '/api/module_management/get_roles_by_organization';
  private getRecruiterListUrl = environment.url + '/api/recruiter/get_recruiters';
  private getAdminManagerListUrl = environment.url + '/api/recruiter/get_admin_manager';
  private getOrganizationAllUsersListUrl = environment.url + '/api/recruiter/get_organization_all_users_list';
  private getUserUrl = environment.url + '/api/organization_management/get_organization_users';
  private postUserUrl = environment.url + '/api/organization_management/add_organization_user';
  private searchUrl = environment.url + '/api/organization_management/get_organization_users';
  private deleteUserUrl = environment.url + '/api/organization_management/remove_organization_user/';
  private updateUserUrl = environment.url + '/api/organization_management/update_organization_user/';
  private updateUserPasswordUrl = environment.url + '/api/organization_user/update_user_password/';
  private updatePasswordurl = environment.url + '/api/organization_user/password';
  private getProfileDataUrl = environment.url + '/api/organization_user/get_profile_data';
  private getOrganizationDataUrl = environment.url +
    '/api/organization_management/get_single_organization_data';
  private updateUserProfileUrl = environment.url + '/api/organization_user/update_profile_data';
  private updateOrganizationDataUrl = environment.url + '/api/organization_management/update_organization_data';
  private imageSource = new BehaviorSubject('default image');
  currentProfileImage = this.imageSource.asObservable();

  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('token') || '',
    });
    return headers;
  }

  getRoles() {
    return this.http.post(this.rolesUrl, {}, { headers: this.getHeader() });
  }

  addUser(data) {
    return this.http.post(this.postUserUrl, data, {
      headers: this.getHeader(),
    });
  }

  getUsers(filter) {
    return this.http.post(this.getUserUrl, filter, {
      headers: this.getHeader(),
    });
  }

  serachUser(filters) {
    return this.http.post(this.searchUrl, filters, {
      headers: this.getHeader(),
    });
  }

  deleteUser(id, data) {
    return this.http.patch(this.deleteUserUrl + id, data, {
      headers: this.getHeader(),
    });
  }

  updateUser(id, data) {
    return this.http.patch(this.updateUserUrl + id, data, {
      headers: this.getHeader(),
    });
  }

  updateUserPassword(id, data) {
    return this.http.patch(this.updateUserPasswordUrl + id, data, {
      headers: this.getHeader(),
    });
  }

  getRecruiterList(params) {
    return this.http.get(this.getRecruiterListUrl, {
      params: params,
      headers: this.getHeader(),
    });
  }

  getAdminManagerList() {
    return this.http.get(this.getAdminManagerListUrl, {
      headers: this.getHeader(),
    });
  }

  getOrganizationAllUsersList(params) {
    return this.http.get(this.getOrganizationAllUsersListUrl, {
      params: params,
      headers: this.getHeader(),
    });
  }

  updatePassword(data) {
    return this.http.patch(this.updatePasswordurl, data, {
      headers: this.getHeader(),
    });
  }
  getProfileData() {
    return this.http.get(this.getProfileDataUrl, { headers: this.getHeader() });
  }
  getOrganizationData() {
    return this.http.get(this.getOrganizationDataUrl, {
      headers: this.getHeader(),
    });
  }
  updateUserProfile(data) {
    return this.http.post(this.updateUserProfileUrl, data, {
      headers: this.getHeader(),
    });
  }
  updateOrganizationData(id, data) {
    return this.http.post(this.updateOrganizationDataUrl, data, {
      headers: this.getHeader(),
    });
  }

  changeImage(message: string) {
    this.imageSource.next(message);
  }
}
