/**
 * Crm Routes
 */
/* eslint-disable */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Admindashboard from './admindashboard';
import Employeedashboard from './employeedashboard';

const DashboardRoute = ({ match }) => {
  const authentication = useSelector((state) => state.authentication.value);
  const isAdmin = authentication.user?.userAuthorites.some(
    (authority) => authority === 'ADMIN_DASHBOARD'
  );

  return (
    <Switch>
      <Route
        path={`/app/dashboard`}
        component={isAdmin ? Admindashboard : Employeedashboard}
      />
    </Switch>
  );
};

export default DashboardRoute;
