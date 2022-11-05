import { Component, OnInit, ViewChild } from '@angular/core';
import { CollectionService } from 'src/app/services/Collection.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { remove } from 'lodash-es';
import { Subscription, Subject } from 'rxjs';
import { environment } from "src/environments/environment";

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
import { Router } from '@angular/router';
@Component({
  selector: 'collection-slider-management',
  templateUrl: './collection-slider-management.component.html',
  styleUrls: ['./collection-slider-management.component.css']
})
export class CollectionSliderManagementComponent implements OnInit {
  public loading: boolean = false;

  public slider_obj: any = {}
  public filters:any = {};
  base_url = environment.url;
  public dialogType: string = "add";


  public paginationValues: Subject<any> = new Subject();
  public table_data: any[] = [];

  public recordLimit: number = 10;
  public modalRef: BsModalRef;
  constructor(private collectionService: CollectionService, private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService, private modalService: BsModalService, private router: Router) {
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
      this.collectionService.getAllCollection(params).subscribe((res: any) => {
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


  onClickAddSlider() {
    this.dialogType = 'add';
    // this.showAddSliderModal();

    this.router.navigate(['/collection/add-collection']);
  }
  onClickEditSlider(slider) {
    this.router.navigate(['/collection/edit-collection/' + slider._id]);
  }
  onClickDeleteSlider(slider) {
    this.modalRef = this.modalService.show(ConfirmationModalComponent, { class: 'confirmation-modal', backdrop: 'static', keyboard: false });
    this.modalRef.content.decision = '';
    this.modalRef.content.confirmation_text = "Are you sure to delete this Collection?"
    var tempSubObj: Subscription = this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.decision == "done") {
        this.loading = true;
        this.collectionService.deleteCollection(slider._id).subscribe((res: any) => {
          this.loading = false;
          if (res.status == 200) {
            remove(this.table_data, (ub: any) => ub._id == slider._id);
            this._toastMessageService.alert("success", "Collection deleted successfully.");
          }
        }, (error) => {
          this.loading = false;
          this.commonHelper.showError(error);
        });
      }
      tempSubObj.unsubscribe();
    });
  }
  showAddSliderModal() {
    // this.modalRef = this.modalService.show(AddUpdateCollectionSliderModalComponent, { class: 'add-update-slider-modal', backdrop: 'static', keyboard: false });
    // this.modalRef.content.decision = "";
    // this.modalRef.content.dialogType = this.dialogType;
    // this.modalRef.content.slider_obj = this.slider_obj;
    // var tempSubObj: Subscription = this.modalRef.content.onHide.subscribe(() => {
    //   if (this.modalRef.content.decision === 'done') {
    //     if (this.dialogType == "add") {
    //       this.table_data.unshift(JSON.parse(JSON.stringify(this.modalRef.content.dialogResult)));
    //     } else if (this.dialogType == "update") {
    //       for (var i = 0, fLen = this.table_data.length; i < fLen; i++) {
    //         if (this.table_data[i]._id == this.modalRef.content.dialogResult._id) {
    //           this.table_data[i] = this.modalRef.content.dialogResult;
    //           break;
    //         }
    //       }
    //     }
    //   }
    //   tempSubObj.unsubscribe();
    // });

  }

}
