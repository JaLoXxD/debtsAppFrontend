import { DebtModel } from "../debt/debt.model";

export interface DebtPaymentModel {
  id: number;
  name: string;
  description: string;
  paymentDate: Date;
  maxPaymentDate: Date;
  createdAt: Date;
  amount: number;
  expectedAmount: number;
  balanceAfterPay: number;
  balanceBeforePay: number;
  image: string;
  payed: boolean;
  debt: DebtModel;
}