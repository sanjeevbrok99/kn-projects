/**
 * App Header
 */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div className="sidebar-menu">
          <ul>
            <li>
              <Link
                onClick={() => localStorage.setItem('firstload', 'true')}
                to="/app/main/dashboard"
              >
                <i className="la la-home" /> <span>Back to Home</span>
              </Link>
            </li>
            <li className="menu-title">
              Projects{' '}
              <a href="#" data-toggle="modal" data-target="#create_project">
                <i className="fa fa-plus" />
              </a>
            </li>
            <li>
              <Link to="/tasks/tasks">Project Management</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Sidebar);
