import { GenericResponseModel } from "../genericResponse.model";
import { DebtModel } from "./debt.model";

export interface SingleDebtModel extends GenericResponseModel{
  debt: DebtModel;
}