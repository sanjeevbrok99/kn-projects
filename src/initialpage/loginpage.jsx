/**
 * Signin Firebase
 */

import React, { Component, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';
import { headerlogo } from '../Entryfile/imagepath.jsx';
import httpService from '../lib/httpService.js';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setAuthticationStore } from '../features/authentication/authenticationSlice.js';

const Loginpage = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);
    const fetchUser = new Promise((resolve, reject) => {
      httpService
        .post('/public/login', {
          userName: username,
          password,
        })
        .then((res) => {
          dispatch(setAuthticationStore(res.data));
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
    toast
      .promise(fetchUser, {
        pending: 'Logging In',
        success: 'Success',
        error: 'Bad Credentials',
      })
      .then(() => {
        history.push('/app/dashboard');
      });
  };

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
                  <label>Username</label>
                  <input
                    className="form-control"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
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
                  <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group text-center">
                  <button
                    className="btn btn-primary account-btn"
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
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
