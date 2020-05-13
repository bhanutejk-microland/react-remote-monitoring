import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  appliedFiltersInfo: {
    orgCodes: '',
    locCodes: '',
    assetIds: '',
    assetTypes: ''
  }
}

const setAppliedFilterInFo = (state, action) => {
  return { appliedFiltersInfo: action.filterInfo }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_APPLIED_FILTERS: return setAppliedFilterInFo(state, action);
    default: return state;
  }
}

export default reducer;
