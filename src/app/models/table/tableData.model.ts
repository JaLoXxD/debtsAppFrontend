import { TableColumnModel } from "./tableColumn.model";

export interface TableDataModel {
  items: any;
  columns: TableColumnModel[];
  totalElements: number;
  totalPages: number;
}