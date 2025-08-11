import { GenericResponseModel } from "../genericResponse.model";

export interface UserResponseModel extends GenericResponseModel {
  user: UserModel;
}

export interface UserModel {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  secondName?: string;
  secondLastName?: string;
  email: string;
  createdAt: string | null;
  updatedAt: string | null;
  lastLogin: string | null;
  phone: string;
  status: string;
  salary: number;
  resetPassword: boolean;
}