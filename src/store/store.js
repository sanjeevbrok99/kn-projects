import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../features/employee/employeeSlice';

export default configureStore({
  reducer: {
    employee: employeeReducer,
  },
});
