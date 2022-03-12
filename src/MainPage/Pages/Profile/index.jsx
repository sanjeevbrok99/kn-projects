/**
 * Tables Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import EmployeeProfile from './employeeprofile';
import ClientProfile from './clientprofile';
import leadprofile from './leadprofile';
import CustomerProfile from './CustomerProfile';
import VendorProfile from './VendorProfile';

const subscriptionroute = ({ match }) => (
  <Switch>
    <Redirect
      exact
      from={`${match.url}/`}
      to={`${match.url}/employee-profile`}
    />
    <Route
      path={`${match.url}/employee-profile/:id`}
      component={EmployeeProfile}
    />
    <Route path={`${match.url}/client-profile`} component={ClientProfile} />
    <Route
      path={`${match.url}/customer-profile/:id`}
      component={CustomerProfile}
    />
    <Route path={`${match.url}/vendor-profile/:id`} component={VendorProfile} />
    <Route path={`${match.url}/lead-profile/:id`} component={leadprofile} />
  </Switch>
);

export default subscriptionroute;
