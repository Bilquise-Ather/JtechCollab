import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductOptionsService } from 'src/app/services/product_options.service';
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
  selector: 'projects-management',
  templateUrl: './projects-management.component.html',
  styleUrls: ['./projects-management.component.css']
})
export class ProjectsManagementComponent implements OnInit {
  public loading: boolean = false;

  public filters:any = {};



  public slider_obj: any = {}

  base_url = environment.url;
  public dialogType: string = "add";


  public paginationValues: Subject<any> = new Subject();
  public table_data: any[] = [];

  public recordLimit: number = 10;
  public modalRef: BsModalRef;
  constructor(private productOptionsService: ProductOptionsService, private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService, private modalService: BsModalService, private router: Router, private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.getSlidersWithFilters({ page: 1 });

  }

  getSlidersWithFilters(event) {
    this.loading = true;
    return new Promise((resolve, reject) => {
      let params = {
        filters: {},
        page: event.page,
        limit: event.limit ? event.limit : this.recordLimit
      };
      this.recordLimit = params.limit;
      if(this.filters.searchtext) {
        params["filters"]["searchtext"] = this.filters.searchtext;
      }
      this.commonService.getAllProjects(params).subscribe((res: any) => {

        if (res.status == 200 && res.data.slides) {
          this.table_data = [];
          this.table_data = JSON.parse(JSON.stringify(res.data.slides));
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
    this.router.navigate(['/projects/add-project']);
  }
  onClickEditSlider(slider) {

    this.router.navigate(['/projects/edit-project/' + slider._id]);
  }
  onClickDeleteSlider(slider) {
    this.modalRef = this.modalService.show(ConfirmationModalComponent, { class: 'confirmation-modal', backdrop: 'static', keyboard: false });
    this.modalRef.content.decision = '';
    this.modalRef.content.confirmation_text = "Are you sure to delete this Project?"
    var tempSubObj: Subscription = this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.decision == "done") {
        this.loading = true;
        this.commonService.deleteProjects(slider._id).subscribe((res: any) => {
          this.loading = false;
          if (res.status == 200) {
            remove(this.table_data, (ub: any) => ub._id == slider._id);
            this._toastMessageService.alert("success", "Project deleted successfully.");
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
