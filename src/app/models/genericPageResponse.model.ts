import { GenericResponseModel } from "./genericResponse.model";

export interface GenericPageResponseModel extends GenericResponseModel {
  totalPages: number;
  totalElements: number;
}