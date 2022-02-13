import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles

import '../../index.css';
import httpService from '../../../lib/httpService';

const ProjectList = () => {
  const [projectList, setProjectList] = React.useState([]);
  const [projectToAdd, setProjectToAdd] = React.useState({});
  const [projectToEdit, setProjectToEdit] = React.useState({});
  const [projectNameToSearch, setProjectNameToSearch] = React.useState('');

  useEffect(() => {
    if ($('.select').length > 0) {
      $('.select').select2({
        minimumResultsForSearch: -1,
        width: '100%',
      });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await httpService.get('/project');
      setProjectList(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addProjects = async () => {
    const res = await httpService.post('/project', projectToAdd);
    if (res.status < 400) {
      fetchData();
      setProjectToAdd({});
      document.querySelectorAll('.close')?.forEach((e) => e.click());
    }
  };

  const editProjects = async () => {
    const res = await httpService.put(
      `/project/${projectToEdit._id}`,
      projectToEdit
    );
    if (res.status < 400) {
      fetchData();
      setProjectToEdit({});
      document.querySelectorAll('.close')?.forEach((e) => e.click());
    }
  };

  const deleteProject = async () => {
    const res = await httpService.delete(`/project/${projectToEdit._id}`);
    if (res.status < 400) {
      fetchData();
      setProjectToEdit({});
      document.querySelectorAll('.cancel-btn')?.forEach((e) => e.click());
    }
  };

  const convertDate = (date) => {
    var newDate = new Date(date);
    var dateString =
      newDate.getDate() +
      '/' +
      (newDate.getMonth() + 1) +
      '/' +
      newDate.getFullYear();
    return dateString;
  };

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Projects </title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Projects</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Projects</li>
              </ul>
            </div>
            <div className="col-auto float-right ml-auto">
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#create_project"
              >
                <i className="fa fa-plus" /> Create Project
              </a>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        {/* Search Filter */}
        <div className="row filter-row">
          <div className="col-9">
            <div className="form-group form-focus focused">
              <input
                onChange={(e) => {
                  setProjectNameToSearch(e.target.value);
                }}
                type="text"
                className="form-control floating"
              />
              <label className="focus-label">Project Name</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
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
              <table className="table table-striped custom-table datatable">
                <thead>
                  <tr>
                    <th
                      style={{
                        width: '25%',
                      }}
                    >
                      Project
                    </th>
                    <th
                      style={{
                        width: '25%',
                      }}
                    >
                      Project Type
                    </th>
                    <th
                      style={{
                        width: '25%',
                      }}
                    >
                      Deadline
                    </th>
                    <th
                      style={{
                        width: '25%',
                      }}
                    >
                      Leads
                    </th>
                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {projectList &&
                    projectList.map((project) => (
                      <tr key={project._id}>
                        <td>
                          <Link
                            to={`/app/projects/projects-view/${project._id}`}
                          >
                            {project.name}
                          </Link>
                        </td>
                        <td>{project && project.type}</td>

                        <td>{convertDate(project.endDate)} </td>

                        <td>
                          <div className="action-label">
                            <Link
                              to={`/app/employees/leads?projectId=${project._id}`}
                            >
                              {
                                project.leads?.filter(
                                  (lead) =>
                                    lead.status !== 'Lead Won' &&
                                    lead.status !== 'Lead Lost'
                                ).length
                              }{' '}
                              Leads
                            </Link>
                          </div>
                        </td>
                        <td className="text-right">
                          <div className="dropdown dropdown-action">
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
                                data-target="#edit_project"
                                onClick={() => setProjectToEdit(project)}
                              >
                                <i className="fa fa-pencil m-r-5" /> Edit
                              </a>
                              <a
                                className="dropdown-item"
                                href="#"
                                data-toggle="modal"
                                data-target="#delete_project"
                              >
                                <i className="fa fa-trash-o m-r-5" /> Delete
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
      {/* Create Project Modal */}
      <div
        id="create_project"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create Project</h5>
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
                  addProjects();
                }}
              >
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Project Name</label>
                      <input
                        onChange={(e) => {
                          setProjectToAdd((d) => ({
                            ...d,
                            name: e.target.value,
                          }));
                        }}
                        className="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Cost</label>
                      <input
                        onChange={(e) => {
                          setProjectToAdd((d) => ({
                            ...d,
                            estimatedCost: e.target.value,
                          }));
                        }}
                        className="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Start Date</label>
                      <div>
                        <input
                          className="form-control"
                          onChange={(e) => {
                            setProjectToAdd((d) => ({
                              ...d,
                              startDate: e.target.value,
                            }));
                          }}
                          type="date"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>End Date</label>
                      <div>
                        <input
                          onChange={(e) => {
                            setProjectToAdd((d) => ({
                              ...d,
                              endDate: e.target.value,
                            }));
                          }}
                          className="form-control"
                          type="date"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Type</label>
                      <select
                        onChange={(e) => {
                          setProjectToAdd((d) => ({
                            ...d,
                            type: e.target.value,
                          }));
                        }}
                        className="custom-select"
                      >
                        <option value={''}>Select type</option>
                        <option value={'Plot'}>Plot for sale</option>
                        <option value={'Flat'}>Flat for sale</option>
                        <option value={'Simplex'}>Simplex for sale</option>
                        <option value={'Duplex'}>Duplex for sale</option>
                        <option value={'Triplex'}>Triplex for sale</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    rows={4}
                    className="form-control"
                    placeholder="Description"
                    defaultValue={''}
                    onChange={(e) => {
                      setProjectToAdd((d) => ({
                        ...d,
                        description: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Create Project Modal */}
      {/* Edit Project Modal */}
      <div id="edit_project" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Project</h5>
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
                  editProjects();
                }}
              >
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Project Name</label>
                      <input
                        defaultValue={projectToEdit.name}
                        onChange={(e) => {
                          setProjectToEdit((d) => ({
                            ...d,
                            name: e.target.value,
                          }));
                        }}
                        className="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <div className="form-group">
                        <label>Cost</label>
                        <input
                          onChange={(e) => {
                            setProjectToAdd((d) => ({
                              ...d,
                              estimatedCost: e.target.value,
                            }));
                          }}
                          className="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Start Date</label>
                      <div>
                        <input
                          className="form-control"
                          defaultValue={projectToEdit.startDate}
                          onChange={(e) => {
                            setProjectToEdit((d) => ({
                              ...d,
                              startDate: e.target.value,
                            }));
                          }}
                          type="date"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>End Date</label>
                      <div>
                        <input
                          defaultValue={projectToEdit.endDate}
                          onChange={(e) => {
                            setProjectToEdit((d) => ({
                              ...d,
                              endDate: e.target.value,
                            }));
                          }}
                          className="form-control"
                          type="date"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Type</label>
                      <select
                        value={projectToEdit.type}
                        onChange={(e) => {
                          setProjectToEdit((d) => ({
                            ...d,
                            type: e.target.value,
                          }));
                        }}
                        className="custom-select"
                      >
                        <option value={''}>Select type</option>
                        <option value={'Plot'}>Plot for sale</option>
                        <option value={'Flat'}>Flat for sale</option>
                        <option value={'Simplex'}>Simplex for sale</option>
                        <option value={'Duplex'}>Duplex for sale</option>
                        <option value={'Triplex'}>Triplex for sale</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    rows={4}
                    className="form-control"
                    placeholder="Description"
                    defaultValue={projectToEdit.description}
                    onChange={(e) => {
                      setProjectToEdit((d) => ({
                        ...d,
                        description: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Edit Project Modal */}
      {/* Delete Project Modal */}
      <div
        className="modal custom-modal fade"
        id="delete_project"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Project</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        deleteProject();
                      }}
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
      {/* /Delete Project Modal */}
    </div>
  );
};

export default ProjectList;
