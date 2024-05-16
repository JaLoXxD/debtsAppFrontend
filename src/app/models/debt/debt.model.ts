import { DebtCategoryModel } from "../debt-category/debtCategory.model";
import { DebtPaymentModel } from "../debt-payment/debtPayment.model";
import { DebtPriorityModel } from "../debt-priority/debtPriority.model";

export interface DebtModel {
  id: number;
  name: string;
  description: string;
  category: DebtCategoryModel;
  priority: DebtPriorityModel;
  startDate: Date;
  endDate: Date;
  collector: string;
  amount: number;
  pendingAmount: number;
  termInMonths: number;
  payed: boolean;
  debtPayments: DebtPaymentModel[];
}