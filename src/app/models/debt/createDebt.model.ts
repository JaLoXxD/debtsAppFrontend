export interface CreateDebtModel {
  name: string;
  description?: string;
  category: number | null;
  priority: number | null;
  startDate: Date;
  endDate: Date;
  collector: string;
  amount: number | null;
  termInMonths: number | null;
}