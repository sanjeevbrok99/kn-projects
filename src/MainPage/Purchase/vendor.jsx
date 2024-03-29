import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from '../paginationfunction';
import '../antdstyle.css';
import httpService from '../../lib/httpService';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';

function Vendor() {
  const [data, setData] = useState([]);
  const [vendorToAdd, setVendorToAdd] = useState({});
  const [vendorToEdit, setVendorToEdit] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVendors();
  }, []);
  const fetchVendors = async () => {
    const res = await httpService.get('/vendor').then((res) => res.data);
    setData(
      res.map((item) => ({
        ...item,
        date: item.createdAt.split('T')[0],
      }))
    );
    setIsLoading(false);
  };
  useEffect(() => {
    if ($('.select')?.length > 0) {
      $('.select').select2({
        minimumResultsForSearch: -1,
        width: '100%',
      });
    }
    fetchVendors();
  }, []);

  const addVendor = async () => {
    toast
      .promise(
        httpService.post('/vendor', {
          ...vendorToAdd,
        }),
        {
          error: 'Failed to add vendor',
          success: 'Vendor added successfully',
          pending: 'Adding vendor',
        }
      )
      .then(() => fetchVendors());
    document.querySelectorAll('.close')?.forEach((e) => e.click());
  };

  const editVendor = async () => {
    toast
      .promise(
        httpService.put(`/vendor/${vendorToEdit._id}`, {
          ...vendorToEdit,
        }),
        {
          error: 'Failed to edit vendor',
          success: 'Vendor edited successfully',
          pending: 'Editing vendor',
        }
      )
      .then(() => fetchVendors());
    document.querySelectorAll('.close')?.forEach((e) => e.click());
  };

  const deleteVendor = async () => {
    toast
      .promise(httpService.delete(`/vendor/${vendorToEdit._id}`), {
        success: 'Vendor deleted successfully',
        pending: 'Deleting vendor',
      })
      .then(() => fetchVendors());
    document.querySelectorAll('.cancel-btn')?.forEach((e) => e.click());
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => (
        <h2 className="table-avatar">
          <Link to="/app/profile/employee-profile" className="avatar">
            <div
              style={{
                width: '100%',
                height: '100%',
                background: '#E33F3B',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '1.2rem',
                color: '#fff',
              }}
            >
              {record.name.split(' ')[0].charAt(0)}
            </div>
          </Link>
          <Link to={`/app/profile/vendor-profile/${record._id}`}>{text}</Link>
        </h2>
      ),
      // sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Company',
      dataIndex: 'company',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },

    {
      title: 'Mobile',
      dataIndex: 'phone',
      sorter: (a, b) => a.mobile.length - b.mobile.length,
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
              data-target="#edit_vendor"
              onClick={(e) => {
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
      {isLoading ? (
        <div
          style={{
            height: '90vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          className="content container-fluid"
        >
          <CircularProgress />
        </div>
      ) : (
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
                  data-target="#add_vendor"
                >
                  <i className="fa fa-plus" /> Add Vendor
                </a>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <div className="row filter-row">
            <div className="col-sm-6 col-md-6">
              <div className="form-group form-focus focused">
                <input
                  type="text"
                  style={{
                    padding: '10px',
                  }}
                  placeholder={'Vendor Name'}
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="form-group form-focus focused">
                <input
                  type="email"
                  style={{
                    padding: '10px',
                  }}
                  placeholder={'Vendor Email'}
                  className="form-control"
                />
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
      )}
      {/* /Page Content */}
      {/* Add Client Modal */}
      <div id="add_vendor" className="modal custom-modal fade" role="dialog">
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
                onSubmit={async (e) => {
                  e.preventDefault();
                  await addVendor();
                  e.target.reset();
                }}
              >
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Name <span className="text-danger">*</span>
                      </label>
                      <input
                        onChange={(e) => {
                          setVendorToAdd({
                            ...vendorToAdd,
                            name: e.target.value,
                          });
                        }}
                        className="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">Phone </label>
                      <input
                        onChange={(e) => {
                          setVendorToAdd({
                            ...vendorToAdd,
                            phone: e.target.value,
                          });
                        }}
                        className="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        onChange={(e) => {
                          setVendorToAdd({
                            ...vendorToAdd,
                            email: e.target.value,
                          });
                        }}
                        className="form-control floating"
                        type="email"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">Comapny</label>
                      <input
                        onChange={(e) => {
                          setVendorToAdd({
                            ...vendorToAdd,
                            company: e.target.value,
                          });
                        }}
                        className="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <label>Address</label>
                    <textarea
                      onChange={(e) => {
                        setVendorToAdd({
                          ...vendorToAdd,
                          address: e.target.value,
                        });
                      }}
                      className="form-control"
                      rows={3}
                      defaultValue={''}
                    />
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
      <div id="edit_vendor" className="modal custom-modal fade" role="dialog">
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
                  editVendor();
                }}
              >
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Name <span className="text-danger">*</span>
                      </label>
                      <input
                        defaultValue={vendorToEdit.name}
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
                      <label className="col-form-label">Phone </label>
                      <input
                        defaultValue={vendorToEdit.phone}
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
                        defaultValue={vendorToEdit.email}
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
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">Comapny</label>
                      <input
                        defaultValue={vendorToEdit.company}
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
                <div>
                  <div className="form-group">
                    <label>Address</label>
                    <textarea
                      defaultValue={vendorToEdit.address}
                      onChange={(e) => {
                        setVendorToEdit({
                          ...customerToEdit,
                          address: e.target.value,
                        });
                      }}
                      className="form-control"
                      rows={4}
                    />
                  </div>
                </div>

                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Submit</button>
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
                <h3>Delete Vendor</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        deleteVendor();
                      }}
                      className="btn btn-primary continue-btn"
                    >
                      Delete
                    </a>
                  </div>
                  <div className="col-6">
                    <a
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
