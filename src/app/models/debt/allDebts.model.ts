import { GenericPageResponseModel } from "../genericPageResponse.model";
import { DebtModel } from "./debt.model";

export interface AllDebtsModel extends GenericPageResponseModel{
  debts: DebtModel[];
}