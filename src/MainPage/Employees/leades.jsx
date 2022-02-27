import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from '../paginationfunction';
import '../antdstyle.css';
import httpService from '../../lib/httpService';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Leads = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [leadToAdd, setLeadToAdd] = useState({});
  const [projects, setProjects] = useState([]);
  let query = useQuery();
  const [projectId, setProjectId] = useState(
    query.get('projectId') ? query.get('projectId') : ''
  );

  useEffect(() => {
    fetchLeads();
    fetchProjects();
  }, []);

  const fetchLeads = async () => {
    setIsLoading(true);
    const leads = await httpService.get('/lead');
    setData(
      leads.data.map((lead, i) => ({
        ...lead,
        id: i + 1,
        noOfProjects: lead.project.length,
        assignedstaff:
          lead.assignedTo.firstName + ' ' + lead.assignedTo.lastName,
        status: lead.status,
        created: new Date(lead.createdAt).toGMTString().substring(4, 16),
      }))
    );
    setIsLoading(false);
  };

  const fetchProjects = async () => {
    const projects = await httpService.get('/project');
    setProjects(projects.data);
  };

  const handleAddLead = async () => {
    await httpService.post('/lead', leadToAdd);
    fetchLeads();
    toast.success('Lead Added Successfully');
    document.querySelectorAll('.close')?.forEach((e) => e.click());
  };

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      sorter: (a, b) => a.id.length - b.id.length,
    },
    {
      title: 'Lead Name',
      dataIndex: 'name',
      render: (text, record) => (
        <h2 className="table-avatar">
          <Link
            to={`/app/profile/lead-profile/${record._id}`}
            className="avatar"
          >
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
          <Link to={`/app/profile/lead-profile/${record._id}`}>{text}</Link>
        </h2>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
    },

    {
      title: 'Mobile',
      dataIndex: 'phone',
      sorter: (a, b) => a.mobile.length - b.mobile.length,
    },

    {
      title: 'Projects',
      dataIndex: 'noOfProjects',
      render: (text, record) =>
        text == 1 ? (
          <Link to={`/app/projects/projects-view/${record.project[0]._id}`}>
            {record.project[0].name}
          </Link>
        ) : (
          <>{text} Projects</>
        ),
      sorter: (a, b) => a.project.length - b.project.length,
    },

    {
      title: 'Assigned Staff',
      dataIndex: 'assignedstaff',
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
            <a className="dropdown-item" href="#">
              <i className="fa fa-pencil m-r-5" /> Edit
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
        <title>Leads </title>
        <meta name="description" content="Login page" />
      </Helmet>
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
            <div className="row">
              {/* jin - changed col-sm-12 to col-sm-8  */}
              <div className="col-sm-8">
                <h3 className="page-title">Leads</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Leads</li>
                </ul>
              </div>
              <div className="col-auto float-right ml-auto">
                <a
                  href="#"
                  className="btn add-btn"
                  data-toggle="modal"
                  data-target="#add_lead"
                >
                  <i className="fa fa-plus" /> Add Lead
                </a>
              </div>
            </div>
          </div>
          <div className="row filter-row">
            <div className="col-12">
              <div className="form-group form-focus focused">
                <select
                  value={projectId ? projectId : ''}
                  className="custom-select"
                  onChange={(e) => {
                    setProjectId(e.target.value);
                  }}
                >
                  <option value={''}>All Projects</option>
                  {projects.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
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
                  dataSource={data.filter((lead) => {
                    if (projectId) {
                      console.log(projectId);
                      return lead.project.some((p) =>
                        p._id.includes(projectId)
                      );
                    }
                    return lead;
                  })}
                  rowKey={(record) => record.id}
                  onChange={console.log('change value')}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div id="add_lead" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Lead</h5>
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
                  await handleAddLead();
                  e.target.reset();
                }}
              >
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label className="col-form-label">
                        Name <span className="text-danger">*</span>
                      </label>
                      <input
                        onChange={(e) => {
                          setLeadToAdd({
                            ...leadToAdd,
                            name: e.target.value,
                          });
                        }}
                        className="form-control"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        onChange={(e) => {
                          setLeadToAdd({
                            ...leadToAdd,
                            email: e.target.value,
                          });
                        }}
                        className="form-control"
                        type="email"
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Phone <span className="text-danger">*</span>
                      </label>
                      <input
                        onChange={(e) => {
                          setLeadToAdd({
                            ...leadToAdd,
                            phone: e.target.value,
                          });
                        }}
                        className="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label>Address</label>
                      <textarea
                        onChange={(e) => {
                          setLeadToAdd({
                            ...leadToAdd,
                            address: e.target.value,
                          });
                        }}
                        defaultValue={''}
                        className="form-control"
                        rows={4}
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
    </div>
  );
};

export default Leads;
