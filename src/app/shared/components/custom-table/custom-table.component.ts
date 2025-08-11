import { LiveAnnouncer } from "@angular/cdk/a11y";
import { CurrencyPipe, DatePipe } from "@angular/common";
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { TableLazyLoadEvent, TablePageEvent } from "primeng/table";
import { Subscription } from "rxjs";
import { TableButtonModel, TableDataModel } from "src/app/models";
import { TablePageModel } from '../../../models/table/tablePage.model';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() component: any;
  @Input() data: TableDataModel;
  @Input() buttons: TableButtonModel[] = [];
  @Input() parentLabel: string = '';
  @Input() pageSizeOptions: number[] = [10, 25, 50, 100];
  @Output() onChangePage = new EventEmitter();
  @Output() onFilter = new EventEmitter();
  @Output() onLazyLoad: EventEmitter<TablePageModel> = new EventEmitter();
  private _pageSubscriber: Subscription;
  displayedColumns: string[] = [];
  dataColumns: string[] = [];
  dataSource = new MatTableDataSource([]);
  staticTypes: any[] = ['string', 'number', 'date', 'currency'];
  filterValue: string | null = null;
  isFilter: boolean = false;
  rowsPerPage: number = 10;

  constructor(private _liveAnnouncer: LiveAnnouncer, private _currencyPipe: CurrencyPipe, private _datePipe: DatePipe) {
  }
  
  setColumLabel(column: string) : string {
    return column !== 'id' ? `${this.parentLabel}.${column}` : 'general.number';
  }
  
  ngOnChanges(): void {
    if(this.paginator && this.paginator.length !== this.data.totalElements) {
      this.paginator.length = this.data.totalElements;
    }
    this.displayedColumns = this.data.columns?.filter(column => !column.static).map((column) => column.label);
    if(this.buttons.length > 0) {
      //FOR DELETE
      this.displayedColumns = [
        ...this.displayedColumns,
        'actions'
      ];
    }
    this.dataColumns = this.displayedColumns.filter((column) => column !== 'actions');
  }

  lazyLoad(event: TableLazyLoadEvent) {
    this.rowsPerPage = event.rows ?? 10;
    this.onLazyLoad.emit(this._getTablePageInfo(event));
  }

  onChangePageSize(event: TablePageEvent) {
    this.rowsPerPage = event.rows;
  }

  private _getTablePageInfo(tableInfo: TableLazyLoadEvent): TablePageModel {
    return {
      pageSize: this.rowsPerPage,
      page: (tableInfo.first && tableInfo.rows) ? tableInfo.first / tableInfo.rows : 0,
      filterValue: this.filterValue,
    }
  }

  filter() {
    this.isFilter = this.filterValue != "";
    this.onFilter.emit({
      pageSize: this.paginator.pageSize,
      page: this.paginator.pageIndex,
      filterValue: this.filterValue,
    });
  }

  clearFilter() {
    this.isFilter = false;
    this.filterValue = '';
    this.onFilter.emit({
      pageSize: this.paginator.pageSize,
      page: this.paginator.pageIndex,
      filterValue: this.filterValue,
    });
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort){
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  setFormat(column: string, value: string | number){
    switch (this.getColumnType(column)) {
      case 'currency':
        return this._currencyPipe.transform(value) || "-";
      case 'date':
        return this._datePipe.transform(value, 'dd/MM/yyyy HH:mm') || "-";
      default:
        return (typeof value !== 'number') ? this._truncateString(value || "-") : value || "-";
    }
  }

  private _truncateString(value: string, maxLength: number = 15): string {
    if (value.length > maxLength) {
      return value.substring(0, maxLength) + '...';
    }
    return value;
  }

  getColumnType(columnName: string){
    const currentCol = this.data.columns.find((col) => col.label === columnName);
    return currentCol?.type;
  }
  
  getColumnProperty(columnName: string, property: string){
    const currentCol = this.data.columns.find((col) => col.label === columnName);
    switch (property) {
      case 'type':
        return currentCol?.type;
      case 'label':
        return currentCol?.label;
      case 'disabled':
        return currentCol?.disabled || false;
      default:
        return currentCol?.label;
    }
  }

  ngOnDestroy(): void {
    this._pageSubscriber?.unsubscribe();
  }
}
