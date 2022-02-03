import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory, useParams } from 'react-router-dom';
import {
  Avatar_16,
  Avatar_02,
  Avatar_05,
  Avatar_09,
  Avatar_10,
  Avatar_11,
  Avatar_01,
} from '../../../Entryfile/imagepath';
import httpService from '../../../lib/httpService';
import CircularProgress from '@mui/material/CircularProgress';

const ProjectView = () => {
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [projectDetails, setProjectDetails] = useState({});

  console.log(id);
  useEffect(() => {
    if ($('.select').length > 0) {
      $('.select').select2({
        minimumResultsForSearch: -1,
        width: '100%',
      });
    }
    fetchProjectDetails();
  }, []);

  const fetchProjectDetails = async () => {
    if (!id) {
      history.goBack();
    }
    const res = await httpService.get(`/project/${id}`);
    setIsLoading(false);
    setProjectDetails(res.data);
  };

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Projects </title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      {isLoading && (
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
      )}
      {!isLoading && (
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">{projectDetails?.name}</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Project</li>
                </ul>
              </div>
              <div className="col-auto float-right ml-auto">
                <a
                  href="#"
                  className="btn add-btn"
                  data-toggle="modal"
                  data-target="#edit_project"
                >
                  <i className="fa fa-plus" /> Edit Project
                </a>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-lg-8 col-xl-9">
              <div className="card">
                <div className="card-body">
                  <div className="project-title"></div>
                  <p>{projectDetails?.description}</p>
                </div>
              </div>
              {/* <div className="project-task">
                <ul className="nav nav-tabs nav-tabs-top nav-justified mb-0">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      href="#all_tasks"
                      data-toggle="tab"
                      aria-expanded="true"
                    >
                      All Tasks
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#pending_tasks"
                      data-toggle="tab"
                      aria-expanded="false"
                    >
                      Pending Tasks
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#completed_tasks"
                      data-toggle="tab"
                      aria-expanded="false"
                    >
                      Completed Tasks
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane show active" id="all_tasks">
                    <div className="task-wrapper">
                      <div className="task-list-container">
                        <div className="task-list-body">
                          <ul id="task-list">
                            <li className="task">
                              <div className="task-container">
                                <span className="task-action-btn task-check">
                                  <span
                                    className="action-circle large complete-btn"
                                    title="Mark Complete"
                                  >
                                    <i className="material-icons">check</i>
                                  </span>
                                </span>
                                <span
                                  className="task-label"
                                  contentEditable="true"
                                  suppressContentEditableWarning={true}
                                >
                                  Patient appointment booking
                                </span>
                                <span className="task-action-btn task-btn-right">
                                  <span
                                    className="action-circle large"
                                    title="Assign"
                                  >
                                    <i className="material-icons">person_add</i>
                                  </span>
                                  <span
                                    className="action-circle large delete-btn"
                                    title="Delete Task"
                                  >
                                    <i className="material-icons">delete</i>
                                  </span>
                                </span>
                              </div>
                            </li>
                            <li className="task">
                              <div className="task-container">
                                <span className="task-action-btn task-check">
                                  <span
                                    className="action-circle large complete-btn"
                                    title="Mark Complete"
                                  >
                                    <i className="material-icons">check</i>
                                  </span>
                                </span>
                                <span
                                  className="task-label"
                                  contentEditable="true"
                                  suppressContentEditableWarning={true}
                                >
                                  Appointment booking with payment gateway
                                </span>
                                <span className="task-action-btn task-btn-right">
                                  <span
                                    className="action-circle large"
                                    title="Assign"
                                  >
                                    <i className="material-icons">person_add</i>
                                  </span>
                                  <span
                                    className="action-circle large delete-btn"
                                    title="Delete Task"
                                  >
                                    <i className="material-icons">delete</i>
                                  </span>
                                </span>
                              </div>
                            </li>
                            <li className="completed task">
                              <div className="task-container">
                                <span className="task-action-btn task-check">
                                  <span
                                    className="action-circle large complete-btn"
                                    title="Mark Complete"
                                  >
                                    <i className="material-icons">check</i>
                                  </span>
                                </span>
                                <span className="task-label">
                                  Doctor available module
                                </span>
                                <span className="task-action-btn task-btn-right">
                                  <span
                                    className="action-circle large"
                                    title="Assign"
                                  >
                                    <i className="material-icons">person_add</i>
                                  </span>
                                  <span
                                    className="action-circle large delete-btn"
                                    title="Delete Task"
                                  >
                                    <i className="material-icons">delete</i>
                                  </span>
                                </span>
                              </div>
                            </li>
                            <li className="task">
                              <div className="task-container">
                                <span className="task-action-btn task-check">
                                  <span
                                    className="action-circle large complete-btn"
                                    title="Mark Complete"
                                  >
                                    <i className="material-icons">check</i>
                                  </span>
                                </span>
                                <span
                                  className="task-label"
                                  contentEditable="true"
                                  suppressContentEditableWarning={true}
                                >
                                  Patient and Doctor video conferencing
                                </span>
                                <span className="task-action-btn task-btn-right">
                                  <span
                                    className="action-circle large"
                                    title="Assign"
                                  >
                                    <i className="material-icons">person_add</i>
                                  </span>
                                  <span
                                    className="action-circle large delete-btn"
                                    title="Delete Task"
                                  >
                                    <i className="material-icons">delete</i>
                                  </span>
                                </span>
                              </div>
                            </li>
                            <li className="task">
                              <div className="task-container">
                                <span className="task-action-btn task-check">
                                  <span
                                    className="action-circle large complete-btn"
                                    title="Mark Complete"
                                  >
                                    <i className="material-icons">check</i>
                                  </span>
                                </span>
                                <span
                                  className="task-label"
                                  contentEditable="true"
                                  suppressContentEditableWarning={true}
                                >
                                  Private chat module
                                </span>
                                <span className="task-action-btn task-btn-right">
                                  <span
                                    className="action-circle large"
                                    title="Assign"
                                  >
                                    <i className="material-icons">person_add</i>
                                  </span>
                                  <span
                                    className="action-circle large delete-btn"
                                    title="Delete Task"
                                  >
                                    <i className="material-icons">delete</i>
                                  </span>
                                </span>
                              </div>
                            </li>
                            <li className="task">
                              <div className="task-container">
                                <span className="task-action-btn task-check">
                                  <span
                                    className="action-circle large complete-btn"
                                    title="Mark Complete"
                                  >
                                    <i className="material-icons">check</i>
                                  </span>
                                </span>
                                <span
                                  className="task-label"
                                  contentEditable="true"
                                  suppressContentEditableWarning={true}
                                >
                                  Patient Profile add
                                </span>
                                <span className="task-action-btn task-btn-right">
                                  <span
                                    className="action-circle large"
                                    title="Assign"
                                  >
                                    <i className="material-icons">person_add</i>
                                  </span>
                                  <span
                                    className="action-circle large delete-btn"
                                    title="Delete Task"
                                  >
                                    <i className="material-icons">delete</i>
                                  </span>
                                </span>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="task-list-footer">
                          <div className="new-task-wrapper">
                            <textarea
                              id="new-task"
                              placeholder="Enter new task here. . ."
                              defaultValue={''}
                            />
                            <span className="error-message hidden">
                              You need to enter a task first
                            </span>
                            <span
                              className="add-new-task-btn btn"
                              id="add-task"
                            >
                              Add Task
                            </span>
                            <span className="btn" id="close-task-panel">
                              Close
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="pending_tasks" />
                  <div className="tab-pane" id="completed_tasks" />
                </div>
              </div> */}
            </div>
            <div className="col-lg-4 col-xl-3">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title m-b-15">Project details</h6>
                  <table className="table table-striped table-border">
                    <tbody>
                      <tr>
                        <td>Cost:</td>
                        <td className="text-right">
                          ₹{projectDetails.estimatedCost}
                        </td>
                      </tr>
                      <tr>
                        <td>Created:</td>
                        <td className="text-right">
                          {new Date(
                            projectDetails?.startDate
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                      <tr>
                        <td>Deadline:</td>
                        <td className="text-right">
                          {new Date(
                            projectDetails?.endDate
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                      <tr>
                        <td>Created by:</td>
                        <td className="text-right">
                          <Link to="/app/profile/employee-profile">
                            {projectDetails?.createdBy || 'Admin'}
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td>Status:</td>
                        <td className="text-right">Working</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="m-b-5">
                    Progress
                    <span className="text-success float-right">40%</span>
                  </p>
                  <div className="progress progress-xs mb-0">
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      data-toggle="tooltip"
                      title="40%"
                      style={{ width: '40%' }}
                    />
                  </div>
                </div>
              </div>
              <div className="card project-user">
                <div className="card-body">
                  <h6 className="card-title m-b-20">Members</h6>
                  <ul className="list-box">
                    {projectDetails?.members?.map((member) => (
                      <li>
                        <Link
                          to={`/app/profile/employee-profile/${member._id}`}
                        >
                          <div className="list-item">
                            <div className="list-left">
                              <span className="avatar">
                                <div
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    background: '#5AB9AA',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: '1rem',
                                    color: '#fff',
                                  }}
                                >
                                  {member.firstName.charAt(0) +
                                    (member.lastName.charAt(0) || '')}
                                </div>
                              </span>
                            </div>
                            <div className="list-body">
                              <span className="message-author">
                                {member.firstName} {member.lastName}
                              </span>
                              <div className="clearfix" />
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="card project-user">
                <div className="card-body">
                  <h6 className="card-title m-b-20">Leads</h6>
                  <ul className="list-box">
                    {projectDetails?.leads
                      ?.reverse()
                      .slice(0, 4)
                      .map((lead) => (
                        <li>
                          <Link to="/app/profile/employee-profile">
                            <div className="list-item">
                              <div className="list-left">
                                <span className="avatar">
                                  <div
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      background: '#5AB9AA',
                                      borderRadius: '50%',
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      fontSize: '1.2rem',
                                      color: '#fff',
                                    }}
                                  >
                                    {lead.name.split(' ')[0].charAt(0) +
                                      (lead.name.split(' ')[1]?.charAt(0) ||
                                        '')}
                                  </div>
                                </span>
                              </div>
                              <div className="list-body">
                                <span className="message-author">
                                  {lead.name}
                                </span>
                                <div className="clearfix" />
                                <span className="message-content">
                                  {lead.status}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    <span className="message-content">
                      <Link
                        to={`/app/employees/leads?projectId=${projectDetails._id}`}
                      >
                        {projectDetails.leads?.length > 4 && (
                          <>+ {projectDetails?.leads?.length - 4} more leads</>
                        )}
                      </Link>
                    </span>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* /Page Content */}
      {/* Assign Leader Modal */}
      <div id="assign_leader" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Assign Leader to this project</h5>
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
              <div className="input-group m-b-30">
                <input
                  placeholder="Search to add a leader"
                  className="form-control search-input"
                  type="text"
                />
                <span className="input-group-append">
                  <button className="btn btn-primary">Search</button>
                </span>
              </div>
              <div>
                <ul className="chat-user-list">
                  <li>
                    <a href="#">
                      <div className="media">
                        <span className="avatar">
                          <img alt="" src={Avatar_09} />
                        </span>
                        <div className="media-body align-self-center text-nowrap">
                          <div className="user-name">Shital Agarwal</div>
                          <span className="designation">Product Manager</span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="media">
                        <span className="avatar">
                          <img alt="" src={Avatar_10} />
                        </span>
                        <div className="media-body align-self-center text-nowrap">
                          <div className="user-name">Harvinder</div>
                          <span className="designation">Product Manager</span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="media">
                        <span className="avatar">
                          <img alt="" src={Avatar_16} />
                        </span>
                        <div className="media-body align-self-center text-nowrap">
                          <div className="user-name">Sushmita Singh</div>
                          <span className="designation">Team Leader</span>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="submit-section">
                <button className="btn btn-primary submit-btn">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Assign Leader Modal */}
      {/* Assign User Modal */}
      <div id="assign_user" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Assign the user to this project</h5>
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
              <div className="input-group m-b-30">
                <input
                  placeholder="Search a user to assign"
                  className="form-control search-input"
                  type="text"
                />
                <span className="input-group-append">
                  <button className="btn btn-primary">Search</button>
                </span>
              </div>
              <div>
                <ul className="chat-user-list">
                  <li>
                    <a href="#">
                      <div className="media">
                        <span className="avatar">
                          <img alt="" src={Avatar_09} />
                        </span>
                        <div className="media-body align-self-center text-nowrap">
                          <div className="user-name">Shital Agarwal</div>
                          <span className="designation">Product Manager</span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="media">
                        <span className="avatar">
                          <img alt="" src={Avatar_10} />
                        </span>
                        <div className="media-body align-self-center text-nowrap">
                          <div className="user-name">Harvinder</div>
                          <span className="designation">Product Manager</span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="media">
                        <span className="avatar">
                          <img alt="" src={Avatar_16} />
                        </span>
                        <div className="media-body align-self-center text-nowrap">
                          <div className="user-name">Sushmita Singh</div>
                          <span className="designation">Team Leader</span>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="submit-section">
                <button className="btn btn-primary submit-btn">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Assign User Modal */}
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
              <form>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Project Name</label>
                      <input
                        className="form-control"
                        defaultValue="Project Management"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Client</label>
                      <select className="select">
                        <option>Sunteck Realty Ltd</option>
                        <option>Godrej Properties Ltd</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Start Date</label>
                      <div>
                        <input
                          className="form-control datetimepicker"
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
                          className="form-control datetimepicker"
                          type="date"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label>Rate</label>
                      <input
                        placeholder="$50"
                        className="form-control"
                        defaultValue="$5000"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label>&nbsp;</label>
                      <select className="select">
                        <option>Hourly</option>
                        <option>Fixed</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Priority</label>
                      <select className="select">
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Add Project Leader</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Team Leader</label>
                      <div className="project-members">
                        <a
                          className="avatar"
                          href="#"
                          data-toggle="tooltip"
                          title="Sushmita Singh"
                        >
                          <img alt="" src={Avatar_16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Add Team</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Team Members</label>
                      <div className="project-members">
                        <a
                          className="avatar"
                          href="#"
                          data-toggle="tooltip"
                          title="Prateek Tiwari"
                        >
                          <img alt="" src={Avatar_02} />
                        </a>
                        <a
                          className="avatar"
                          href="#"
                          data-toggle="tooltip"
                          title="Shital Agarwal"
                        >
                          <img alt="" src={Avatar_09} />
                        </a>
                        <a
                          className="avatar"
                          href="#"
                          data-toggle="tooltip"
                          title="Harvinder"
                        >
                          <img alt="" src={Avatar_10} />
                        </a>
                        <a
                          className="avatar"
                          href="#"
                          data-toggle="tooltip"
                          title="Shreya Singh"
                        >
                          <img alt="" src={Avatar_05} />
                        </a>
                        <span className="all-team">+2</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    rows={4}
                    className="form-control"
                    placeholder="Enter your message here"
                    defaultValue={''}
                  />
                </div>
                <div className="form-group">
                  <label>Upload Files</label>
                  <input className="form-control" type="file" />
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Edit Project Modal */}
    </div>
  );
};

export default ProjectView;
