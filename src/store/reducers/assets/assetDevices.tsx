import * as actionTypes from '../../actions/actionTypes';
import { updateObject, updateArrayObject } from '../../../utilities/reduxStateUpdate';

const initialState = {
  deviceGroupList: [],
  allDeviceGroupDetails : []
}


const setDevicesGroup = (state, action) => {
    const newDeviceGroupList = new Array();
    if ( action.devicesGroup.length > 0 ) {
      action.devicesGroup.map(device => {       
        newDeviceGroupList.push({
          groupName: device.key,
        });
      });
    }
    const updatedDeviceGroupList = updateArrayObject(state.deviceGroupList, newDeviceGroupList );
    const updatedState = {
        deviceGroupList: updatedDeviceGroupList
      }
    return updateObject(state,updatedState);
  }

const setAllDeviceGroupDetails = (state,action) => {
    const newAllDeviceGroupDetails = new Array();
    if(action.allDevicesGroupDetails.length > 0){
        action.allDevicesGroupDetails.map(deviceDetail => {
            newAllDeviceGroupDetails.push({
                id : deviceDetail.data.id,
                displayName : deviceDetail.data.displayName,
                staticProperties : deviceDetail.data.staticProperties,
                dynamicProperties : deviceDetail.data.dynamicProperties
            });
        });
    }

    const updatedAllDeviceGroupDetails = updateArrayObject(state.allDeviceGroupDetails, [...newAllDeviceGroupDetails] );
    const updatedState = {
        allDeviceGroupDetails: updatedAllDeviceGroupDetails
      }
    return updateObject(state,updatedState);
}
  

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.SET_DEVICES_GROUP: return setDevicesGroup(state, action);
    case actionTypes.SET_ALL_DEVICES_GROUP_DETAILS: return setAllDeviceGroupDetails(state,action);
    default: return state;
  }
}

export default reducer;
