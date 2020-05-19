import { FormInputModel } from './FormInputModel';
import { FormDropdownModel } from "./FormDropdownModel";

export interface AlertFormModel {
  assetId: FormInputModel;
  alertDate: FormInputModel;
  alertDescription: FormInputModel;
  alertSeveriy: FormInputModel;
  alertStatus: FormInputModel;
  updateStatus: FormDropdownModel;
  remark: FormInputModel;
}