import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  mapInfo: []
}

const setDashboardMapInfo = (state, action) => {
  const mapCoords = action.mapInfo.map((divceInfo) => {
    return [divceInfo.data.location[0].lattitude, divceInfo.data.location[0].longitude]
  })
  return { mapInfo: [ ...mapCoords ] };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DASHBOARD_MAP_INFO: return setDashboardMapInfo(state, action);
    default: return state;
  }
}

export default reducer;
