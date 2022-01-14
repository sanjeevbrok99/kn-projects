import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Avatar_04, Avatar_03, PlaceHolder } from '../../Entryfile/imagepath';

import { Table } from 'antd';
import 'antd/dist/antd.css';
import '../antdstyle.css';
import { itemRender, onShowSizeChange } from '../paginationfunction';
import { fetchInvestment } from '../../lib/api/index';
import httpService from '../../lib/httpService';

const Investments = () => {
  const [itemName, setItemName] = useState('');
  const [investmentFor, setInvestmentFor] = useState('');
  const [date, setDate] = useState('');
  const [comodity, setComodity] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [payment, setPayment] = useState('');
  const [editInvestment, setEditInvestment] = useState('');
  useEffect(() => {
    (async () => {
      const res = await fetchInvestment();
      console.log('Investment');
      console.log(res);
      setData(res.map((d) => ({ ...d, date: d.date.split('T')[0] })));
    })();
  }, []);

  const handleAddInvestment = async () => {
    const data = {
      name: itemName,
      for: investmentFor,
      date: date,
      amount: amount,
      paidBy: payment,
    };
    const res = await httpService.post('/investment', data);
    fetchInvestment();
    console.log(res);
    document.querySelectorAll('.close')?.forEach((e) => e.click());
  };

  const handleEditEmployee = async () => {
    const res = await httpService.put(
      `/investment/${editInvestment._id}`,
      editInvestment
    );
    fetchInvestment();
    console.log(res);
    document.querySelectorAll('.close')?.forEach((e) => e.click());
  };
  const [data, setData] = useState([]);
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
      title: 'Investment For',
      dataIndex: 'for',
      sorter: (a, b) => a.Investmentfrom.length - b.Investmentfrom.length,
    },
    {
      title: 'Investment Date',
      dataIndex: 'date',
      sorter: (a, b) => a.Investmentdate.length - b.Investmentdate.length,
    },
    {
      title: 'Item',
      dataIndex: 'name',
      render: (text, record) => (
        <h2 className="table-avatar">
          {text} <span>{record.role}</span>
        </h2>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (text, record) => <span>₹ {text}</span>,
      sorter: (a, b) => a.amount.length - b.amount.length,
    },

    {
      title: 'Paid By',
      dataIndex: 'paidBy',
      sorter: (a, b) => a.paidby.length - b.paidby.length,
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
              data-target="#edit_expense"
              onClick={() => {
                setEditInvestment(record);
                console.log('editing');
                console.log(record);
              }}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#delete_expense"
            >
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
        <title>Investments </title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Investments</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Investments</li>
              </ul>
            </div>
            <div className="col-auto float-right ml-auto">
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#add_expense"
              >
                <i className="fa fa-plus" /> Add Investment
              </a>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        {/* Search Filter */}
        <div className="row filter-row">
          <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
            <div className="form-group form-focus focused">
              <input type="text" className="form-control floating" />
              <label className="focus-label">Item Name</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
            <div className="form-group form-focus select-focus">
              <select className="select floating">
                <option> -- Select -- </option>
                <option>Kamla Singh</option>
                <option>Tarah Shropshire</option>
              </select>
              <label className="focus-label">Investmentd To</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
            <div className="form-group form-focus select-focus">
              <select className="select floating">
                <option> -- Select -- </option>
                <option> Cash </option>
                <option> Cheque </option>
              </select>
              <label className="focus-label">Paid By</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
            <div className="form-group form-focus select-focus">
              <div>
                <input
                  className="form-control floating datetimepicker"
                  type="date"
                />
              </div>
              <label className="focus-label">From</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
            <div className="form-group form-focus select-focus">
              <div>
                <input
                  className="form-control floating datetimepicker"
                  type="date"
                />
              </div>
              <label className="focus-label">To</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
            <a href="#" className="btn btn-success btn-block">
              {' '}
              Search{' '}
            </a>
          </div>
        </div>
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
      {/* Add Expense Modal */}
      <div id="add_expense" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Investment</h5>
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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddInvestment();
                }}
              >
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Item Name</label>
                      <input
                        className="form-control"
                        type="text"
                        onChange={(event) => setItemName(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Investment For</label>
                      <input
                        className="form-control"
                        type="text"
                        onChange={(event) =>
                          setInvestmentFor(event.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Investment Date</label>
                      <div>
                        <input
                          className="form-control datetimepicker"
                          type="date"
                          onChange={(event) => setDate(event.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Commodity</label>
                      <select
                        className="select"
                        onChange={(event) => setComodity(event.target.value)}
                      >
                        <option>Daniel Porter</option>
                        <option>Roger Dixon</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Amount</label>
                      <input
                        placeholder="$50"
                        className="form-control"
                        type="text"
                        onChange={(event) => setAmount(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Paid By</label>
                      <input
                        placeholder="Cash/Cheque"
                        className="form-control"
                        type="text"
                        onChange={(event) => setPayment(event.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        className="select"
                        onChange={(event) => setStatus(event.target.value)}
                      >
                        <option>Pending</option>
                        <option>Approved</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    {/* <div className="form-group">
                      <label>Attachments</label>
                      <input className="form-control" type="file" />
                    </div> */}
                  </div>
                </div>
                {/* <div className="attach-files">
                  <ul>
                    <li>
                      <img src={PlaceHolder} alt="" />
                      <a href="#" className="fa fa-close file-remove" />
                    </li>
                    <li>
                      <img src={PlaceHolder} alt="" />
                      <a href="#" className="fa fa-close file-remove"/>
                    </li>
                  </ul>
                </div> */}
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Expense Modal */}
      {/* Edit Expense Modal */}
      <div id="edit_expense" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Investment</h5>
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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditEmployee();
                }}
              >
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Item Name</label>
                      <input
                        className="form-control"
                        defaultValue={editInvestment?.name || ''}
                        type="text"
                        onChange={(e) => {
                          setEditInvestment({
                            ...editInvestment,
                            name: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Investment For</label>
                      <input
                        className="form-control"
                        defaultValue="Amazon"
                        type="text"
                        onChange={(e) => {
                          setEditInvestment({
                            ...editInvestment,
                            for: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Investment Date</label>
                      <div>
                        <input
                          className="form-control datetimepicker"
                          type="date"
                          onChange={(e) => {
                            setEditInvestment({
                              ...editInvestment,
                              date: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Amount</label>
                      <input
                        placeholder="cash/cheque"
                        className="form-control"
                        type="text"
                        onChange={(e) => {
                          setEditInvestment({
                            ...editInvestment,
                            amount: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Paid By</label>
                      <input
                        placeholder="cash/cheque"
                        className="form-control"
                        defaultValue="$10000"
                        type="text"
                        onChange={(e) => {
                          setEditInvestment({
                            ...editInvestment,
                            paidBy: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        className="select"
                        onChange={(event) => setStatus(event.target.value)}
                      >
                        <option>Pending</option>
                        <option>Approved</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Edit Expense Modal */}
      {/* Delete Expense Modal */}
      <div
        className="modal custom-modal fade"
        id="delete_expense"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Expense</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a href="" className="btn btn-primary continue-btn">
                      Delete
                    </a>
                  </div>
                  <div className="col-6">
                    <a
                      href=""
                      data-dismiss="modal"
                      className="btn btn-primary cancel-btn"
                    >
                      Cancel
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Delete Expense Modal */}
    </div>
  );
};

export default Investments;
