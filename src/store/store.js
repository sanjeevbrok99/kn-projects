import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../features/employee/employeeSlice';
import departmentReducer from '../features/department/departmentSlice';
import holidayReducer from '../features/holiday/holidaySlice';
import autehticationReducer from '../features/authentication/authenticationSlice';

export default configureStore({
  reducer: {
    employee: employeeReducer,
    department: departmentReducer,
    holiday: holidayReducer,
    authentication: autehticationReducer,
  },
});
