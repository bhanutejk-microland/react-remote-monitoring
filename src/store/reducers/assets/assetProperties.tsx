import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  properties: []
}

const setAssetProperties = (state, action) => {
  const newProperties = new Array();
  if (Object.keys(action.properties).length !== 0) {
    Object.keys(action.properties).map(propertyKey => {
      const newProperty = {
        name: action.properties[propertyKey].name,
        currentValue: action.properties[propertyKey].currentvalue,
        lastUpdate: action.properties[propertyKey].lastUpdated,
        quality: action.properties[propertyKey].quality,
        telemetry: action.properties[propertyKey].telemetry
      };
      newProperties.push(newProperty);
    });
  }

  return { properties: [ ...newProperties ] };
}

const emptyAssetProperties = (state, action) => {
  return { properties: [] }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ASSET_PROPERTIES: return setAssetProperties(state, action);
    case actionTypes.EMPTY_ASSET_PROPERTIES: return emptyAssetProperties(state, action)
    default: return state;
  }
}

export default reducer;
