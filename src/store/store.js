import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../features/employee/employeeSlice';
import departmentReducer from '../features/department/departmentSlice';

export default configureStore({
  reducer: {
    employee: employeeReducer,
    department: departmentReducer,
  },
});
