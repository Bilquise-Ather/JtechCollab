import { Component, OnInit, ViewChild } from '@angular/core';
import { ResourceOptionsService } from 'src/app/services/resource_options.service';
import { CommonService } from 'src/app/services/common.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { remove } from 'lodash-es';
import { Subscription, Subject } from 'rxjs';
import { environment } from "src/environments/environment";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
import { Router } from '@angular/router';
@Component({
  selector: 'resource_options-management',
  templateUrl: './resource_options-management.component.html',
  styleUrls: ['./resource_options-management.component.css']
})
export class ResourceOptionsManagementComponent implements OnInit {
  public loading: boolean = false;
  public filters:any = {};
  base_url = environment.url;
  public dialogType: string = "add";


  public paginationValues: Subject<any> = new Subject();
  public table_data: any[] = [];
  public resource_options: any = {};

  public recordLimit: number = 10;
  public modalRef: BsModalRef;
  constructor(private resourceOptionsService: ResourceOptionsService, private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService, private modalService: BsModalService, private router: Router, private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.getSlidersWithFilters({ page: 1 });

  }

  getSlidersWithFilters(event) {
    this.loading = true;
    return new Promise((resolve, reject) => {
      let params = {
        filters:{},
        page: event.page,
        limit: event.limit ? event.limit : this.recordLimit
      };
      this.recordLimit = params.limit;
      if(this.filters.searchtext) {
        params["filters"]["searchtext"] = this.filters.searchtext;
      }
      this.resourceOptionsService.getAllResourceOptions(params).subscribe((res: any) => {
        if (res.status == 200 && res.data) {
          this.resource_options = {};
          this.resource_options = JSON.parse(JSON.stringify(res.data));
          this.paginationValues.next({ type: 'page-init', page: params.page, totalTableRecords: res.data.total_count });
        } else if (res.status == 400) {
          this._toastMessageService.alert("error", res.data.msg);
        }
        this.loading = false;
        return resolve(true);
      }, (error) => {
        this.loading = false;
        this.commonHelper.showError(error);
        return resolve(false);
      })
    });
  }


  onClickAddProduct() {
    this.router.navigate(['/resource_options/add-resource_options']);
  }
  onClickEditSlider(resource_option) {
    this.router.navigate(['/resource_options/edit-resource_options/' + resource_option._id]);
  }
  onClickDeleteSlider(slider) {
    this.modalRef = this.modalService.show(ConfirmationModalComponent, { class: 'confirmation-modal', backdrop: 'static', keyboard: false });
    this.modalRef.content.decision = '';
    this.modalRef.content.confirmation_text = "Are you sure to delete this resource option?"
    var tempSubObj: Subscription = this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.decision == "done") {
        this.loading = true;
        this.resourceOptionsService.deleteResourceOptions(slider._id).subscribe((res: any) => {
          this.loading = false;
          if (res.status == 200) {
            remove(this.resource_options, (ub: any) => ub._id == slider._id);
            this._toastMessageService.alert("success", "Resource Options deleted successfully.");
          }
        }, (error) => {
          this.loading = false;
          this.commonHelper.showError(error);
        });
      }
      tempSubObj.unsubscribe();
    });
  }

}
