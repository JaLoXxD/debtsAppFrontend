import { GenericResponseModel } from "../genericResponse.model";
import { DebtModel } from "./debt.model";

export interface DebtDetailResponseModel extends GenericResponseModel {
  debt: DebtModel;
}