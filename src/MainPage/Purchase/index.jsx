import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Expenses from '../HR/Sales/expense';
import Bills from './bills';
import Expense from './expense';
import PaymentMade from './paymentMade';
import RecurringExpense from './recurringExpenses';
import Vendor from './vendor';

const Purchase = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/vendors`} />
    <Route path={`${match.url}/vendors`} component={Vendor} />
    <Route path={`${match.url}/expenses`} component={Expense} />
    <Route
      path={`${match.url}/recurring-expenses`}
      component={RecurringExpense}
    />
    <Route path={`${match.url}/bills`} component={Bills} />
    <Route path={`${match.url}/payment-made`} component={PaymentMade} />
    {/* <Route path={`${match.url}/vendor-credits`} component={Editestimate} /> */}
    {/* <Route path={`${match.url}/recurring-bills`} component={Expense} /> */}
  </Switch>
);

export default Purchase;
