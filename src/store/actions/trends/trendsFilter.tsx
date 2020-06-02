import * as actionTypes from '../actionTypes';
import { updateObject } from '../../../utilities/reduxStateUpdate';

const getTimeStamps = (filterData) => {
  const timeStamps = {
    fromTimestamp: '',
    toTimestamp: ''
  }
  const toTimestamp = +new Date;
  let fromTimestamp = toTimestamp;
  switch (filterData) {
    case 'Last 1 hour':
      fromTimestamp -= 60 * 60 * 1000; // 1 hour
      return updateObject(timeStamps, { fromTimestamp, toTimestamp });
    case 'Last 6 hours':
      fromTimestamp -= 6 * 60 * 60 * 1000; // 6 hours
      return updateObject(timeStamps, { fromTimestamp, toTimestamp });
    case 'Last 24 hours':
      fromTimestamp -= 24 * 60 * 60 * 1000; // 24 hours
      return updateObject(timeStamps, { fromTimestamp, toTimestamp });
    case 'Last 1 week':
      fromTimestamp -= 7 * 24 * 60 * 60 * 1000; // 1 week
      return updateObject(timeStamps, { fromTimestamp, toTimestamp });
    case 'Last 1 month':
      fromTimestamp -= 30 * 24 * 60 * 60 * 1000; // 1 month
      return updateObject(timeStamps, { fromTimestamp, toTimestamp });
    default:
      fromTimestamp -= 24 * 60 * 60 * 1000; // 24 hours
      return updateObject(timeStamps, { fromTimestamp, toTimestamp });
  }
}

export const setTrendsFilter = (filterData) => {
  const timestamps = getTimeStamps(filterData.timePeriod.value);
  return {
    type: actionTypes.SET_TRENDS_FILTER,
    filterData: { timestamps }
  }
}

export const initTrendsFilter = (filterData) => {
  return dispatch => {
    dispatch(setTrendsFilter(filterData));
  }
}
