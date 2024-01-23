import { DebtModel } from "../debt/debt.model";

export interface DebtPaymentModel {
  id: number;
  name: string;
  description: string;
  paymentDate: Date;
  maxPaymentDate: Date;
  createdAt: Date;
  amount: number;
  balanceAfterPay: number;
  balanceBeforePay: number;
  image: File | null;
  payed: boolean;
  debt: DebtModel;
}