/**
 * App Routes
 */
import React, { Component, useEffect } from 'react';
import { Route, withRouter, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import routerService from '../../router_service';
import httpService from '../../lib/httpService';

import Header from './header.jsx';
import SidebarContent from './sidebar';
import Dashboard from '../../MainPage/Main/Dashboard';

const DefaultLayout = (props) => {
  const { match } = props;
  const authentication = useSelector((state) => state.authentication.value);
  const userAuthorities = authentication.user?.userAuthorites;
  const history = useHistory();
  useEffect(() => {
    const token = authentication?.token;
    if (!token) {
      history.push('/');
      return;
    }
    httpService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, []);
  return (
    <>
      <Header />
      <div>
        {routerService &&
          routerService.map((route, key) => (
            <Route
              key={key}
              path={`${match.url}/${route.path}/`}
              component={route.component}
            />
          ))}
      </div>
      <SidebarContent />
    </>
  );
};
export default withRouter(DefaultLayout);
