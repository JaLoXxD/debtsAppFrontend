import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm, NgModel } from "@angular/forms";

@Component({
  selector: 'app-custom-file-uploader',
  templateUrl: './custom-file-uploader.component.html',
  styleUrls: ['./custom-file-uploader.component.scss']
})
export class CustomFileUploaderComponent implements OnChanges {
  @ViewChild('idModel') inputModel!: NgModel;
  @Input() icon: string = 'fa-solid fa-camera-retro';
  @Input() label: string = "";
  @Input() data: any = {};
  @Input() id: string = "";
  @Input() required: boolean = false;
  @Input() dynamicLabel: boolean = false;
  @Input() form!: NgForm;
  @Input() customImgLabel: string | undefined = '';

  @Output() changeImg = new EventEmitter<boolean>();
  @Output() showImagePreview = new EventEmitter<boolean>();

  imgLabel:string = 'messages.chooseImage';
  showRemoveBtn:boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.data);
    console.log(this.data[this.id]);
    if (this.data[this.id]) {
      console.log(this.data[this.id].name);
      this.imgLabel = this.data[this.id].name;
      this.showRemoveBtn = true;
    }
  }

  inputImage(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    console.log(event)
    if (files[0]) {
      this.data[this.id] = files[0];
      this.imgLabel = files[0].name;
      this.showRemoveBtn = true;
      this.changeImg.emit(true);
      console.log(this.data)
    } else {
      this.data[this.id] = null;
      this.imgLabel = 'messages.chooseImage';
      this.showRemoveBtn = false;
      this.changeImg.emit(false);
    }
  }

  previewImage() {
    this.showImagePreview.emit(true);
  }

  removePhoto() {
    this.data[this.id] = null;
    this.imgLabel = 'messages.chooseImage';
    this.showRemoveBtn = false;
  }
}
