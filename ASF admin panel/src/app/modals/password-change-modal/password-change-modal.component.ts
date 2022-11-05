import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BaseModalComponent } from 'src/app/modals/base-modal.component';
import { UserService } from 'src/app/services/user.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { CommonHelper } from 'src/app/helpers/common.helper';

@Component({
  selector: 'add-password-change-modal',
  templateUrl: './password-change-modal.template.html',
  styleUrls: ['./password-change-modal.component.css']
})

export class PasswordChangeModalComponent extends BaseModalComponent implements OnInit {
  loading: boolean = false;
  decision: string = '';
  dialogType: string = "";
  user_obj: any = {_id:null,"first_name":null,"last_name":null,middle_name:null,"phone_number":null,"email":null,password:null,"is_active":false,roles:[],managed_by:null};/*user_type:""*/  dialogResult: any;
  constructor(public modalRef: BsModalRef,private _toastMessageService:ToastMessageService,
    private commonHelper:CommonHelper,private userService: UserService) { super(modalRef); }

  ngOnInit() {
  }

  onClose() {
    this.decision='';
    this.close(true);
  }

  done() {
    this.decision='done';
    this.close(true);
  }


  updateUser() {
    let params = {
      _id: this.user_obj._id,
      password: this.user_obj.password,
      force: 0,
      sendmail: 0
    }

    this.loading = true;
    this.userService.updateUserPassword(localStorage.user_id, params).subscribe((res:any) => {
      this.loading = false;
      if(res.status == 200) {
        if(res.data){
        this._toastMessageService.alert("success","Password changed successfully. Please login using new password");
        this.dialogResult = "done";
        this.done();
        }else{
        this._toastMessageService.alert("error","Issue while changing password. please contact administrator");
        this.dialogResult = "error";
        }

      } else {
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }
}
