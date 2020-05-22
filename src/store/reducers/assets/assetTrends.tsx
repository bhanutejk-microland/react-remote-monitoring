import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../utilities/reduxStateUpdate';

const initialState = {
  teleProps: {}
}

const setBasicAssetIndividualTeleProps = (state, action) => {
  return updateObject(state, { teleProps: {} });
}

const setAssetTelemetries = (state, action) => {
  const updatedTeleProps = { teleProps: action.assetTeleProps };
  return updateObject(state, updatedTeleProps);
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_BASEIC_ASSET_INDIVIDUAL_TELE_PROPS: return setBasicAssetIndividualTeleProps(state, action);
    case actionTypes.SET_INDIVIDUAL_ASSET_TELE_PROPS: return setAssetTelemetries(state, action);
    default: return state;
  }
}

export default reducer;
