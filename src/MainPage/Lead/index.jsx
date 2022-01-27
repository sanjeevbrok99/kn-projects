/**
 * Crm Routes
 */
/* eslint-disable */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LeadStatus from './LeadStatus';

const LeadsRoute = ({ match }) => {
  console.log(`${match.url}/lead-status`);
  return (
    <Switch>
      <Route path={`${match.url}/lead-status`} component={LeadStatus} />
    </Switch>
  );
};

export default LeadsRoute;
