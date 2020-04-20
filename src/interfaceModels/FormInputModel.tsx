export interface FormInputModel {
  elementType: string;
  elementConfig: {
    label: string;
  };
  value: string;
  validation: {
    required: boolean;
  };
  valid: boolean;
  touched: boolean;
}
