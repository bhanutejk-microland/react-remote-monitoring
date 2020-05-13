export interface gaugeInfoModel {
  name: string;
  property: {
    minimum? : number;
    maximum? : number;
    value : string;
  };
}
