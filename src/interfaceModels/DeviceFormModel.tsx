import { FormInputModel } from './FormInputModel';
import { FormDropdownModel } from './FormDropdownModel';

export interface DeviceFormModel {
  deviceName: FormInputModel;
  deviceId: FormInputModel;
  // deviceGroup: FormInputModel;
  addrerss: FormInputModel;
  latitude: FormInputModel;
  longitude: FormInputModel;
  deviceGroup : FormDropdownModel;
  // makeNModel: FormInputModel;
  // propertyDescription: FormInputModel;
  // type: FormInputModel;
  // firmWare: FormInputModel;
  // createdAt: FormInputModel;
}
