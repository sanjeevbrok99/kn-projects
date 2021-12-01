/**
 * Crm Routes
 */
/* eslint-disable */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Admindashboard from './admindashboard';
import Employeedashboard from './employeedashboard';

const DashboardRoute = ({ match }) => {
  const isAdmin = sessionStorage.getItem('authType');
  return (
    <Switch>
      <Route
        path={`${match.url}/dashboard`}
        component={isAdmin ? Admindashboard : Employeedashboard}
      />
      {/* <Route path={`${match.url}/employee-dashboard`} component={Employeedashboard} /> */}
      {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/dashboard`} /> */}
    </Switch>
  );
};

export default DashboardRoute;
