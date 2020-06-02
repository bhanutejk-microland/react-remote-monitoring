import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../utilities/reduxStateUpdate';

const initialState = {
  trendsFilterData: {
    timestamps: {
      fromTimestamp: '',
      toTimestamp: ''
    }
  }
}

const setTrendsFilter = (state, action) => {
  const updatedTrendsFilterData = action.filterData;
  const updatedState = {
    trendsFilterData: updatedTrendsFilterData
  }
  return updateObject(state, updatedState);
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TRENDS_FILTER: return setTrendsFilter(state, action);
    default: return state;
  }
}

export default reducer;
