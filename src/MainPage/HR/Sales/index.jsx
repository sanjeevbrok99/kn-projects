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
import Vendorcreate from './vendorcreate';
import Vendoredit from './vendoredit';
import RecurringBillCreate from './recurringbillcreate';
import RecurringBillEdit from './recurringbilledit';
// import RecurringInvoiceEdit from './recurringinvoiceedit';

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
    <Route path={`${match.url}/vendor-create`} component={Vendorcreate} />
    <Route
      path={`${match.url}/recurring-bill-create`}
      component={RecurringBillCreate}
    />
    <Route path={`${match.url}/invoices-edit`} component={Invoiceedit} />
    <Route path={`${match.url}/vendor-edit`} component={Vendoredit} />
    <Route
      path={`${match.url}/recurring-bill-edit`}
      component={RecurringBillEdit}
    />
    {/* <Route
      path={`${match.url}/recurring-invoice-edit`}
      component={RecurringInvoiceEdit}
    /> */}
    <Route path={`${match.url}/invoices-view`} component={Invoiceview} />

    <Route path={`${match.url}/payment-received`} component={Payments} />
    <Route path={`${match.url}/provident-fund`} component={ProvidentFund} />
    <Route path={`${match.url}/taxes`} component={Taxs} />
  </Switch>
);

export default SalesRoute;
