import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slicers/AuthSlicer';
import machineReducer from './Slicers/MachineSlicer';
import userInfoReducer from './Slicers/UserInfoSlicer';
import maintenanceReducer from './Slicers/MaintenanceSlicer';
import complaintsReducer from './Slicers/ComplaintsSlicer';
import detailedReducer from './Slicers/DetailedSlicer';
import handbookReducer from './Slicers/HandbookSlicer';

export default configureStore({
    reducer: {
        login: authReducer,
        machine: machineReducer,
        maintenance: maintenanceReducer,
        complaints: complaintsReducer,
        user: userInfoReducer,
        detailed: detailedReducer,
        handbook: handbookReducer
    }
});
