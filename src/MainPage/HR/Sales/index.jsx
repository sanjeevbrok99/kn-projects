import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
//estimate
import Estimate from './estimate';
import EstimateView from './estimateview';
import Createestimate from './createestimate';
import Editestimate from './editestimate';

import Expense from './expense';
//invoice
import Invoice from './invoice';
import Invoicecreate from './invoicecreate';
import Invoiceedit from './invoiceedit';
import Invoiceview from './invoiceview';

import Payments from './payments';
import ProvidentFund from './providentfund';
import Taxs from './tax';
import Customer from './Customers';
import Projects from './project';
import RecurringInvoices from './recurringInvoices';
import CreditNotes from '../../Sales/CreditNotes';

const SalesRoute = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/customers`} />
    <Route path={`${match.url}/customers`} component={Customer} />
    <Route path={`${match.url}/projects`} component={Projects} />
    <Route path={`${match.url}/estimates`} component={Estimate} />
    <Route path={`${match.url}/estimatesview`} component={EstimateView} />
    <Route path={`${match.url}/createestimates`} component={Createestimate} />
    <Route path={`${match.url}/editestimates`} component={Editestimate} />
    <Route path={`${match.url}/expenses`} component={Expense} />

    <Route path={`${match.url}/invoices`} component={Invoice} />
    <Route
      path={`${match.url}/recurring-invoices`}
      component={RecurringInvoices}
    />
    <Route path={`${match.url}/invoices-create`} component={Invoicecreate} />
    <Route path={`${match.url}/invoices-edit`} component={Invoiceedit} />
    <Route path={`${match.url}/invoices-view`} component={Invoiceview} />

    <Route path={`${match.url}/payment-received`} component={Payments} />
    <Route path={`${match.url}/provident-fund`} component={ProvidentFund} />
    <Route path={`${match.url}/taxes`} component={Taxs} />
    <Route path={`${match.url}/credit-notes`} component={CreditNotes} />
  </Switch>
);

export default SalesRoute;
