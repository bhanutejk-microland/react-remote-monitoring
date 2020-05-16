import { FormInputModel } from './FormInputModel';
import { FormDropdownModel } from "./FormDropdownModel";


export interface RulesFormModel {
  ruleName: FormInputModel;
  ruleDesciption: FormInputModel;
  deviceGroup: FormDropdownModel;
  calculation: FormDropdownModel;
  field: FormDropdownModel;
  operator: FormDropdownModel;
  rulesValue: FormInputModel;
  severity: FormDropdownModel;
  period: FormInputModel;
}
