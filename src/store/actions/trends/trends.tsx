import * as actionTypes from '../actionTypes';
import axios from '../../../axios';

export const setTrendsListInfo = (trends, payload) => {
  return {
    type: actionTypes.SET_TRENDS,
    trendsPayload: {
      trends: trends,
      payload: payload
    }
  }
}

export const initTrends = (payload) => {
  return dispatch => {
    axios.post("api/trends", payload).then(response => {
      dispatch(setTrendsListInfo(response, payload));
    });
  }
}
