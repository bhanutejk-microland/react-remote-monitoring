import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  mapInfo: []
}

const setDashboardMapInfo = (state, action) => {
  return { mapInfo: [...action.mapInfo] };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DASHBOARD_MAP_INFO: return setDashboardMapInfo(state, action);
    default: return state;
  }
}

export default reducer;
