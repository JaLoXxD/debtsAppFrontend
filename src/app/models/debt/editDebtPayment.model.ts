export interface EditDebtPaymentModel {
  debtId: number | null;
  name: string;
  description?: string;
  paymentDate: Date;
  amount: number | null;
  pendingAmount: number | null;
  image: File | null;
  payed: boolean;
}