import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  asset: {}
}

const setAssetDetails = ( state, action ) => {
  const assetDetails = {
    assetId: action.asset.data.id,
    url: action.asset.data.url,
    modelNumber: action.asset.data.properties[0].makeNmodel,
    location: action.asset.data.location[0].address,
    description: action.asset.data.properties[0].description,
    status: renameStatus(action.asset.status)
  };
  return { asset: { ...assetDetails } };
}

const renameStatus = status => {
  if (status === "Active") {
    return "Running";
  }
  return "Stopped/Down";
};

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.SET_ASSET_DETAILS: return setAssetDetails(state, action);
    default: return state;
  }
}

export default reducer;
