import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

const employeeMenu = [
  {
    name: 'Dashboard',
    link: '/dashboard',
    icon: 'la la-users',
  },
  {
    name: 'Leads',
    hasChildren: true,
    icon: 'la la-users',
    children: [
      {
        name: 'All Leads',
        link: '/employees/leads',
      },
      {
        name: 'Lead Status',
        link: '/leads/lead-status',
      },
    ],
  },
  {
    name: 'Sales',
    hasChildren: true,
    icon: 'la la-money',
    children: [
      {
        name: 'Customers',
        link: '/sales/customers',
      },
      {
        name: 'Projects',
        link: '/projects/projects-list',
      },
    ],
  },
];

const bar = [
  {
    name: 'Main',
    children: [
      {
        name: 'Dashboard',
        link: '/dashboard',
        icon: 'la la-users',
        hasChildren: false,
      },
      {
        name: 'HRMS',
        hasChildren: true,
        icon: 'la la-file-pdf-o',
        children: [
          {
            name: 'Employee List',
            link: '/employee/employees-list',
          },
          {
            name: 'Attendance',
            link: '/employee/attendance-admin',
          },
          {
            name: 'Leave Request',
            link: '/administrator/leave-request',
          },
          {
            name: 'Jobs',
            link: '/administrator/jobs',
          },
          {
            name: 'Applicants',
            link: '/administrator/candidates',
          },
          {
            name: 'Onboarding',
            link: '/administrator/onboarding',
          },
          {
            name: 'Employee Activities',
            link: '/administrator/daily-activity',
          },
          {
            name: 'Payroll',
            link: '/administrator/payroll',
          },
          {
            name: 'Skill Development',
            link: '/administrator/skill-development',
          },
          {
            name: 'Benefits Management',
            link: '/administrator/benefits-management',
          },
        ],
      },
      // jin - updated leads and deleted lead status and contacts
      {
        name: 'Leads',
        hasChildren: true,
        icon: 'la la-users',
        children: [
          {
            name: 'All Leads',
            link: '/employees/leads',
          },
          {
            name: 'Lead Status',
            link: '/leads/lead-status',
          },
        ],
      },
      // {
      //   name: 'Contacts',
      //   hasChildren: true,
      //   icon: 'la la-users',
      //   children: [
      //     {
      //       name: 'Lead Assignment',
      //       link: '/contacts/lead-assignment',
      //     },
      //     {
      //       name: 'Lead Reporting',
      //       link: '/contacts/lead-reporting',
      //     },
      //   ],
      // },
      // {
      //   name: 'Lead Status',
      //   hasChildren: true,
      //   icon: 'la la-id-badge',
      //   children: [
      //     {
      //       name: 'Lead Status',
      //       link: '/leads/lead-status',
      //     },
      //     {
      //       name: 'Lead Status',
      //       link: '/leads/lead-status',
      //     },
      //   ],
      // },
      {
        name: 'Sales',
        hasChildren: true,
        icon: 'la la-money',
        children: [
          {
            name: 'Customers',
            link: '/sales/customers',
          },
          {
            name: 'Invoices',
            link: '/sales/invoices',
          },
          {
            name: 'Payment Received',
            link: '/sales/payment-received',
          },
          {
            name: 'Projects',
            link: '/projects/projects-list',
          },

          {
            name: 'Credit Notes',
            link: '/sales/credit-notes',
          },
        ],
      },
      {
        name: 'Purchase',
        hasChildren: true,
        icon: 'la la-shopping-cart',
        children: [
          {
            name: 'Vendors',
            link: '/purchase/vendors',
          },
          {
            name: 'Expenses',
            link: '/purchase/expenses',
          },
          {
            name: 'Payment Made',
            link: '/purchase/payment-made',
          },
          {
            name: 'Vendor Credits',
            link: '/purchase/vendor-credits',
          },
        ],
      },
      {
        name: 'Accounts',
        hasChildren: true,
        icon: 'la la-money',
        children: [
          {
            name: 'Manual Journals',
            link: '/accounts/manual-journals',
          },
          {
            name: 'Account Receiveable',
            link: '/accounts/account-receiveable',
          },
          {
            name: 'Account Payable',
            link: '/accounts/account-payable',
          },
          {
            name: 'General Ledger',
            link: '/accounts/general-ledger',
          },
          {
            name: 'Customer Balances',
            link: '/accounts/customer-balances',
          },
          {
            name: 'Fixed Assets',
            link: '/accounts/fixed-assets',
          },
          // {
          //   name: 'Project Sales',
          //   link: '/accounts/project-sales',
          // },
        ],
      },
      {
        name: 'Tickets',
        hasChildren: true,
        icon: 'la la-ticket',
        children: [
          {
            name: 'Tickets',
            link: '/employees/tickets',
          },
        ],
      },
      {
        name: 'Reports',
        hasChildren: true,
        icon: 'la la-file-pdf-o',
        children: [
          {
            name: 'Profit & Loss',
            link: '/reports/profit-and-loss',
          },
          {
            name: 'Cash Flow Statement',
            link: '/reports/cash-flow-statement',
          },
          {
            name: 'Balance Sheet',
            link: '/reports/balance-sheet',
          },
          {
            name: 'Sales By Customer',
            link: '/reports/sales-by-customer',
          },
          {
            name: 'Sales By Employee',
            link: '/reports/sales-by-agent',
          },
          {
            name: 'Sales By Projects',
            link: '/reports/sales-by-product',
          },
        ],
      },
    ],
  },
];

const Sidebar = (props) => {
  const authentication = useSelector((state) => state.authentication.value);
  let pathname = props.location.pathname;
  const isAdmin = authentication?.user?.jobRole?.authorities.includes('ADMIN');
  const isHR = authentication?.user?.jobRole?.authorities.includes('HR');
  const isEmployee =
    authentication?.user?.jobRole?.authorities.includes('EMPLOYEE');
  const isManager =
    authentication?.user?.jobRole.authorities.includes('MANAGER');
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    var Sidemenu = function () {
      this.$menuItem = $('#sidebar-menu a');
    };

    function init() {
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
    if (firstLoad) {
      setTimeout(() => {
        init();
        setFirstLoad(false);
      }, 1000);
    }
  }, []);

  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            {isAdmin &&
              bar.map((item, index) => (
                <>
                  <li className="menu-title">
                    <span>{item.name}</span>
                  </li>
                  {item.children.map((child, index) =>
                    child.hasChildren ? (
                      <li className="submenu">
                        <a href="#">
                          <i className={child.icon} />{' '}
                          <span> {child.name}</span>{' '}
                          <span className="menu-arrow" />
                        </a>
                        <ul style={{ display: 'none' }}>
                          {child.children.map((sc) => (
                            <li>
                              <Link
                                className={
                                  pathname.includes(sc.link) ? 'active' : ''
                                }
                                to={`/app${sc.link}`}
                              >
                                {sc.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ) : (
                      <li>
                        <Link
                          className={
                            pathname.includes(child.link) ? 'active' : ''
                          }
                          to={`/app${child.link}`}
                        >
                          <i className={child.icon}></i>
                          <span>{child.name}</span>
                        </Link>
                      </li>
                    )
                  )}
                </>
              ))}
            {isEmployee && (
              <>
                {employeeMenu.map((child, index) =>
                  child.hasChildren ? (
                    <li className="submenu">
                      <a href="#">
                        <i className={child.icon} /> <span> {child.name}</span>{' '}
                        <span className="menu-arrow" />
                      </a>
                      <ul style={{ display: 'none' }}>
                        {child.children.map((sc) => (
                          <li>
                            <Link
                              className={
                                pathname.includes(sc.link) ? 'active' : ''
                              }
                              to={`/app${sc.link}`}
                            >
                              {sc.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li>
                      <Link
                        className={
                          pathname.includes(child.link) ? 'active' : ''
                        }
                        to={`/app${child.link}`}
                      >
                        <i className={child.icon}></i>
                        <span>{child.name}</span>
                      </Link>
                    </li>
                  )
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Sidebar);
