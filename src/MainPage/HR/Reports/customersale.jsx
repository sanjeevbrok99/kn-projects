import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { Table } from 'antd';
import 'antd/dist/antd.css';

import { itemRender, onShowSizeChange } from '../../paginationfunction';
import '../../antdstyle.css';

const CustomerSale = () => {
  const [data, setData] = useState([
    {
      id: 1,
      invoicenumber: 'SKW-0001',
      client: '	Sunteck Realty Ltd',
      createddate: '5',
      duedate: '500',
      amount: '2099',
      status: 'Paid',
    },
    {
      id: 2,
      invoicenumber: 'SKW-0002',
      client: 'Godrej Properties Ltd',
      createddate: '1',
      duedate: '500',
      amount: '2099',
      status: 'Sent',
    },
  ]);
  useEffect(() => {
    if ($('.select').length > 0) {
      $('.select').select2({
        minimumResultsForSearch: -1,
        width: '100%',
      });
    }
  });

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      sorter: (a, b) => a.id.length - b.id.length,
    },
    {
      title: 'Customer Name',
      dataIndex: 'invoicenumber',
      render: (text, record) => (
        <Link to="/app/sales/invoices-view">#{text}</Link>
      ),
      sorter: (a, b) => a.invoicenumber.length - b.invoicenumber.length,
    },
    {
      title: 'Sale Item',
      dataIndex: 'client',
      sorter: (a, b) => a.client.length - b.client.length,
    },

    {
      title: 'Rate',
      dataIndex: 'duedate',
      sorter: (a, b) => a.duedate.length - b.duedate.length,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (text, record) => <span>₹ {text}</span>,
      sorter: (a, b) => a.amount.length - b.amount.length,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => (
        <span
          className={
            text === 'Paid'
              ? 'badge bg-inverse-success'
              : 'badge bg-inverse-info'
          }
        >
          {text}
        </span>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: 'Action',
      render: (text, record) => (
        <div className="dropdown dropdown-action text-right">
          <a
            href="#"
            className="action-icon dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="material-icons">more_vert</i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#edit_job"
            >
              <i className="fa fa-file-pdf-o m-r-5" /> Edit
            </a>
            <a className="dropdown-item" href="#">
              <i className="fa fa-file-pdf-o m-r-5" /> Download
            </a>
            <a className="dropdown-item" href="#">
              <i className="fa fa-trash-o m-r-5" /> Delete
            </a>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Sale by Customer </title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Sale By Customer</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Credit notes</li>
              </ul>
            </div>
            <div className="col-auto float-right ml-auto">
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#add_job"
              >
                <i className="fa fa-plus" /> Sales By Customer
              </a>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        {/* Search Filter */}
        <div className="row filter-row">
          <div className="col-sm-6 col-md-6">
            <div className="form-group form-focus select-focus">
              <div>
                <input className="form-control floating " type="text" />
              </div>
              <label className="focus-label">Customer Name</label>
            </div>
          </div>

          {/* <div className="form-group form-focus select-focus">
              <div>
                <input
                  className="form-control floating datetimepicker"
                  type="date"
                />
              </div>
              <label className="focus-label"></label>
            </div> */}

          <div className="col-sm-6 col-md-3">
            <div className="form-group form-focus select-focus">
              <select className="select floating">
                <option>Select Status</option>
                <option>Pending</option>
                <option>Paid</option>
                <option>Partially Paid</option>
              </select>
              <label className="focus-label">Status</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <a href="#" className="btn btn-success btn-block">
              {' '}
              Search{' '}
            </a>
          </div>
        </div>

        {/* / add credit modal */}
        <div id="add_job" className="modal custom-modal fade" role="dialog">
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Sales By Customer</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Customer Name</label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                    {/* <div className="col-md-6">
                      <div className="form-group">
                        <label>Department</label>
                        <select className="select">
                          <option>-</option>
                          <option>Marketing Head</option>
                          <option>Application Development</option>
                          <option>IT Management</option>
                          <option>Accounts Management</option>
                          <option>Support Management</option>
                          <option>Marketing</option>
                        </select>
                      </div>
                    </div> */}
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Sale Item</label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Rate</label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                  </div>
                  {/* <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Amount</label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                  </div> */}

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Start Date</label>
                        <input
                          type="date"
                          className="form-control datetimepicker"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Expired Date</label>
                        <input
                          type="date"
                          className="form-control datetimepicker"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" defaultValue={''} />
                      </div>
                    </div>
                  </div>
                  <div className="submit-section">
                    <button
                      className="btn btn-primary submit-btn"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* edit credit */}
        <div id="edit_job" className="modal custom-modal fade" role="dialog">
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Sales By Customer</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Customer Name</label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                    {/* <div className="col-md-6">
                      <div className="form-group">
                        <label>Department</label>
                        <select className="select">
                          <option>-</option>
                          <option>Marketing Head</option>
                          <option>Application Development</option>
                          <option>IT Management</option>
                          <option>Accounts Management</option>
                          <option>Support Management</option>
                          <option>Marketing</option>
                        </select>
                      </div>
                    </div> */}
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Sale Item</label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Rate</label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                  </div>
                  {/* <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Amount</label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                  </div> */}

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Start Date</label>
                        <input
                          type="date"
                          className="form-control datetimepicker"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Expired Date</label>
                        <input
                          type="date"
                          className="form-control datetimepicker"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" defaultValue={''} />
                      </div>
                    </div>
                  </div>
                  <div className="submit-section">
                    <button
                      className="btn btn-primary submit-btn"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* end of edit credit modal}
        {/* /Search Filter */}
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <Table
                className="table-striped"
                pagination={{
                  total: data.length,
                  showTotal: (total, range) =>
                    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                  showSizeChanger: true,
                  onShowSizeChange: onShowSizeChange,
                  itemRender: itemRender,
                }}
                style={{ overflowX: 'auto' }}
                columns={columns}
                // bordered
                dataSource={data}
                rowKey={(record) => record.id}
                // onChange={this.handleTableChange}
              />
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default CustomerSale;
