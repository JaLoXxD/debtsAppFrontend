import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from "@angular/material/paginator";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {
  constructor(private _translateService: TranslateService) {
    super();
    this._translateService.onLangChange.subscribe(() => {
      this._translateLabels();
    });
    this._translateLabels();
  }
  
  private _translateLabels() {
    this.itemsPerPageLabel = this._translateService.instant("paginator.itemsPerPageLabel");
    this.nextPageLabel = this._translateService.instant("paginator.nextPageLabel");
    this.previousPageLabel = this._translateService.instant("paginator.previousPageLabel");
    this.firstPageLabel = this._translateService.instant("paginator.firstPageLabel");
    this.lastPageLabel = this._translateService.instant("paginator.lastPageLabel");
    this.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const start = page * pageSize + 1;
      const end = (page + 1) * pageSize;
      return this._translateService.instant("paginator.getRangeLabel", {start, end, total: length});
    }
    this.changes.next();
  }
}