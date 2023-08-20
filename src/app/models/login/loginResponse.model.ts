import { GenericResponseModel } from "../genericResponse.model";

export interface LoginResponseModel extends GenericResponseModel{
  token?: string;
}
