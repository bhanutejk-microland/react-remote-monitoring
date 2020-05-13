import { AssetPropertyModel } from "./AssetPropertyModel";
import { IndividualAssetModel } from "./IndividualAssetModel";

export interface AssetModel extends IndividualAssetModel {
  assetTabInfo: {
    // properties: Array<AssetPropertyModel>;
    trends: any;
    anomaly: any;
    faultClassification: any;
    faultIdentification: any;
  };
}

