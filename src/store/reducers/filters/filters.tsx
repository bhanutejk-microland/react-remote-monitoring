import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  filterInfo: {
    orgCodes: [],
    locCodes: [],
    assetIds: [],
    assetTypes: []
  }
}

const setAppFilterInFo = (state, action) => {
  return { filterInfo: action.filterInfo };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_APP_FILTERS: return setAppFilterInFo(state, action);
    default: return state;
  }
}

export default reducer;
