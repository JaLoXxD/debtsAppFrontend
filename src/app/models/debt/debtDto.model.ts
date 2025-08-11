export interface DebtDtoModel {
  id: number;
  name: string;
  description: string;
  category: string;
  priority: string;
  startDate: Date;
  endDate: Date;
  collector: string;
  amount: number;
}