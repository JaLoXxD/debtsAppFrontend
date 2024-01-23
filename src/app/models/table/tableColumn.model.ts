export interface TableColumnModel {
  label: string;
  type: string;
  disabled?: boolean;
  static?: boolean;
  action?: () => void;
}