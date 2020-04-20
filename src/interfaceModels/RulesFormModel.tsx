import { FormInputModel } from './FormInputModel';

export interface RulesFormModel {
  ruleName: FormInputModel;
  ruleDesciption: FormInputModel;
  deviceGroup: FormInputModel;
  calculation: FormInputModel;
  conditionField: FormInputModel;
  conditionOperator: FormInputModel;
  conditionValue: FormInputModel;
  severityLevel: FormInputModel;
}
