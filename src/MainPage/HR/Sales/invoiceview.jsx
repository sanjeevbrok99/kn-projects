import React, { Component, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { Applogo } from '../../../Entryfile/imagepath';
import httpService from '../../../lib/httpService';

const Invoiceview = () => {
  const [invoice, setInvoice] = useState({});
  const { id } = useParams();
  const [itemsToAdd, setItemsToAdd] = useState([
    {
      item: '',
      description: '',
      unitCost: 0,
      quantity: 0,
      amount: 0,
    },
  ]);
  useEffect(() => {
    if ($('.select').length > 0) {
      $('.select').select2({
        minimumResultsForSearch: -1,
        width: '100%',
      });
    }
    fetchInvoice();
  }, []);

  const fetchInvoice = async () => {
    const res = await httpService.get(`/sale-invoice/${id}`);
    setInvoice(res.data);
    setItemsToAdd(res.data.items);
  };
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Invoice </title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Invoice</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Invoice</li>
              </ul>
            </div>
            <div className="col-auto float-right ml-auto">
              <div className="btn-group btn-group-sm">
                <button className="btn btn-white">CSV</button>
                <button className="btn btn-white">PDF</button>
                <button className="btn btn-white">
                  <i className="fa fa-print fa-lg" /> Print
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-6 m-b-20">
                    <img src={Applogo} className="inv-logo" alt="" />
                    <ul className="list-unstyled">
                      <li>Oboroi Real Estates</li>
                      <li>3864 Quiet Valley Lane,</li>
                      <li>Sherman Oaks, CA, 91403</li>
                      <li>GST No:</li>
                    </ul>
                  </div>
                  <div className="col-sm-6 m-b-20">
                    <div className="invoice-details">
                      <h3 className="text-uppercase">Invoice #INV-0001</h3>
                      <ul className="list-unstyled">
                        <li>
                          Date:{' '}
                          <span>
                            {' '}
                            {invoice?.project?.startDate
                              ? new Date(invoice?.project?.startDate)
                                  .toISOString()
                                  .split('T')[0]
                              : ''}
                          </span>
                        </li>
                        <li>
                          Due date:{' '}
                          <span>
                            {invoice?.project?.endDate
                              ? new Date(invoice?.project?.endDate)
                                  .toISOString()
                                  .split('T')[0]
                              : ''}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-lg-7 col-xl-8 m-b-20">
                    <h5>Invoice to:</h5>
                    <ul className="list-unstyled">
                      <li>
                        <h5>
                          <strong>{invoice?.customer?.name}</strong>
                        </h5>
                      </li>
                      <li>
                        <span>{invoice?.customer?.company}</span>
                      </li>
                      <li>5754 Airport Rd</li>
                      <li>Coosada, AL, 36020</li>
                      <li>United States</li>
                      <li>{invoice?.customer?.phone}</li>
                      <li>
                        <a href="#">{invoice?.customer?.email}</a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-sm-6 col-lg-5 col-xl-4 m-b-20">
                    <span className="text-muted">Payment Details:</span>
                    <ul className="list-unstyled invoice-payment-details">
                      <li>
                        <h5>
                          Total Due:{' '}
                          <span className="text-right">{invoice?.total}</span>
                        </h5>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th style={{ width: '20px' }}>#</th>
                        <th className="col-sm-2">Item</th>
                        <th className="col-md-6">Description</th>
                        <th style={{ width: '100px' }}>Unit Cost</th>
                        <th style={{ width: '80px' }}>Qty</th>
                        <th>Amount</th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tbody>
                      {itemsToAdd.map((item, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            <li
                              className="form-control"
                              type="text"
                              style={{ minWidth: '150px' }}
                            >
                              {item.item}{' '}
                            </li>
                          </td>
                          <td>
                            <li
                              className="form-control"
                              type="text"
                              style={{ minWidth: '150px' }}
                            >
                              {item.description}
                            </li>
                          </td>
                          <td>
                            <li
                              className="form-control"
                              style={{ width: '100px' }}
                              type="text"
                            >
                              {' '}
                              {item.unitCost}
                            </li>
                          </td>
                          <td>
                            <li
                              className="form-control"
                              style={{ width: '80px' }}
                              type="text"
                            >
                              {' '}
                              {item.quantity}
                            </li>
                          </td>
                          <td>
                            <li
                              className="form-control"
                              readOnly
                              style={{ width: '120px' }}
                              type="text"
                            >
                              {item.amount}
                            </li>
                          </td>
                          <td>
                            <a
                              href="javascript:void(0)"
                              className={`${
                                index + 1 !== itemsToAdd.length
                                  ? 'text-danger'
                                  : 'text-success'
                              } font-18`}
                              title="Add"
                            ></a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover table-white">
                    <tbody>
                      <tr>
                        <td />
                        <td />
                        <td />
                        <td />
                        <td className="text-right">Total</td>
                        <td
                          style={{
                            textAlign: 'right',
                            paddingRight: '30px',
                            width: '230px',
                          }}
                        >
                          {itemsToAdd.reduce((p, c) => p + c.amount, 0)}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={5} className="text-right">
                          Tax
                        </td>
                        <td
                          style={{
                            textAlign: 'right',
                            paddingRight: '30px',
                            width: '230px',
                          }}
                        >
                          <li
                            className="form-control text-right"
                            readOnly
                            type="text"
                          >
                            {' '}
                            {0}
                          </li>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={5} className="text-right">
                          Discount %
                        </td>
                        <td
                          style={{
                            textAlign: 'right',
                            paddingRight: '30px',
                            width: '230px',
                          }}
                        >
                          <li className="form-control text-right" type="text" />
                        </td>
                      </tr>
                      <tr>
                        <td
                          colSpan={5}
                          style={{ textAlign: 'right', fontWeight: 'bold' }}
                        >
                          Grand Total
                        </td>
                        <td
                          style={{
                            textAlign: 'right',
                            paddingRight: '30px',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            width: '230px',
                          }}
                        >
                          ₹ {itemsToAdd.reduce((p, c) => p + c.amount, 0)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Other Information</label>
                      <li className="form-control">
                        {invoice?.otherInformation}
                      </li>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoiceview;
