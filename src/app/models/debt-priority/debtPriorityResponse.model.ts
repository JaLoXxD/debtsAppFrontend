import { GenericResponseModel } from "../genericResponse.model";
import { DebtPriorityModel } from "./debtPriority.model";

export interface DebtPriorityResponseModel extends GenericResponseModel{
  allDebtPriorities: DebtPriorityModel[];
  globalDebtPriorities: DebtPriorityModel[];
  userDebtPriorities: DebtPriorityModel[];
}