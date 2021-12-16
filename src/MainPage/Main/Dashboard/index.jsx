/**
 * Crm Routes
 */
/* eslint-disable */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Admindashboard from './admindashboard';
import Employeedashboard from './employeedashboard';

const DashboardRoute = () => {
  const authentication = useSelector((state) => state.authentication.value);
  const isAdmin = authentication.user?.userAuthorites.some(
    (authority) => authority === 'ADMIN_DASHBOARD'
  );
  useEffect(() => {
    console.log(isAdmin);
  }, []);

  return (
    <>
      {isAdmin && <Admindashboard />}
      {!isAdmin && <Employeedashboard />}
    </>
  );
};

export default DashboardRoute;
