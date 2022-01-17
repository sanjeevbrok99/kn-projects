import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import httpService from '../../../lib/httpService';

const CreateEstimate = () => {
  const [leads, setLeads] = useState([]);
  const [projects, setProjects] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [estimateToAdd, setEstimateToAdd] = useState({});
  const [itemsToAdd, setItemsToAdd] = useState([
    {
      item: '',
      description: '',
      unitCost: 0,
      quantity: '',
      amount: '',
    },
  ]);

  useEffect(() => {
    if ($('.select').length > 0) {
      $('.select').select2({
        minimumResultsForSearch: -1,
        width: '100%',
      });
    }
    fetchLeads();
    fetchProjects();
    fetchTaxes();
  }, []);

  const fetchLeads = async () => {
    const leads = await httpService.get('/lead');
    setLeads(leads.data);
  };

  const fetchProjects = async () => {
    const projects = await httpService.get('/project');
    setProjects(projects.data);
  };

  const fetchTaxes = async () => {
    const taxes = await httpService.get('/tax');
    setTaxes(taxes.data);
  };

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Create Estimate </title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Create Estimate</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Create Estimate</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-sm-12">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log(estimateToAdd);
              }}
            >
              <div className="row">
                <div className="col-sm-6 col-md-3">
                  <div className="form-group">
                    <label>
                      Project <span className="text-danger">*</span>
                    </label>
                    <select
                      onChange={(e) => {
                        console.log(e.target.value);
                        setEstimateToAdd({
                          ...estimateToAdd,
                          project: e.target.value,
                        });
                      }}
                      className="custom-select"
                    >
                      <option>Select Project</option>
                      {projects.map((project) => (
                        <option key={project._id} value={project._id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="form-group">
                    <label>
                      Lead <span className="text-danger">*</span>
                    </label>
                    <select
                      onChange={(e) => {
                        setEstimateToAdd({
                          ...estimateToAdd,
                          lead: e.target.value,
                        });
                      }}
                      className="custom-select"
                    >
                      <option>Please Select</option>
                      {leads.map((lead) => (
                        <option key={lead._id} value={lead._id}>
                          {lead.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      onChange={(e) => {
                        setEstimateToAdd({
                          ...estimateToAdd,
                          email: e.target.value,
                        });
                      }}
                      className="form-control"
                      type="email"
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="form-group">
                    <label>Tax</label>
                    <select
                      onChange={(e) => {
                        setEstimateToAdd({
                          ...estimateToAdd,
                          tax: e.target.value,
                        });
                      }}
                      className="custom-select"
                    >
                      <option>Select Tax</option>
                      {taxes.map((tax) => (
                        <option key={tax._id} value={tax._id}>
                          {tax.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="form-group">
                    <label>Client Address</label>
                    <textarea
                      onChange={(e) => {
                        setEstimateToAdd({
                          ...estimateToAdd,
                          clientAddress: e.target.value,
                        });
                      }}
                      className="form-control"
                      rows={3}
                      defaultValue={''}
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="form-group">
                    <label>Billing Address</label>
                    <textarea
                      className="form-control"
                      onChange={(e) => {
                        setEstimateToAdd({
                          ...estimateToAdd,
                          billingAddress: e.target.value,
                        });
                      }}
                      rows={3}
                      defaultValue={''}
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="form-group">
                    <label>
                      Estimate Date <span className="text-danger">*</span>
                    </label>
                    <div>
                      <input
                        className="form-control"
                        onChange={(e) => {
                          setEstimateToAdd({
                            ...estimateToAdd,
                            estimateDate: e.target.value,
                          });
                        }}
                        type="date"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="form-group">
                    <label>
                      Expiry Date <span className="text-danger">*</span>
                    </label>
                    <div>
                      <input
                        onChange={(e) => {
                          setEstimateToAdd({
                            ...estimateToAdd,
                            expiryDate: e.target.value,
                          });
                        }}
                        className="form-control"
                        type="date"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <div className="table-responsive">
                    <table className="table table-hover table-white">
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
                        <tr>
                          <td>1</td>
                          <td>
                            <input
                              className="form-control"
                              type="text"
                              style={{ minWidth: '150px' }}
                            />
                          </td>
                          <td>
                            <input
                              className="form-control"
                              type="text"
                              style={{ minWidth: '150px' }}
                            />
                          </td>
                          <td>
                            <input
                              className="form-control"
                              style={{ width: '100px' }}
                              type="text"
                            />
                          </td>
                          <td>
                            <input
                              className="form-control"
                              style={{ width: '80px' }}
                              type="text"
                            />
                          </td>
                          <td>
                            <input
                              className="form-control"
                              readOnly
                              style={{ width: '120px' }}
                              type="text"
                            />
                          </td>
                          <td>
                            <a
                              href="javascript:void(0)"
                              className="text-success font-18"
                              title="Add"
                            >
                              <i className="fa fa-plus" />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>
                            <input
                              className="form-control"
                              type="text"
                              style={{ minWidth: '150px' }}
                            />
                          </td>
                          <td>
                            <input
                              className="form-control"
                              type="text"
                              style={{ minWidth: '150px' }}
                            />
                          </td>
                          <td>
                            <input
                              className="form-control"
                              style={{ width: '100px' }}
                              type="text"
                            />
                          </td>
                          <td>
                            <input
                              className="form-control"
                              style={{ width: '80px' }}
                              type="text"
                            />
                          </td>
                          <td>
                            <input
                              className="form-control"
                              readOnly
                              style={{ width: '120px' }}
                              type="text"
                            />
                          </td>
                          <td>
                            <a
                              href="javascript:void(0)"
                              className="text-danger font-18"
                              title="Remove"
                            >
                              <i className="fa fa-trash-o" />
                            </a>
                          </td>
                        </tr>
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
                            0
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
                            <input
                              className="form-control text-right"
                              defaultValue={0}
                              readOnly
                              type="text"
                            />
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
                            <input
                              className="form-control text-right"
                              type="text"
                            />
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
                            $ 0.00
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Other Information</label>
                        <textarea
                          className="form-control"
                          rows={4}
                          defaultValue={''}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="submit-section">
                <button className="btn btn-primary submit-btn m-r-10">
                  Save &amp; Send
                </button>
                <button className="btn btn-primary submit-btn">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default CreateEstimate;
