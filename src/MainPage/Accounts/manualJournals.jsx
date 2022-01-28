import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from '../paginationfunction';
import '../antdstyle.css';
import { fetchPayment } from '../../lib/api';

const ManualJournals = () => {
  useEffect(() => {
    (async () => {
      const res = await fetchPayment();

      setData(res);
    })();
  }, []);

  const [data, setData] = useState([]);

  const columns = [
    {
      title: 'Account',
      dataIndex: 'accountnumber',
      render: (text, record) => (
        <Link to="/app/sales/invoices-view">#{text}</Link>
      ),
      sorter: (a, b) => a.invoicenumber.length - b.invoicenumber.length,
    },
    {
      title: 'Description',
      dataIndex: 'lead',
      sorter: (a, b) => a.client.length - b.client.length,
    },

    {
      title: 'Contact(INR)',
      dataIndex: 'paymentMode',
      sorter: (a, b) => a.paymenttype.length - b.paymenttype.length,
    },
    {
      title: 'Debits',
      dataIndex: 'PaymentDate',
      sorter: (a, b) => a.duedate.length - b.duedate.length,
    },
    {
      title: 'Credits',
      dataIndex: 'amount',
      render: (text, record) => <span>₹ {text}</span>,
      sorter: (a, b) => a.amount.length - b.amount.length,
    },
  ];
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Manual Journals </title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Manual Journals</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Manual Journals</li>
              </ul>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="content">
          <div className="modal-body">
            <form>
              {/* <div className="form-group">
                <label>Budget Title</label>
                <input
                  className="form-control"
                  type="text"
                  name="budget_title"
                  placeholder="Budgets Title"
                />
              </div> */}
              {/* <label>Choose Budget Respect Type</label>
              <div className="form-group">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input BudgetType"
                    type="radio"
                    name="budget_type"
                    id="project2"
                    defaultValue="project"
                  />
                  <label className="form-check-label" htmlFor="project2">
                    Project
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input BudgetType"
                    type="radio"
                    name="budget_type"
                    id="category1"
                    defaultValue="category"
                  />
                  <label className="form-check-label" htmlFor="category1">
                    Category
                  </label>
                </div>
              </div> */}

              <div className="AllExpensesClass">
                <div className="row AlLExpenses">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>
                        Date <span className="text-danger">*</span>
                      </label>
                      <div>
                        <input
                          className="form-control datetimepicker"
                          type="date"
                          name="budget_start_date"
                          placeholder="Start Date"
                          data-date-format="dd-mm-yyyy"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>
                        Journals <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="expenses_amount[]"
                        placeholder="Amount"
                        defaultValue
                        className="form-control EXpensesAmount"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Reference</label>
                <input
                  className="form-control"
                  type="text"
                  name="budget_title"
                  placeholder="Reference"
                />
              </div>
              <label>Choose Journal Type</label>
              <div className="form-group">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input BudgetType"
                    type="radio"
                    name="budget_type"
                    id="project2"
                    defaultValue="project"
                  />
                  <label className="form-check-label" htmlFor="project2">
                    Cashbased Journals
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input BudgetType"
                    type="radio"
                    name="budget_type"
                    id="category1"
                    defaultValue="category"
                  />
                  <label className="form-check-label" htmlFor="category1">
                    Cashless Journals
                  </label>
                </div>
              </div>
              {/* <div className="form-group">
                <label>End Date</label>
                <div>
                  <input
                    className="form-control datetimepicker"
                    type="date"
                    name="budget_end_date"
                    placeholder="End Date"
                    data-date-format="dd-mm-yyyy"
                  />
                </div>
              </div> */}
              {/* <div className="form-group">
                <label>Expected Revenues</label>
              </div>
              <div className="AllRevenuesClass">
                <div className="row AlLRevenues">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>
                        Revenue Title <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control RevenuETitle"
                        defaultValue
                        placeholder="Revenue Title"
                        name="revenue_title[]"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="col-sm-5">
                    <div className="form-group">
                      <label>
                        Revenue Amount <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="revenue_amount[]"
                        placeholder="Amount"
                        defaultValue
                        className="form-control RevenuEAmount"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="col-sm-1">
                    <div className="add-more">
                      <a
                        className="add_more_revenue"
                        title="Add Revenue"
                        style={{ cursor: 'pointer' }}
                      >
                        <i className="fa fa-plus-circle" />
                      </a>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* <div className="form-group">
                <label>
                  Overall Revenues <span className="text-danger">(A)</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="overall_revenues"
                  id="overall_revenues1"
                  placeholder="Overall Revenues"
                  readOnly
                  style={{ cursor: 'not-allowed' }}
                />
              </div>
              <div className="form-group">
                <label>Expected Expenses</label>
              </div>
              <div className="AllExpensesClass">
                <div className="row AlLExpenses">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>
                        Expenses Title <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control EXpensesTItle"
                        defaultValue
                        placeholder="Expenses Title"
                        name="expenses_title[]"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="col-sm-5">
                    <div className="form-group">
                      <label>
                        Expenses Amount <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="expenses_amount[]"
                        placeholder="Amount"
                        defaultValue
                        className="form-control EXpensesAmount"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="col-sm-1">
                    <div className="add-more">
                      <a
                        className="add_more_expenses"
                        title="Add Expenses"
                        style={{ cursor: 'pointer' }}
                      >
                        <i className="fa fa-plus-circle" />
                      </a>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* <div className="form-group">
                <label>
                  Overall Expense <span className="text-danger">(B)</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="overall_expenses"
                  id="overall_expenses1"
                  placeholder="Overall Expenses"
                  readOnly
                  style={{ cursor: 'not-allowed' }}
                />
              </div>
              <div className="form-group">
                <label>
                  Expected Profit{' '}
                  <span className="text-danger">( C = A - B )</span>{' '}
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="expected_profit"
                  id="expected_profit1"
                  placeholder="Expected Profit"
                  readOnly
                  style={{ cursor: 'not-allowed' }}
                />
              </div>
              <div className="form-group">
                <label>
                  Tax <span className="text-danger">(D)</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="tax_amount"
                  id="tax_amount1"
                  placeholder="Tax Amount"
                />
              </div>
              <div className="form-group">
                <label>
                  Budget Amount{' '}
                  <span className="text-danger">( E = C - D )</span>{' '}
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="budget_amount"
                  id="budget_amount1"
                  placeholder="Budget Amount"
                  readOnly
                  style={{ cursor: 'not-allowed' }}
                />
              </div> */}
            </form>
          </div>
        </div>
        {/* /Page Header */}
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
              <div
                className=" submit-section"
                style={{ display: 'flex', justifyContent: 'flex-start' }}
              >
                <button className="btn btn-primary submit-btn">
                  Add another line
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default ManualJournals;
