import * as actionTypes from '../actionTypes';

export const setAppliedFilterChanges = (filterInfo) => {
  return {
    type: actionTypes.SET_APPLIED_FILTERS,
    filterInfo: filterInfo
  }
}

export const applyFilterChanges = (filterInfo) => {
  return dispatch => {
    dispatch(setAppliedFilterChanges(filterInfo))
  }
}