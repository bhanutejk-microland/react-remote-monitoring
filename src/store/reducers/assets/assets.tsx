import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  assets: []
}

const renameStatus = status => {
  if (status === "Active") {
    return "Running";
  }
  return "Idle";
};

const setAssets = (state, action) => {
  const newAssets = new Array();
  if ( action.assets.length > 0 ) {
    action.assets.map(asset => {
      newAssets.push({
        assetId: asset.data.id,
        url: asset.data.url,
        makeAndmodel: asset.data.properties[0].makeNmodel,
        location: asset.data.location[0].address,
        description: asset.data.properties[0].description,
        deviceStatus : asset.data.properties[0].deviceStatus,
        status: renameStatus(asset.status)
      });
    });
  }
  return { assets: [ ...newAssets ] };
}

const addAsset = (state, action) => {
  const updatedAssetsList = [...state.assets, action.asset];
  return { assets: [ ...updatedAssetsList ] };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ASSETS: return setAssets(state, action);
    case actionTypes.ADD_ASSETS: return addAsset(state, action);
    default: return state;
  }
}

export default reducer;
