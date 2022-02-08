/**
 * Signin Firebase
 */

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import {
  User,
  Avatar_19,
  Avatar_07,
  Avatar_06,
  Avatar_14,
} from '../../../Entryfile/imagepath.jsx';

import {
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

import '../../index.css';

import { getDashboard } from '../../../lib/api/index.js';
import { useSelector } from 'react-redux';
// import 'Assets/plugins/morris/morris.min.js';
// import 'Assets/plugins/raphael/raphael.min.js';
// import 'Assets/js/chart.js';

const barchartdata = [
  { y: '2006', 'Total Income': 100, 'Total Outcome': 90 },
  { y: '2007', 'Total Income': 75, 'Total Outcome': 65 },
  { y: '2008', 'Total Income': 50, 'Total Outcome': 40 },
  { y: '2009', 'Total Income': 75, 'Total Outcome': 65 },
  { y: '2010', 'Total Income': 50, 'Total Outcome': 40 },
  { y: '2011', 'Total Income': 75, 'Total Outcome': 65 },
  { y: '2012', 'Total Income': 100, 'Total Outcome': 90 },
];
const linechartdata = [
  { y: '2006', 'Total Sales': 50, 'Total Revenue': 90 },
  { y: '2007', 'Total Sales': 75, 'Total Revenue': 65 },
  { y: '2008', 'Total Sales': 50, 'Total Revenue': 40 },
  { y: '2009', 'Total Sales': 75, 'Total Revenue': 65 },
  { y: '2010', 'Total Sales': 50, 'Total Revenue': 40 },
  { y: '2011', 'Total Sales': 75, 'Total Revenue': 65 },
  { y: '2012', 'Total Sales': 100, 'Total Revenue': 50 },
];
const AdminDashboard = () => {
  const user = useSelector((state) => state.authentication.value.user);
  const [dashboard, setDashboard] = useState({
    projectCount: 0,
    employeeCount: 0,
    customerCount: 0,
    leadCount: 0,
    invoices: [],
    payments: [],
  });

  useEffect(() => {
    async function fetchApi() {
      try {
        const res = await getDashboard();
        if (res.error) {
          console.log('-------INTERNAL SERVER ERROR-------');
          return;
        }
        console.log(res);
        setDashboard(res);
      } catch (err) {
        console.log(err);
      }
    }
    fetchApi();
  }, []);

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Welcome {user?.firstName}!</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item active">Dashboard</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div className="card dash-widget">
              <div className="card-body">
                <span className="dash-widget-icon">
                  <i className="fa fa-cubes" />
                </span>
                <div className="dash-widget-info">
                  <h3>{dashboard.projectCount}</h3>
                  <span>Projects</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div className="card dash-widget">
              <div className="card-body">
                <span className="dash-widget-icon">
                  <i className="fa fa-usd" />
                </span>
                <div className="dash-widget-info">
                  <h3>{dashboard.customerCount}</h3>
                  <span>Clients</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div className="card dash-widget">
              <div className="card-body">
                <span className="dash-widget-icon">
                  <i className="fa fa-diamond" />
                </span>
                <div className="dash-widget-info">
                  <h3>{dashboard.leadCount}</h3>
                  <span>Leads</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div className="card dash-widget">
              <div className="card-body">
                <span className="dash-widget-icon">
                  <i className="fa fa-user" />
                </span>
                <div className="dash-widget-info">
                  <h3>{dashboard.employeeCount}</h3>
                  <span>Employees</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-12 col-xl-4 d-flex">
            <div className="card flex-fill dash-statistics">
              <div className="card-body">
                <h5 className="card-title">Statistics</h5>
                <div className="stats-list">
                  <div className="stats-info">
                    <p>
                      Today Leave{' '}
                      <strong>
                        4 <small>/ 65</small>
                      </strong>
                    </p>
                    <div className="progress">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: '31%' }}
                        aria-valuenow={31}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                  <div className="stats-info">
                    <p>
                      Pending Invoice{' '}
                      <strong>
                        15 <small>/ 92</small>
                      </strong>
                    </p>
                    <div className="progress">
                      <div
                        className="progress-bar bg-warning"
                        role="progressbar"
                        style={{ width: '31%' }}
                        aria-valuenow={31}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                  <div className="stats-info">
                    <p>
                      Completed Projects{' '}
                      <strong>
                        85 <small>/ 112</small>
                      </strong>
                    </p>
                    <div className="progress">
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: '62%' }}
                        aria-valuenow={62}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                  <div className="stats-info">
                    <p>
                      Open Tickets{' '}
                      <strong>
                        190 <small>/ 212</small>
                      </strong>
                    </p>
                    <div className="progress">
                      <div
                        className="progress-bar bg-danger"
                        role="progressbar"
                        style={{ width: '62%' }}
                        aria-valuenow={62}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                  <div className="stats-info">
                    <p>
                      Closed Tickets{' '}
                      <strong>
                        22 <small>/ 212</small>
                      </strong>
                    </p>
                    <div className="progress">
                      <div
                        className="progress-bar bg-info"
                        role="progressbar"
                        style={{ width: '22%' }}
                        aria-valuenow={22}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-6 col-xl-4 d-flex">
            <div className="card flex-fill">
              <div className="card-body">
                <h4 className="card-title">Task Statistics</h4>
                <div className="statistics">
                  <div className="row">
                    <div className="col-md-6 col-6 text-center">
                      <div className="stats-box mb-4">
                        <p>Total Tasks</p>
                        <h3>385</h3>
                      </div>
                    </div>
                    <div className="col-md-6 col-6 text-center">
                      <div className="stats-box mb-4">
                        <p>Overdue Tasks</p>
                        <h3>19</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="progress mb-4">
                  <div
                    className="progress-bar bg-purple"
                    role="progressbar"
                    style={{ width: '30%' }}
                    aria-valuenow={30}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    30%
                  </div>
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: '22%' }}
                    aria-valuenow={18}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    22%
                  </div>
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: '24%' }}
                    aria-valuenow={12}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    24%
                  </div>
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{ width: '26%' }}
                    aria-valuenow={14}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    21%
                  </div>
                  <div
                    className="progress-bar bg-info"
                    role="progressbar"
                    style={{ width: '10%' }}
                    aria-valuenow={14}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    10%
                  </div>
                </div>
                <div>
                  <p>
                    <i className="fa fa-dot-circle-o text-purple mr-2" />
                    Completed Tasks <span className="float-right">166</span>
                  </p>
                  <p>
                    <i className="fa fa-dot-circle-o text-warning mr-2" />
                    Inprogress Tasks <span className="float-right">115</span>
                  </p>
                  <p>
                    <i className="fa fa-dot-circle-o text-success mr-2" />
                    On Hold Tasks <span className="float-right">31</span>
                  </p>
                  <p>
                    <i className="fa fa-dot-circle-o text-danger mr-2" />
                    Pending Tasks <span className="float-right">47</span>
                  </p>
                  <p className="mb-0">
                    <i className="fa fa-dot-circle-o text-info mr-2" />
                    Review Tasks <span className="float-right">5</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-6 col-xl-4 d-flex">
            <div className="card flex-fill">
              <div className="card-body">
                <h4 className="card-title">
                  Today Absent{' '}
                  <span className="badge bg-inverse-danger ml-2">5</span>
                </h4>
                <div className="leave-info-box">
                  <div className="media align-items-center">
                    <Link to="/app/profile/employee-profile" className="avatar">
                      <img alt="" src={User} />
                    </Link>
                    <div className="media-body">
                      <div className="text-sm my-0">Vikram Bedi</div>
                    </div>
                  </div>
                  <div className="row align-items-center mt-3">
                    <div className="col-6">
                      <h6 className="mb-0">4 Sep 2021</h6>
                      <span className="text-sm text-muted">Leave Date</span>
                    </div>
                    <div className="col-6 text-right">
                      <span className="badge bg-inverse-danger">Pending</span>
                    </div>
                  </div>
                </div>
                <div className="leave-info-box">
                  <div className="media align-items-center">
                    <Link to="/app/profile/employee-profile" className="avatar">
                      <img alt="" src={User} />
                    </Link>
                    <div className="media-body">
                      <div className="text-sm my-0">Vikram Bedi</div>
                    </div>
                  </div>
                  <div className="row align-items-center mt-3">
                    <div className="col-6">
                      <h6 className="mb-0">4 Sep 2021</h6>
                      <span className="text-sm text-muted">Leave Date</span>
                    </div>
                    <div className="col-6 text-right">
                      <span className="badge bg-inverse-success">Approved</span>
                    </div>
                  </div>
                </div>
                <div className="load-more text-center">
                  <a className="text-dark" href="">
                    Load More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Statistics Widget */}
        <div className="row">
          <div className="col-md-6 d-flex">
            <div className="card card-table flex-fill">
              <div className="card-header">
                <h3 className="card-title mb-0">Invoices</h3>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-nowrap custom-table mb-0">
                    <thead>
                      <tr>
                        <th>Invoice ID</th>
                        <th>Customer</th>
                        <th>Due Date</th>
                        <th>Total</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboard.invoices.map((inv) => {
                        return (
                          <tr>
                            <td>
                              <Link to="/app/sales/invoices-view">
                                {inv._id}
                              </Link>
                            </td>
                            <td>
                              <h2>
                                <a href="#">{inv.customer?.name}</a>
                              </h2>
                            </td>
                            <td>{inv.invoiceDate}</td>
                            <td>{inv.total}</td>
                            <td>
                              <span className="badge bg-inverse-warning">
                                {inv.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer">
                <Link to="/app/sales/invoices">View all invoices</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 d-flex">
            <div className="card card-table flex-fill">
              <div className="card-header">
                <h3 className="card-title mb-0">Payments</h3>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table custom-table table-nowrap mb-0">
                    <thead>
                      <tr>
                        <th>Invoice ID</th>
                        <th>Customer</th>
                        <th>Payment Type</th>
                        <th>Paid Date</th>
                        <th>Paid Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboard.payments.map((payment) => {
                        return (
                          <tr>
                            <td>
                              <Link to="/app/sales/invoices-view">
                                {payment._id}
                              </Link>
                            </td>
                            <td>
                              <h2>
                                <a href="#">{payment.customer}</a>
                              </h2>
                            </td>
                            <td>{payment.paymentMode}</td>
                            <td>{payment.paymentDate}</td>
                            <td>{payment.amount}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer">
                <Link to="/app/sales/payments">View all payments</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(AdminDashboard);
