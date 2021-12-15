/**
 * App Header
 */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import app from '../../assets/js/app'

const Sidebar = (props) => {
  const authentication = useSelector((state) => state.authentication.value);
  let pathname = props.location.pathname;
  const isAdmin = authentication.user?.userAuthorites.some(
    (authority) => authority === 'ADMIN_DASHBOARD'
  );

  useEffect(() => {
    var Sidemenu = function () {
      this.$menuItem = $('#sidebar-menu a');
    };

    function init() {
      var $this = Sidemenu;
      $('#sidebar-menu a').on('click', function (e) {
        if ($(this).parent().hasClass('submenu')) {
          e.preventDefault();
        }
        if (!$(this).hasClass('subdrop')) {
          $('ul', $(this).parents('ul:first')).slideUp(350);
          $('a', $(this).parents('ul:first')).removeClass('subdrop');
          $(this).next('ul').slideDown(350);
          $(this).addClass('subdrop');
        } else if ($(this).hasClass('subdrop')) {
          $(this).removeClass('subdrop');
          $(this).next('ul').slideUp(350);
        }
      });
      $('#sidebar-menu ul li.submenu a.active')
        .parents('li:last')
        .children('a:first')
        .addClass('active')
        .trigger('click');
    }

    // Sidebar Initiate
    init();
  }, []);

  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li className="menu-title">
              <span>Main</span>
            </li>
            <li className={pathname.includes('dashboard') ? 'active' : ''}>
              <Link to="/app/dashboard">
                <i className="la la-users" /> <span>Dashboard</span>
              </Link>
            </li>
            <li className="submenu">
              <a href="#">
                <i className="la la-cube" /> <span> Apps</span>{' '}
                <span className="menu-arrow" />
              </a>
              <ul style={{ display: 'none' }}>
                <li>
                  <Link
                    onClick={() => localStorage.setItem('minheight', 'true')}
                    to="/conversation/chat"
                  >
                    Chat
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      pathname.includes('apps/calendar') ? 'active' : ''
                    }
                    to="/app/apps/calendar"
                  >
                    Calendar
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      pathname.includes('file-manager') ? 'active' : ''
                    }
                    to="/app/apps/file-manager"
                  >
                    File Manager
                  </Link>
                </li>
              </ul>
            </li>
            <li className="submenu">
              {/* className="noti-dot" */}
              <a href="#">
                <i className="la la-user" /> <span>Employee</span>{' '}
                <span className="menu-arrow" />
              </a>
              <ul style={{ display: 'none' }}>
                {isAdmin && (
                  <li>
                    <Link
                      className={
                        pathname.includes('allemployees')
                          ? 'active'
                          : pathname.includes('employees-list')
                          ? 'active'
                          : ''
                      }
                      to="/app/employee/allemployees"
                    >
                      All Employees
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    className={pathname.includes('holidays') ? 'active' : ''}
                    to="/app/employee/holidays"
                  >
                    Holidays
                  </Link>
                </li>
                {/* <span className="badge badge-pill bg-primary float-right">1</span> */}
                {isAdmin && (
                  <li>
                    <Link
                      className={pathname.includes('ve-types') ? 'active' : ''}
                      to="/app/employee/leave-types"
                    >
                      Leaves Types
                    </Link>
                  </li>
                )}
                {!isAdmin && (
                  <li>
                    <Link
                      className={
                        pathname.includes('ves-employee') ? 'active' : ''
                      }
                      to="/app/employee/leaves-employee"
                    >
                      {/* employee */}
                      Leaves
                    </Link>
                  </li>
                )}
                {/* {isAdmin && (
                  <li>
                    <Link
                      className={
                        pathname.includes('e-settings') ? 'active' : ''
                      }
                      to="/app/employee/leave-settings"
                    >
                      Leave Settings
                    </Link>
                  </li>
                )} */}
                {isAdmin && (
                  <li>
                    <Link
                      className={pathname.includes('nce-admin') ? 'active' : ''}
                      to="/app/employee/attendance-admin"
                    >
                      {/* admin */}
                      Attendance
                    </Link>
                  </li>
                )}
                {!isAdmin && (
                  <li>
                    <Link
                      className={
                        pathname.includes('ce-employee') ? 'active' : ''
                      }
                      to="/app/employee/attendance-employee"
                    >
                      {/* employee */}
                      Attendance
                    </Link>
                  </li>
                )}
                {isAdmin && (
                  <li>
                    <Link
                      className={
                        pathname.includes('departments') ? 'active' : ''
                      }
                      to="/app/employee/departments"
                    >
                      Departments
                    </Link>
                  </li>
                )}
                {isAdmin && (
                  <li>
                    <Link
                      className={
                        pathname.includes('designations') ? 'active' : ''
                      }
                      to="/app/employee/designations"
                    >
                      Designations
                    </Link>
                  </li>
                )}
                {!isAdmin && (
                  <li>
                    <Link
                      className={pathname.includes('timesheet') ? 'active' : ''}
                      to="/app/employee/timesheet"
                    >
                      Timesheet
                    </Link>
                  </li>
                )}
                {isAdmin && (
                  <>
                    <li>
                      <Link
                        className={
                          pathname.includes('shift-scheduling') ||
                          pathname.includes('shift-list')
                            ? 'active'
                            : ''
                        }
                        to="/app/employee/shift-scheduling"
                      >
                        Shift &amp; Schedule
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes('overtime') ? 'active' : ''
                        }
                        to="/app/employee/overtime"
                      >
                        Overtime
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </li>
            <li className="submenu">
              <a href="#">
                <i className="la la-rocket" /> <span> Projects</span>{' '}
                <span className="menu-arrow" />
              </a>
              <ul style={{ display: 'none' }}>
                {isAdmin && (
                  <li>
                    <Link
                      className={
                        pathname.includes('t_dashboard')
                          ? 'active'
                          : pathname.includes('projects-list')
                          ? 'active'
                          : pathname.includes('cts-view')
                          ? 'active'
                          : ''
                      }
                      to="/app/projects/project_dashboard"
                    >
                      Projects
                    </Link>
                  </li>
                )}

                <li>
                  <Link
                    onClick={() => localStorage.setItem('minheight', 'true')}
                    to="/tasks"
                  >
                    Tasks
                  </Link>
                </li>

                {isAdmin && (
                  <li>
                    <Link
                      className={
                        pathname.includes('task-board') ? 'active' : ''
                      }
                      to="/app/projects/task-board"
                    >
                      Task Board
                    </Link>
                  </li>
                )}
              </ul>
            </li>
            {isAdmin && (
              <li className="menu-title">
                <span>Sales</span>
              </li>
            )}

            {isAdmin && (
              <li className="submenu">
                <a href="#">
                  <i className="la la-files-o" /> <span> Sales </span>{' '}
                  <span className="menu-arrow" />
                </a>
                <ul style={{ display: 'none' }}>
                  <li>
                    <Link
                      className={pathname.includes('estimates') ? 'active' : ''}
                      to="/app/sales/estimates"
                    >
                      Estimates
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={pathname.includes('invoices') ? 'active' : ''}
                      to="/app/sales/invoices"
                    >
                      Invoices
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={pathname.includes('payments') ? 'active' : ''}
                      to="/app/sales/payments"
                    >
                      Payments
                    </Link>
                  </li>
                </ul>
              </li>
            )}
            {isAdmin && (
              <li className={pathname.includes('leads') ? 'active' : ''}>
                <Link to="/app/employees/leads">
                  <i className="la la-user-secret" /> <span>Leads</span>
                </Link>
              </li>
            )}
            {isAdmin && (
              <li className={pathname.includes('clients') ? 'active' : ''}>
                <Link to="/app/employees/clients">
                  <i className="la la-users" /> <span>Clients</span>
                </Link>
              </li>
            )}

            {isAdmin && (
              <li className="menu-title">
                <span>Accounts</span>
              </li>
            )}

            {isAdmin && (
              <>
                <li>
                  <Link
                    className={
                      pathname.includes('categories') ||
                      pathname.includes('sub-category')
                        ? 'active'
                        : ''
                    }
                    to="/app/accounts/categories"
                  >
                    <i className="la la-bars"></i>
                    <span>Categories</span>
                  </Link>
                </li>
                <li className="submenu">
                  <a href="#">
                    <i className="las la-money-bill-wave"></i>{' '}
                    <span> Budgets </span> <span className="menu-arrow" />
                  </a>
                  <ul style={{ display: 'none' }}>
                    <li>
                      <Link
                        className={pathname.includes('budgets') ? 'active' : ''}
                        to="/app/accounts/budgets"
                      >
                        All
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes('budget-expenses') ? 'active' : ''
                        }
                        to="/app/accounts/budget-expenses"
                      >
                        Expenses
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes('budget-revenues') ? 'active' : ''
                        }
                        to="/app/accounts/budget-revenues"
                      >
                        Revenues
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link
                    className={pathname.includes('expenses') ? 'active' : ''}
                    to="/app/sales/expenses"
                  >
                    <i className="las la-file-invoice"></i>
                    <span>Expenses</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      pathname.includes('provident-fund') ? 'active' : ''
                    }
                    to="/app/sales/provident-fund"
                  >
                    <i className="las la-wallet"></i>
                    <span>Provident Fund</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className={pathname.includes('taxes') ? 'active' : ''}
                    to="/app/sales/taxes"
                  >
                    <i className="las la-file-invoice-dollar"></i>
                    <span>Taxes</span>
                  </Link>
                </li>
              </>
            )}

            {isAdmin && (
              <>
                {' '}
                <li className="menu-title">
                  <span>Performance</span>
                </li>
                <li>
                  <Link
                    className={pathname.includes('project-') ? 'active' : ''}
                    to="/app/reports/project-reports"
                  >
                    <i className="las la-id-badge"></i>
                    <span>Project Report</span>
                  </Link>
                </li>
                <li className="submenu">
                  <a href="#">
                    <i className="la la-graduation-cap" />{' '}
                    <span> Performance </span> <span className="menu-arrow" />
                  </a>
                  <ul style={{ display: 'none' }}>
                    <li>
                      <Link
                        className={
                          pathname.includes('-indicator') ? 'active' : ''
                        }
                        to="/app/performances/performance-indicator"
                      >
                        {' '}
                        Performance Indicator{' '}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={pathname.includes('-review') ? 'active' : ''}
                        to="/app/performances/performance-review"
                      >
                        {' '}
                        Performance Review{' '}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes('-appraisal') ? 'active' : ''
                        }
                        to="/app/performances/performance-appraisal"
                      >
                        {' '}
                        Performance Appraisal{' '}
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="submenu">
                  <a href="#">
                    <i className="la la-crosshairs" /> <span> Goals </span>{' '}
                    <span className="menu-arrow" />
                  </a>
                  <ul style={{ display: 'none' }}>
                    <li>
                      <Link
                        className={
                          pathname.includes('-tracking') ? 'active' : ''
                        }
                        to="/app/goals/goal-tracking"
                      >
                        {' '}
                        Goal List{' '}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={pathname.includes('l-type') ? 'active' : ''}
                        to="/app/goals/goal-type"
                      >
                        {' '}
                        Goal Type{' '}
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            )}

            <li className="menu-title">
              <span>Human Resource</span>
            </li>
            {isAdmin && (
              <li className="submenu">
                <a href="#">
                  <i className="la la-briefcase" /> <span> Jobs </span>{' '}
                  <span className="menu-arrow" />
                </a>
                <ul style={{ display: 'none' }}>
                  <li>
                    <Link
                      className={
                        pathname.includes('jobs-dashboard') ? 'active' : ''
                      }
                      to="/app/administrator/jobs-dashboard"
                    >
                      {' '}
                      Jobs Dasboard{' '}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={
                        pathname === '/app/administrator/jobs' ? 'active' : ''
                      }
                      to="/app/administrator/jobs"
                    >
                      {' '}
                      Manage Jobs{' '}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={
                        pathname.includes('manage-resumes') ? 'active' : ''
                      }
                      to="/app/administrator/manage-resumes"
                    >
                      {' '}
                      Manage Resumes{' '}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={
                        pathname.includes('shortlist-candidates')
                          ? 'active'
                          : ''
                      }
                      to="/app/administrator/shortlist-candidates"
                    >
                      {' '}
                      Shortlist Candidates{' '}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={
                        pathname.includes('offer_approvals') ? 'active' : ''
                      }
                      to="/app/administrator/offer_approvals"
                    >
                      {' '}
                      Offer Approvals{' '}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={
                        pathname === '/app/administrator/candidates'
                          ? 'active'
                          : ''
                      }
                      to="/app/administrator/candidates"
                    >
                      {' '}
                      Candidates List{' '}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={
                        pathname.includes('schedule-timing') ? 'active' : ''
                      }
                      to="/app/administrator/schedule-timing"
                    >
                      {' '}
                      Schedule timing{' '}
                    </Link>
                  </li>
                </ul>
              </li>
            )}
            <li className="submenu">
              <a href="#">
                <i className="la la-money" /> <span> Payroll </span>{' '}
                <span className="menu-arrow" />
              </a>
              <ul style={{ display: 'none' }}>
                {isAdmin && (
                  <li>
                    <Link
                      className={pathname.includes('_salary') ? 'active' : ''}
                      to="/app/payroll/_salary"
                    >
                      {' '}
                      Employee Salary{' '}
                    </Link>
                  </li>
                )}
                {!isAdmin && (
                  <li>
                    <Link
                      className={pathname.includes('y-view') ? 'active' : ''}
                      to="/app/payroll/salary-view"
                    >
                      {' '}
                      Payslip{' '}
                    </Link>
                  </li>
                )}
                {isAdmin && (
                  <li>
                    <Link
                      className={
                        pathname.includes('payroll-items') ? 'active' : ''
                      }
                      to="/app/payroll/payroll-items"
                    >
                      {' '}
                      Payroll Items{' '}
                    </Link>
                  </li>
                )}
              </ul>
            </li>

            {isAdmin && (
              <li className="submenu">
                <a href="#">
                  <i className="la la-pie-chart" /> <span> Reports </span>{' '}
                  <span className="menu-arrow" />
                </a>
                <ul style={{ display: 'none' }}>
                  <li>
                    <Link
                      className={pathname.includes('payments-') ? 'active' : ''}
                      to="/app/reports/payments-reports"
                    >
                      {' '}
                      Payments Report{' '}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={pathname.includes('employee-') ? 'active' : ''}
                      to="/app/reports/employee-reports"
                    >
                      {' '}
                      Employee Report{' '}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={pathname.includes('payslip-') ? 'active' : ''}
                      to="/app/reports/payslip-reports"
                    >
                      {' '}
                      Payslip Report{' '}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={
                        pathname.includes('attendance-') ? 'active' : ''
                      }
                      to="/app/reports/attendance-reports"
                    >
                      {' '}
                      Attendance Report{' '}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={
                        pathname.includes('leave-reports') ? 'active' : ''
                      }
                      to="/app/reports/leave-reports"
                    >
                      {' '}
                      Leave Report{' '}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={pathname.includes('daily-') ? 'active' : ''}
                      to="/app/reports/daily-reports"
                    >
                      {' '}
                      Daily Report{' '}
                    </Link>
                  </li>
                </ul>
              </li>
            )}
            {isAdmin && (
              <>
                {' '}
                <li className="submenu">
                  {/* className="noti-dot" */}
                  <a href="#">
                    <i className="la la-user" /> <span>Approvals</span>{' '}
                    <span className="menu-arrow" />
                  </a>
                  <ul style={{ display: 'none' }}>
                    <>
                      <li>
                        <Link
                          className={
                            pathname.includes('es-admin') ? 'active' : ''
                          }
                          to="/app/employee/leaves-admin"
                        >
                          {/* admin */}
                          Leaves
                        </Link>
                      </li>
                    </>

                    <li>
                      <Link
                        className={
                          pathname.includes('timesheet') ? 'active' : ''
                        }
                        to="/app/employee/timesheet"
                      >
                        Timesheet
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            )}

            {!isAdmin && (
              <li className={pathname.includes('resignation') ? 'active' : ''}>
                <Link to="/app/performance/resignation">
                  <i className="la la-external-link-square" />{' '}
                  <span>Resignation</span>
                </Link>
              </li>
            )}
            {isAdmin && (
              <>
                <li className={pathname.includes('promotion') ? 'active' : ''}>
                  <Link to="/app/performance/promotion">
                    <i className="la la-bullhorn" /> <span>Promotion</span>
                  </Link>
                </li>
                <li
                  className={pathname.includes('termination') ? 'active' : ''}
                >
                  <Link to="/app/performance/termination">
                    <i className="la la-times-circle" />{' '}
                    <span>Termination</span>
                  </Link>
                </li>
              </>
            )}
            {isAdmin && (
              <li className="menu-title">
                <span>Administration</span>
              </li>
            )}
            {isAdmin && (
              <li className={pathname.includes('locations') ? 'active' : ''}>
                <Link to="/app/administrator/locations">
                  <i className="la la-search-location" /> <span>Locations</span>
                </Link>
              </li>
            )}
            {isAdmin && (
              <li className={pathname.includes('assets') ? 'active' : ''}>
                <Link to="/app/administrator/assets">
                  <i className="la la-object-ungroup" /> <span>Assets</span>
                </Link>
              </li>
            )}
            {isAdmin && (
              <li className={pathname.includes('policies') ? 'active' : ''}>
                <Link to="/app/administrator/policies">
                  <i className="la la-file-pdf-o" /> <span>Policies</span>
                </Link>
              </li>
            )}
            {isAdmin && (
              <>
                <li
                  className={
                    pathname.includes('administrator/users') ? 'active' : ''
                  }
                >
                  <Link to="/app/administrator/users">
                    <i className="la la-user-plus" /> <span>Users</span>
                  </Link>
                </li>
                <li className={pathname.includes('activities') ? 'active' : ''}>
                  <Link to="/app/administrator/activities">
                    <i className="la la-bell" /> <span>Activities</span>
                  </Link>
                </li>
              </>
            )}

            <li className="menu-title">
              <span>Support</span>
            </li>
            <li
              className={
                pathname.includes('tickets')
                  ? 'active'
                  : pathname.includes('ticket-view')
                  ? 'active'
                  : ''
              }
            >
              <Link to="/app/employees/tickets">
                <i className="la la-ticket" /> <span>Tickets</span>
              </Link>
            </li>
            <li className={pathname.includes('knowledgebase') ? 'active' : ''}>
              <Link to="/app/administrator/knowledgebase">
                <i className="la la-question" /> <span>Knowledgebase</span>
              </Link>
            </li>
            <li>
              <Link to="/email/inbox">
                <i className="las la-envelope"></i>
                <span>Email</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Sidebar);
