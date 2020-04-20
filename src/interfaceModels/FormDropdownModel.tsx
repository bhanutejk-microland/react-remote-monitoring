export interface FormDropdownModel {
  elementType: string;
  elementConfig: {
    label: string;
    options: any;
  };
  value: string;
  validation: {
    required: boolean;
  };
  valid: boolean;
  touched: boolean;
}