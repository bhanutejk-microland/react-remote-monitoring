import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  trends: []
}

const setTrends = (state, action) => {
  // const newRulesList = new Array();
  // action.rules.map(rule => {
  //   newRulesList.push({
  //     ruleName: "" + rule.Name,
  //     ruleDescription: "" + rule.Description,
  //     deviceGroup: "" + rule.GroupId,
  //     severityLevel: "" + rule.Severity
  //   });
  // });
  console.log("SSSSSSSSSSSS", action.trendsPayload.trends.data);
  return { trends: [...action.trendsPayload.trends.data] };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TRENDS: return setTrends(state, action);
    default: return state;
  }
}

export default reducer;
