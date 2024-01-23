import { GenericResponseModel } from "../genericResponse.model";

export interface RecoverPasswordResponseModel extends GenericResponseModel {
  email: string;
}