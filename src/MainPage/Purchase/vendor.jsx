import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Avatar_07 } from '../../Entryfile/imagepath';

import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from '../paginationfunction';
import '../antdstyle.css';
import { fetchVendor } from '../../lib/api';
import httpService from '../../lib/httpService';

function Vendor() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');

  const [vendorToEdit, setVendorToEdit] = useState({});

  useEffect(() => {
    fetchVendors();
  }, []);
  const fetchVendors = async () => {
    const res = await fetchVendor();
    console.log(res);
    setData(
      res.map((item) => ({
        ...item,
        date: item.createdAt.split('T')[0],
      }))
    );
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    if ($('.select')?.length > 0) {
      $('.select').select2({
        minimumResultsForSearch: -1,
        width: '100%',
      });
    }
  }, []);

  const handleVendor = async () => {
    const data = {
      name: name,
      email: email,
      company: company,
      phone: mobile,
      address: address,
    };
    const res = await httpService.post('/vendor', data);
    console.log(res);
    fetchVendors();
    document.querySelectorAll('.close')?.forEach((e) => e.click());
  };

  const handleEditVendor = async () => {
    await httpService.put(`/vendor/${vendorToEdit._id}`, vendorToEdit);
    fetchVendors();
    document.querySelectorAll('.close')?.forEach((e) => e.click());
  };

  const handleDeletVendor = async () => {
    await httpService.delete(`/vendor/${vendorToEdit._id}`);
    fetchVendors();
    document.querySelectorAll('.cancel-btn')?.forEach((e) => e.click());
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => (
        <h2 className="table-avatar">
          <Link to="/app/profile/employee-profile" className="avatar">
            <img alt="" src={record.image} />
          </Link>
          <Link to="/app/profile/employee-profile">{text}</Link>
        </h2>
      ),
      // sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Company',
      dataIndex: 'company',
      // sorter: (a, b) => a.contactperson.length - b.contactperson.length,
    },

    {
      title: 'Created At',
      dataIndex: 'date',
      // sorter: (a, b) => a.contactperson.length - b.contactperson.length,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      // sorter: (a, b) => a.email.length - b.email.length,
    },

    {
      title: 'Mobile',
      dataIndex: 'phone',
      //

      //sorter: (a, b) => a.mobile.length - b.mobile.length,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      //

      //sorter: (a, b) => a.mobile.length - b.mobile.length,
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
              data-target="#edit_client"
              onClick={() => {
                setVendorToEdit(record);
              }}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#delete_client"
              onClick={() => {
                setVendorToEdit(record);
              }}
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
        <title>Vendors </title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Vendors</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Vendors</li>
              </ul>
            </div>
            <div className="col-auto float-right ml-auto">
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#add_client"
              >
                <i className="fa fa-plus" /> Add Vendor
              </a>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        {/* Search Filter */}
        <div className="row filter-row">
          <div className="col-sm-6 col-md-3">
            <div className="form-group form-focus focused">
              <input type="text" className="form-control floating" />
              <label className="focus-label">Vendor ID</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="form-group form-focus focused">
              <input type="text" className="form-control floating" />
              <label className="focus-label">Vendor Name</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="form-group form-focus select-focus">
              <select className="select floating">
                <option>Select Company</option>
                <option>Sunteck Realty Ltd</option>
                <option>Godrej Properties Ltd</option>
              </select>
              <label className="focus-label">Company</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <a href="#" className="btn btn-success btn-block">
              {' '}
              Search{' '}
            </a>
          </div>
        </div>
        {/* Search Filter */}
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <Table
                className="table-striped"
                pagination={{
                  total: data?.length,
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
              />
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
      {/* Add Client Modal */}
      <div id="add_client" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Vendor</h5>
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
                  console.log('hy');
                  handleVendor();
                }}
              >
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Name <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        onChange={(event) => setName(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">Company Name</label>
                      <input
                        className="form-control"
                        type="text"
                        onChange={(event) => setCompany(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Mobile <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        onChange={(event) => setMobile(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control floating"
                        type="email"
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label className="col-form-label">Address</label>
                      <textarea
                        className="form-control"
                        type="text"
                        onChange={(event) => setAddress(event.target.value)}
                      />
                    </div>
                  </div>
                </div>

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
      {/* /Add Client Modal */}
      {/* Edit Client Modal */}
      <div id="edit_client" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Vendor</h5>
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
                  handleEditVendor();
                }}
              >
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Name <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={vendorToEdit.name}
                        onChange={(event) =>
                          setVendorToEdit({
                            ...vendorToEdit,
                            name: event.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">Company Name</label>
                      <input
                        className="form-control"
                        type="text"
                        value={vendorToEdit.company}
                        onChange={(event) =>
                          setVendorToEdit({
                            ...vendorToEdit,
                            company: event.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Mobile <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={vendorToEdit.phone}
                        onChange={(event) =>
                          setVendorToEdit({
                            ...vendorToEdit,
                            phone: event.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control floating"
                        type="email"
                        value={vendorToEdit.email}
                        onChange={(event) =>
                          setVendorToEdit({
                            ...vendorToEdit,
                            email: event.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label className="col-form-label">Address</label>
                      <textarea
                        className="form-control"
                        type="text"
                        value={vendorToEdit.address}
                        onChange={(event) =>
                          setVendorToEdit({
                            ...vendorToEdit,
                            address: event.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

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
      {/* /Edit Client Modal */}
      {/* Delete Client Modal */}
      <div className="modal custom-modal fade" id="delete_client" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Client</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeletVendor();
                      }}
                      href=""
                      className="btn btn-primary continue-btn"
                    >
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
      {/* /Delete Client Modal */}
    </div>
  );
}

export default Vendor;
