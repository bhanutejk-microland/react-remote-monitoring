import * as actionTypes from '../actionTypes';
import axios from '../../../axios';

export const setRulesListInfo = (rules) => {
  return {
    type: actionTypes.SET_RULES,
    rules: rules
  }
}

export const initRules = () => {
  return dispatch => {
    axios.get("api/rules/listRules?configType=rules").then(response => {
      dispatch(setRulesListInfo(response.data));
    });
  }
}

export const setAddToRulesList = (rule) => {
  return {
    type: actionTypes.SET_ADD_TO_RULES_LIST,
    rule: rule
  }
}

export const addToRulesList = (rule) => {
  return dispatch => {
    dispatch(setAddToRulesList(rule));
  }
}
