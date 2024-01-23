import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { ImageAsset, ImageFileModel } from "src/app/models";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  acceptSubject = new Subject<any>();
  rejectSubject = new Subject<any>();
  title: string = "";
  icon: ImageAsset | null = null;
  visible: Boolean = false;
  imageModal: Boolean = false;
  imageModel: ImageFileModel | null;
  showAcceptBtn: Boolean = true;
  showCancelBtn: Boolean = true;

  constructor() {
    this._initModel();
  }

  showModal(title: string, icon: ImageAsset, showAccept: Boolean = true, showCancel: Boolean = true) {
    this.title = title;
    this.icon = icon;
    this.visible = true;
    this.imageModel = null;
    this.imageModal = false;
    this.showAcceptBtn = showAccept;
    this.showCancelBtn = showCancel;
  }

  showImagePreviewModal(title: string, icon: ImageAsset | null, img: ImageFileModel, showAccept: Boolean = true, showCancel: Boolean = true) {
    this.title = title;
    this.icon = icon;
    this.imageModel = img;
    this.visible = true;
    this.imageModal = true;
    this.showAcceptBtn = showAccept;
    this.showCancelBtn = showCancel;
  }

  onAccept() {
    this.resetModal();
    this.acceptSubject.next(true);
  }

  onReject() {
    this.resetModal();
    this.rejectSubject.next(false);
  }

  resetModal() {
    this.title = "";
    this.icon = null;
    this.visible = false;
  }

  private _initModel() {
    this.imageModel = {
      src: '',
      title: ''
    }
  }
}
