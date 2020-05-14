import * as actionTypes from '../../actions/actionTypes';
import { updateObject, updateArrayObject } from '../../../utilities/reduxStateUpdate';

const initialState = {
  appliedFilterDate: {
    fromTimestamp : '',
    toTimestamp : ''
  }
}

const setAppliedDateFilter = (state, action) => {
  const updatedAppliedDateFilter = action.appliedDateFilter;
  const updatedState = {
    appliedFilterDate : updatedAppliedDateFilter
  }
  return updateObject(state,updatedState);
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ASSET_DETAIL_DATE_FILTER: return setAppliedDateFilter(state, action);
    default: return state;
  }
}

export default reducer;
