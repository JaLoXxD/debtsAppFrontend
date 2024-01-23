import { Component, ComponentRef, Injector, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ImageAsset, ImageFileModel } from "src/app/models";
import { ModalService } from "src/app/services";
import { ImagePreviewComponent } from '../image-preview/image-preview.component';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.scss']
})
export class CustomModalComponent {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) container: ViewContainerRef;

  @Input() title: string | null = 'null';
  @Input() icon: ImageAsset | null = null;
  @Input() showModal: Boolean = false;
  @Input() enableAcceptBtn: Boolean = true;
  @Input() enableCancelBtn: Boolean = true;

  imagePreviewComponentRef: ComponentRef<ImagePreviewComponent>;

  constructor(private _modalService: ModalService, private _resolver: ComponentFactoryResolver) {}

  toggleModal(show: Boolean) {
    this.showModal = show;
    this._modalService.visible = show;
  }

  onAcceptBtn() {
    this.toggleModal(false);
    this._modalService.onAccept();
  }
  
  onRejectBtn() {
    this.toggleModal(false);
    this._modalService.onReject();
  }

  ngOnDestroy() {
    if (this.imagePreviewComponentRef) {
      this.imagePreviewComponentRef.destroy();
    }
  }

  get visible() : Boolean {
    return this._modalService.visible;
  }

  get imageModal() : Boolean {
    return this._modalService.imageModal;
  }

  get imageModel() : ImageFileModel | null {
    return this._modalService.imageModel;
  }
}
