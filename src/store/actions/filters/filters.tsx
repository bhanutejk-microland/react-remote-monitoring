import * as actionTypes from '../actionTypes';
import axios from '../../../axios';

export const setAppFilterInfo = (filterInfo) => {
  return {
    type: actionTypes.SET_APP_FILTERS,
    filterInfo: filterInfo
  }
}

export const initFilterInfo = () => {
  return dispatch => {
    axios.get("api/getFilterDetails").then(response => {
      dispatch(setAppFilterInfo(response.data));
    }).catch((error) => {
      console.log("/getFilterDetails ERROR: ", error)
    });
  }
}
