import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  rules: []
}

const setRules = (state, action) => {
  const newRulesList = new Array();
  action.rules.map(rule => {
    newRulesList.push({
      Name: "" + rule.Name,
      Description: "" + rule.Description,
      deviceGroup: "" + rule.GroupId,
      Severity: "" + rule.Severity
    });
  });
  return { rules: [...newRulesList] };
}

const setAddToRulesList = ( state, action ) => {
  const updatedRulesList = [...state.rules, action.rule];
  return { rules: [ ...updatedRulesList ] };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_RULES: return setRules(state, action);
    case actionTypes.SET_ADD_TO_RULES_LIST: return setAddToRulesList(state, action);
    default: return state;
  }
}

export default reducer;
