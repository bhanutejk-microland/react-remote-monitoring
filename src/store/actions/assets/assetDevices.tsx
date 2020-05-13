import * as actionTypes from '../actionTypes';
import axios from '../../../axios';

export const setDeviceGroupInfo = (devicesGroup) => {
    return {
        type : actionTypes.SET_DEVICES_GROUP,
        devicesGroup : devicesGroup
    }
}

export const initDeviceGroupList = () => {
    return dispatch => {
        axios.get('api/devices/deviceGroup?configType=deviceGroup').then(response => {
            dispatch(setDeviceGroupInfo(response.data));
        });
    }
}

export const setAllDeviceGroupDetails = (allDevicesGroupDetails) => {
   
    return {
        type: actionTypes.SET_ALL_DEVICES_GROUP_DETAILS,
        allDevicesGroupDetails : allDevicesGroupDetails
    }
}

export const initAllDeviceGroupDetails = () => {
    return dispatch => {
        axios.get('api/devices/deviceGroupTemplate?configType=deviceGroup').then(response => {
            dispatch(setAllDeviceGroupDetails(response.data));
        })
    }
}