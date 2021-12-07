/**
 * Signin Firebase
 */

import React, { Component, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { headerlogo } from '../Entryfile/imagepath.jsx';

const Loginpage = () => {
  useEffect(() => {
    sessionStorage.clear();
  }, []);
  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <div className="account-content">
        <Link to="/applyjob/joblist" className="btn btn-primary apply-btn">
          Apply Job
        </Link>
        <div className="container">
          {/* Account Logo */}
          <div className="account-logo">
            <Link to="/app/main/dashboard">
              <img src={headerlogo} alt="Oboroi Real Estates" />
            </Link>
          </div>
          {/* /Account Logo */}
          <div className="account-box">
            <div className="account-wrapper">
              <h3 className="account-title">Login</h3>
              <p className="account-subtitle">Access to dashboard</p>
              {/* Account Form */}
              <div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input className="form-control" type="text" />
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col">
                      <label>Password</label>
                    </div>
                    <div className="col-auto">
                      <Link className="text-muted" to="/forgotpassword">
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                  <input className="form-control" type="password" />
                </div>
                <div className="custom-control custom-switch form-group">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="userTypeSwitch"
                    onChange={(e) => {
                      if (e.target.checked) {
                        sessionStorage.setItem('authType', 'admin');
                        // console.log(sessionStorage.getItem('userType'));
                      } else {
                        sessionStorage.clear();
                      }
                    }}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="userTypeSwitch"
                  >
                    Login as admin
                  </label>
                </div>
                <div className="form-group text-center">
                  <Link
                    onClick={() => localStorage.setItem('firstload', 'true')}
                    className="btn btn-primary account-btn"
                    to="/app/main/dashboard"
                  >
                    Login
                  </Link>
                </div>
                <div className="account-footer">
                  <p>
                    Don't have an account yet?{' '}
                    <Link to="/register">Register</Link>
                  </p>
                </div>
              </div>
              {/* /Account Form */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loginpage;
