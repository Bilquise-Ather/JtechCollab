import { Component, OnInit, ViewChild } from '@angular/core';
import { ResourceService } from 'src/app/services/resources.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { remove } from 'lodash-es';
import { Subscription, Subject } from 'rxjs';
import { environment } from "src/environments/environment";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
import { Router } from '@angular/router';
@Component({
  selector: 'resource-management',
  templateUrl: './resource-management.component.html',
  styleUrls: ['./resource-management.component.css']
})
export class ResourceManagementComponent implements OnInit {
  public loading: boolean = false;

  public filters:any = {};
  public resource_Obj: any = {}

  base_url = environment.url;
  public dialogType: string = "add";


  public paginationValues: Subject<any> = new Subject();

  public recordLimit: number = 10;
  public modalRef: BsModalRef;
  constructor(private resourceService: ResourceService, private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService, private modalService: BsModalService, private router: Router) {
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
      this.resourceService.getResource(params).subscribe((res: any) => {
        if (res.status == 200 && res.data) {
          this.resource_Obj = {};
          this.resource_Obj = JSON.parse(JSON.stringify(res.data));
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


  onClickAddResource() {
    this.router.navigate(['/resource/add-resource']);
  }
  onClickEditSlider(resource_Obj) {
    this.router.navigate(['/resource/edit-resource/' + resource_Obj._id]);
  }
  onClickDeleteSlider(resource_Obj) {
    this.modalRef = this.modalService.show(ConfirmationModalComponent, { class: 'confirmation-modal', backdrop: 'static', keyboard: false });
    this.modalRef.content.decision = '';
    this.modalRef.content.confirmation_text = "Are you sure to delete this?"
    var tempSubObj: Subscription = this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.decision == "done") {
        this.loading = true;
        this.resourceService.deleteResource(resource_Obj._id).subscribe((res: any) => {
          this.loading = false;
          if (res.status == 200) {
            remove(this.resource_Obj, (ub: any) => ub._id == resource_Obj._id);
            this._toastMessageService.alert("success", "Resource deleted successfully.");
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
