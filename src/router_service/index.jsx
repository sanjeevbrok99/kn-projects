//main
import Dashboard from '../MainPage/Main/Dashboard';
import Apps from '../MainPage/Main/Apps';
//Pages
import ProfilePage from '../MainPage/Pages/Profile';
import Subscription from '../MainPage/Pages/Subscription';
import Pages from '../MainPage/Pages/Pages';
//Administrator
import Administrator from '../MainPage/Administration';
//Performance
import Performance from '../MainPage/Performance';
import Goals from '../MainPage/Performance/Goals';
import Performances from '../MainPage/Performance/Performance';
import Training from '../MainPage/Performance/Training';
//HR
import HR from '../MainPage/HR';
import Reports from '../MainPage/HR/Reports';
import Sales from '../MainPage/HR/Sales';
import Accounts from '../MainPage/HR/Accounts';
import Payroll from '../MainPage/HR/Payroll';
//Employees
import Employees from '../MainPage/Employees';
import Projects from '../MainPage/Employees/Projects';
import Employee from '../MainPage/Employees/Employees';

export default [
  {
    path: 'dashboard',
    component: Dashboard,
  },
  {
    path: 'apps',
    component: Apps,
    authority: 'READ_APPS',
  },
  {
    path: 'employee',
    component: Employee,
    authority: 'USER_GET',
  },
  {
    path: 'employees',
    component: Employees,
    authority: 'USER_GET',
  },
  {
    path: 'projects',
    component: Projects,
    authority: 'USER_GET',
  },
  {
    path: 'profile',
    component: ProfilePage,
    authority: 'USER_GET',
  },
  {
    path: 'subscription',
    component: Subscription,
    authority: 'USER_GET',
  },
  {
    path: 'pages',
    component: Pages,
    authority: 'USER_GET',
  },
  {
    path: 'administrator',
    component: Administrator,
    authority: 'USER_GET',
  },
  {
    path: 'performance',
    component: Performance,
    authority: 'USER_GET',
  },
  {
    path: 'goals',
    component: Goals,
    authority: 'USER_GET',
  },
  {
    path: 'performances',
    component: Performances,
    authority: 'USER_GET',
  },
  {
    path: 'training',
    component: Training,
    authority: 'USER_GET',
  },
  {
    path: 'reports',
    component: Reports,
    authority: 'USER_GET',
  },
  {
    path: 'sales',
    component: Sales,
    authority: 'USER_GET',
  },
  {
    path: 'accounts',
    component: Accounts,
    authority: 'USER_GET',
  },
  {
    path: 'payroll',
    component: Payroll,
    authority: 'USER_GET',
  },
];
