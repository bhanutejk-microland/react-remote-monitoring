import * as actionTypes from '../actionTypes';
import { updateObject } from '../../../utilities/reduxStateUpdate';

// export const setAssetDetailsAppliedDateFilter = (appliedDateFilter) => {
//   return {
//     type: actionTypes.SET_ASSET_DETAIL_DATE_FILTER,
//     appliedDateFilter: appliedDateFilter
//   }
// }

const getTimeStamps = (appliedDateFilter) => {
  const timeStamps = {
    fromTimestamp: '',
    toTimestamp: ''
  }
  const toTimestamp = +new Date;
  let fromTimestamp = toTimestamp;
  switch (appliedDateFilter) {
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

export const setAssetDetailsAppliedDateFilter = (appliedDateFilter) => {
  const timeStamps = getTimeStamps(appliedDateFilter);
  return {
    type: actionTypes.SET_ASSET_DETAIL_DATE_FILTER,
    appliedDateFilter: timeStamps
  }
}

export const initAssetDetailsAppliedDateFilter = (appliedDateFilter) => {
  return dispatch => {
    dispatch(setAssetDetailsAppliedDateFilter(appliedDateFilter));
  }
}
