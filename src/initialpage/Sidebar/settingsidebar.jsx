/**
 * App Header
 */
import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import AdminSettingSidebar from './AdminSettingSidebar';
import EmployeeSettingSidebar from './EmployeeSettingSidebar';

const SettingsSidebar = (props) => {
  const authentication = useSelector((state) => state.authentication.value);
  const isAdmin = authentication.user?.userAuthorites.some(
    (authority) => authority === 'ADMIN_DASHBOARD'
  );
  return <>{isAdmin ? <AdminSettingSidebar /> : <EmployeeSettingSidebar />}</>;
};

export default SettingsSidebar;
