import * as actionTypes from '../actionTypes';

export const setAssetDetailsAppliedDateFilter = (appliedDateFilter) => {
  return {
    type: actionTypes.SET_ASSET_DETAIL_DATE_FILTER,
    appliedDateFilter: appliedDateFilter
  }
}

export const initAssetDetailsAppliedDateFilter = (appliedDateFilter) => {
  return dispatch => {
    dispatch(setAssetDetailsAppliedDateFilter(appliedDateFilter));    
  }
}
