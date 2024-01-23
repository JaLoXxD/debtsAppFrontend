import { UserModel } from "../user/userResponse.model";

export interface DebtPriorityModel {
  id: number;
  name: string;
  description: string;
  global: boolean;
  color: string;
  user: UserModel;
}