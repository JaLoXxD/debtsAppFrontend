import { DebtPaymentModel } from "../debt-payment/debtPayment.model";
import { GenericPageResponseModel } from "../genericPageResponse.model";

export interface DebtPaymentsResponseModel extends GenericPageResponseModel {
  debtPayments: DebtPaymentModel[];
}