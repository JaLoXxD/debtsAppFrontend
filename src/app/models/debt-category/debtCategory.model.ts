import { UserModel } from "../user/userResponse.model";

export interface DebtCategoryModel {
  id: number;
  name: string;
  description: string;
  global: boolean;
  user: UserModel;
}