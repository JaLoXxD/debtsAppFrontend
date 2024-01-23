import { GenericResponseModel } from "../genericResponse.model";
import { DebtCategoryModel } from "./debtCategory.model";

export interface DebtCategoryResponseModel extends GenericResponseModel{
  allDebtCategories: DebtCategoryModel[];
  globalDebtCategories: DebtCategoryModel[];
  userDebtCategories: DebtCategoryModel[];
}