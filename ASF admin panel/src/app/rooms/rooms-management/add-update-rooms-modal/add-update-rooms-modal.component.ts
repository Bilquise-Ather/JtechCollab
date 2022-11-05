import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseModalComponent } from 'src/app/modals/base-modal.component';
import { RoomService } from 'src/app/services/room.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { environment } from "src/environments/environment";
@Component({
  selector: 'add-update-rooms-modal',
  templateUrl: './add-update-rooms-modal.template.html',
  styleUrls: ['./add-update-rooms-modal.component.css']
})

export class AddUpdateRoomsModalComponent extends BaseModalComponent implements OnInit {

  base_url = environment.url;
  loading: boolean = false;
  decision: string = '';
  dialogType: string = "";
  slider_obj: any;
  dialogResult: any;
  newImageUploaded: boolean = false;
  @ViewChild('sliderImageFile') sliderImageFile: any;
  constructor(public modalRef: BsModalRef, private _toastMessageService: ToastMessageService,
    private commonHelper: CommonHelper, private RoomService: RoomService, private modalService: BsModalService,private sanitizer: DomSanitizer) { super(modalRef); }

  ngOnInit() {

  }

  onClose() {
    this.decision = '';
    this.close(true);
  }

  done() {
    this.decision = 'done';
    this.close(true);
  }

  addSlider() {
    const data = new FormData();
    data.append('slider_image',this.slider_obj.sliderImageFile);
    let params = {
      slidertext: this.slider_obj.slidertext
    }
    data.append('body', JSON.stringify(params));

    this.loading = true;
    this.RoomService.addSlider(data).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this._toastMessageService.alert("success", "Room added successfully.");
        this.dialogResult = res.data;
        this.done();
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }

  updateSlider(){
    const data = new FormData();
    data.append('slider_image',this.slider_obj.sliderImageUrl && !this.slider_obj.sliderImageFile ? 'current' : this.slider_obj.sliderImageFile ? this.slider_obj.sliderImageFile : null
    );
    let params = {
      slidertext: this.slider_obj.slidertext
    }
    data.append('body', JSON.stringify(params));
    this.loading = true;
    this.RoomService.updateSlider(this.slider_obj._id,data).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this._toastMessageService.alert("success", "Room updated successfully.");
        this.dialogResult = res.data;
        this.done();
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }
  onTagChange(event) {
    this.slider_obj.tag = event.name;
  }

  clearCLFile() {
    this.sliderImageFile.nativeElement.value = '';
    this.slider_obj.sliderImageUrl = '';
    this.slider_obj.sliderImageFile = null;
    this.newImageUploaded = false;
  }

  onCLUpload(event) {
    if (event.target.files && event.target.files[0]) {
      this.newImageUploaded = true;
      this.slider_obj.sliderImageUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(event.target.files[0])
      );
      this.slider_obj.sliderImageFile = event.target.files[0];
    }
  }
}
