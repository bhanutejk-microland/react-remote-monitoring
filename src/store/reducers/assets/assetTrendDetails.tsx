import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../utilities/reduxStateUpdate';

const initialState = {
  trendTeleValues: []
}

const setAssetTrendTeleDetails = (state, action) => {
  const updatedTeleProps = { trendTeleValues: [...action.assetTeleValues] };
  return updateObject(state, updatedTeleProps);
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INDIVIDUAL_ASSET_TELE_DETAILS: return setAssetTrendTeleDetails(state, action);
    default: return state;
  }
}

export default reducer;
