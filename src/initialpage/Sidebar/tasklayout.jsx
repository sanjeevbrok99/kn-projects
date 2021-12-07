/**
 * App Routes
 */
import React, { Component, useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Tasks from '../../MainPage/Employees/Projects/tasks/tasks';

// router service
import taskservice from '../../router_service/taskservice';

import Header from './header';
import SidebarContent from './tasksidebar';

const Tasklayout = (props) => {
  useEffect(() => {
    document
      .querySelector('.page-wrapper')
      .setAttribute('style', 'height: 100vh;');
  }, []);
  const { match } = props;
  return (
    <>
      <Header />
      {/* <div> */}
      {/* {taskservice &&
        taskservice.map((route, key) => {
          console.log(`${match.url}/${route.path}`);
          return (
            <Route
              key={key}
              path={`${match.url}/${route.path}`}
              component={route.component}
            />
          );
        })} */}
      <Tasks />
      {/* </div>				 */}
      <SidebarContent />
    </>
  );
};
export default withRouter(Tasklayout);
