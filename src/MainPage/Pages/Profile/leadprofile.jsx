/**
 * TermsCondition Page
 */
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import httpService from '../../../lib/httpService';
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop, makeStyles, Paper } from '@material-ui/core';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from '@material-ui/lab';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

// TODO: Better solution for this
function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + 'header')) {
    document.getElementById(elmnt.id + 'header').onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
    elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  notesInput: {
    width: '60vw',
    backgroundColor: '#fff',
  },
  notesAddButton: {
    paddingBottom: 0,
    marginBottom: 6,
  },
}));

const EmployeeProfile = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [profile, setProfile] = React.useState({});
  const [noteToAdd, setNoteToAdd] = useState({});
  const [activityToAdd, setActivityToAdd] = useState({});
  const [profileFetched, setProfileFetched] = useState(false);
  const [projects, setProjects] = useState([]);
  const [addProject, setAddProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});
  const [selectedPlot, setSelectedPlot] = useState({});

  useEffect(() => {
    if ($('.select').length > 0) {
      $('.select').select2({
        minimumResultsForSearch: -1,
        width: '100%',
      });
    }
    fetchLeadProfile();
    fetchProjects();
  }, []);

  useEffect(() => {
    if (document.getElementById('selected-plot'))
      dragElement(document.getElementById('selected-plot'));
  }, [selectedPlot?.name]);

  const fetchLeadProfile = async () => {
    const response = await httpService.get(`/lead/${id}`);
    setProfile(response.data);
    setProfileFetched(true);
  };

  const fetchProjects = async () => {
    const res = await httpService.get('/project');
    setProjects(res.data);
  };

  const addNote = async () => {
    await httpService.put(`/lead/${id}`, {
      employeeActivity: {
        activityType: 'Note Add',
        dateTime: new Date(),
        description: noteToAdd.description,
        link: `/profile/lead-profile/${id}`,
      },
      notes: profile.notes.concat({
        ...noteToAdd,
        dateTime: new Date(),
        id: profile.notes.length + 1,
      }),
    });
    fetchLeadProfile();
    document.querySelectorAll('.close')?.forEach((e) => e.click());
  };

  const addActivity = async () => {
    const response = await httpService.put(`/lead/${id}`, {
      employeeActivity: {
        activityType: `${activityToAdd.activityType}`,
        dateTime: new Date(),
        description: activityToAdd.description,
        link: `/profile/lead-profile/${id}`,
      },
      activities: profile.activities.concat({
        ...activityToAdd,
        dateTime: new Date(),
        id: profile.activities.length + 1,
      }),
    });
    fetchLeadProfile();
    document.querySelectorAll('.close')?.forEach((e) => e.click());
  };

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Lead Profile </title>
        <meta name="description" content="Reactify Blank Page" />
      </Helmet>
      {/* Page Content */}
      {!profileFetched && (
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
      {profileFetched && (
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Lead Profile</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item active">Dashboard</li>
                  <li className="breadcrumb-item active">Profile</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="card mb-0">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="profile-view">
                    <div className="profile-img-wrap">
                      <div className="profile-img">
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            background: '#E33F3B',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '4rem',
                            color: '#fff',
                          }}
                        >
                          {profile.name.split(' ')[0].charAt(0) +
                            (profile.name.split(' ')[1]?.charAt(0) || '')}
                        </div>
                      </div>
                    </div>
                    <div className="profile-basic">
                      <div className="row">
                        <div className="col-md-5">
                          <div className="profile-info-left">
                            <h3 className="user-name m-t-0 mb-0">
                              {profile.name}
                            </h3>
                          </div>

                          <div className="mt-3">
                            <ul
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                              className="personal-info profile-info-left"
                            >
                              <li>
                                <div className="title">Phone:</div>
                                <div className="text">{profile.phone}</div>
                              </li>
                              <li>
                                <div className="title">Email:</div>
                                <div className="text">{profile.email}</div>
                              </li>
                              <li>
                                <div className="title">Created At</div>
                                <div className="text">
                                  {new Date(
                                    profile.createdAt
                                  ).toLocaleDateString()}
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div className="mt-3">
                            <ul
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                              className="personal-info"
                            >
                              <li>
                                <div className="title">Address:</div>
                                <div className="text">{profile.address}</div>
                              </li>
                              <li>
                                <div className="title">Assigned Employee</div>
                                <div className="text">
                                  <Link to="/app/profile/employee-profile">
                                    {profile.assignedTo?.firstName}
                                  </Link>
                                </div>
                              </li>
                              <li>
                                <div className="title">Created By</div>
                                <div className="text">
                                  <Link to="/app/profile/employee-profile">
                                    {profile.createdBy?.firstName}
                                  </Link>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pro-edit">
                      <a
                        data-target="#profile_"
                        data-toggle="modal"
                        className="edit-icon"
                        href="#"
                      >
                        <i className="fa fa-pencil" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card tab-box">
            <div className="row user-tabs">
              <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
                <ul className="nav nav-tabs nav-tabs-bottom">
                  <li className="nav-item">
                    <a
                      href="#emp_profile"
                      data-toggle="tab"
                      className="nav-link active"
                    >
                      Timeline
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#emp_notes" data-toggle="tab" className="nav-link">
                      Notes
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#bank_statutory"
                      data-toggle="tab"
                      className="nav-link"
                    >
                      Activities
                      {/* Bank &amp; Statutory{' '}
                     <small className="text-danger">(Admin Only)</small> */}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#projects" data-toggle="tab" className="nav-link">
                      Projects
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="tab-content">
            {/* Timeline Info Tab */}
            <div
              id="emp_profile"
              className="pro-overview tab-pane fade show active"
            >
              <h3>Timeline</h3>
              <Timeline align="alternate">
                {profile.activities?.map((n) => (
                  <TimelineItem>
                    <TimelineOppositeContent>
                      <h6
                        style={{
                          marginTop: '16px',
                        }}
                        className="mb-0"
                      >
                        <span
                          style={{
                            fontWeight: 'bold',
                          }}
                        >
                          {new Date(n.dateTime).toLocaleDateString()}
                        </span>{' '}
                        at {new Date(n.dateTime).toLocaleTimeString()}
                      </h6>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot>
                        <LaptopMacIcon />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Paper
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                        }}
                        elevation={1}
                        className={classes.paper}
                      >
                        <h5>{n.activityType}</h5>
                        <p>{n.description}</p>
                      </Paper>
                    </TimelineContent>
                  </TimelineItem>
                ))}
                {profile.notes?.length > 0 && (
                  <h3
                    style={{
                      textAlign: 'center',
                      marginTop: '20px',
                      marginBottom: '20px',
                    }}
                  >
                    Notes
                  </h3>
                )}
                {profile.notes?.map((n) => (
                  <TimelineItem>
                    <TimelineOppositeContent>
                      <h6
                        style={{
                          marginTop: '16px',
                        }}
                        className="mb-0"
                      >
                        <span
                          style={{
                            fontWeight: 'bold',
                          }}
                        >
                          {new Date(n.dateTime).toLocaleDateString()}
                        </span>{' '}
                        at {new Date(n.dateTime).toLocaleTimeString()}
                      </h6>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot>
                        <LaptopMacIcon />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Paper
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                        }}
                        elevation={1}
                        className={classes.paper}
                      >
                        <h5>{n.title}</h5>
                        <p>{n.description}</p>
                      </Paper>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </div>
            {/* /Profile Info Tab */}
            {/* Notes Tab */}
            <div className="tab-pane fade" id="emp_notes">
              <div className="row">
                <div className="input-group mb-3 pl-3">
                  <h3>Notes</h3>
                  <div
                    style={{
                      marginLeft: 'auto',
                    }}
                    className="input-group-append"
                  >
                    <div className="col-auto ml-auto">
                      <a
                        href="#"
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#add_note"
                      >
                        <i className="fa fa-plus" /> Add
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  id="add_note"
                  className="modal custom-modal fade"
                  role="dialog"
                >
                  <div
                    className="modal-dialog modal-dialog-centered modal-lg"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Add Note</h5>
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
                            addNote();
                          }}
                        >
                          <div className="row">
                            <div className="col-12">
                              <div className="form-group">
                                <label className="col-form-label">
                                  Title
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  onChange={(e) => {
                                    setNoteToAdd({
                                      ...noteToAdd,
                                      title: e.target.value,
                                    });
                                  }}
                                  className="form-control"
                                  type="text"
                                />
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-group">
                                <label className="col-form-label">
                                  Description
                                  <span className="text-danger">*</span>
                                </label>
                                <textarea
                                  onChange={(e) =>
                                    setNoteToAdd({
                                      ...noteToAdd,
                                      description: e.target.value,
                                    })
                                  }
                                  rows={4}
                                  className="form-control"
                                  defaultValue={''}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="submit-section">
                            <button className="btn btn-primary submit-btn">
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                {profile?.notes?.map((p) => (
                  <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                    <div className="card">
                      <div className="card-body">
                        <div className="dropdown profile-action">
                          <a
                            aria-expanded="false"
                            data-toggle="dropdown"
                            className="action-icon dropdown-toggle"
                            href="#"
                          >
                            <i className="material-icons">more_vert</i>
                          </a>
                          <div className="dropdown-menu dropdown-menu-right">
                            <a
                              data-target="#edit_project"
                              data-toggle="modal"
                              href="#"
                              className="dropdown-item"
                            >
                              <i className="fa fa-pencil m-r-5" /> Edit
                            </a>
                            <a
                              data-target="#delete_project"
                              data-toggle="modal"
                              href="#"
                              className="dropdown-item"
                            >
                              <i className="fa fa-trash-o m-r-5" /> Delete
                            </a>
                          </div>
                        </div>
                        <h4 className="project-title">
                          {/* <Link to="/app/projects/projects-view">
                         Office Management
                       </Link> */}
                          {p.title}
                        </h4>
                        <small className="block text-ellipsis m-b-15">
                          {/* <span className="text-xs">1</span>{' '}
                       <span className="text-muted">open tasks, </span> */}
                          <span className="text-muted mr-3">
                            {new Date(p.dateTime).toLocaleDateString()}
                          </span>
                          <span className="text-xs">
                            {new Date(p.dateTime).toLocaleTimeString()}
                          </span>{' '}
                        </small>
                        <p className="text-muted">{p.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="tab-pane fade" id="bank_statutory">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                      <h2 className="card-title mb-0 h-100 mt-2">
                        {' '}
                        Activities
                      </h2>
                    </div>
                    <div className="d-flex">
                      <div>
                        <div className="col-auto ml-auto">
                          <a
                            href="#"
                            className="btn btn-primary"
                            data-toggle="modal"
                            data-target="#add_activity"
                          >
                            <i className="fa fa-plus" /> Activity
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div
                    id="add_activity"
                    className="modal custom-modal fade"
                    role="dialog"
                  >
                    <div
                      className="modal-dialog modal-dialog-centered modal-lg"
                      role="document"
                    >
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Add Activity</h5>
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
                              addActivity();
                            }}
                          >
                            <div className="row">
                              <div className="col-12">
                                <div className="form-group">
                                  <label className="col-form-label">
                                    Type
                                    <span className="text-danger">*</span>
                                  </label>
                                  <select
                                    onChange={(e) => {
                                      setActivityToAdd((activityToAdd) => ({
                                        ...activityToAdd,
                                        activityType: e.target.value,
                                      }));
                                    }}
                                    className="custom-select"
                                  >
                                    <option value="">Select Type</option>
                                    <option value="Call">Call</option>
                                    <option value="Meeting">Meeting</option>
                                    <option value="Email">Email</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="form-group">
                                  <label className="col-form-label">
                                    Description
                                    <span className="text-danger">*</span>
                                  </label>
                                  <textarea
                                    onChange={(e) =>
                                      setActivityToAdd((activityToAdd) => ({
                                        ...activityToAdd,
                                        description: e.target.value,
                                      }))
                                    }
                                    rows={4}
                                    className="form-control"
                                    defaultValue={''}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="submit-section">
                              <button className="btn btn-primary submit-btn">
                                Submit
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  {profile.activities?.map((activity) => (
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">{activity.activityType}</h5>
                        <small className="block text-ellipsis m-b-15">
                          {/* <span className="text-xs">1</span>{' '}
                       <span className="text-muted">open tasks, </span> */}
                          <span className="text-muted mr-1">
                            {new Date(activity.dateTime).toLocaleDateString()}{' '}
                            at
                          </span>
                          <span className="text-muted">
                            {new Date(activity.dateTime).toLocaleTimeString()}
                          </span>{' '}
                        </small>
                        <p class="card-text">{activity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div id="projects" className="tab-pane fade">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <h3>Projects</h3>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setAddProject(true);
                  }}
                  className="btn btn-primary"
                >
                  Add Project
                </button>
              </div>
              <div
                className="task-wrapper"
                style={{
                  padding: '0',
                  marginTop: '20px',
                }}
              >
                <div className="task-list-container">
                  <div className="task-list-body">
                    <ul id="task-list">
                      {profile.project?.map((project, i) => (
                        <li className="task" key={i}>
                          <div className="task-container">
                            <span
                              className="task-label"
                              suppressContentEditableWarning={true}
                            >
                              <Link
                                to={`/app/projects/projects-view/${project._id}`}
                              >
                                {project.name}
                              </Link>
                            </span>
                            <span
                              onClick={(e) => {
                                Swal.fire({
                                  title: 'Are you sure?',
                                  icon: 'warning',
                                  showCancelButton: true,
                                  confirmButtonColor: '#E33F3C',
                                  cancelButtonColor: '#6C757D',
                                  preConfirm: () => {
                                    return httpService.put(
                                      `/lead/${profile._id}`,
                                      {
                                        ...profile,
                                        project: profile.project
                                          .filter((p) => p._id !== project._id)
                                          .map((p) => p._id),
                                      }
                                    );
                                  },
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    fetchLeadProfile();
                                    Swal.fire({
                                      title: 'Deleted!',
                                      icon: 'success',
                                    });
                                  }
                                });
                              }}
                              className="task-action-btn task-btn-right"
                            >
                              <span
                                className="action-circle large delete-btn"
                                title="Delete Record"
                              >
                                <i className="material-icons">delete</i>
                              </span>
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Backdrop
        open={addProject}
        style={{ zIndex: '9999' }}
        onClick={() => {
          setAddProject(false);
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            style={{
              width: '90%',
              height: '90%',
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '30px',
              position: 'relative',
            }}
          >
            <h4>Select Project</h4>
            <select
              onChange={(e) => {
                setSelectedProject(
                  projects.filter((p) => p._id === e.target.value)[0]
                );
              }}
              className="custom-select"
            >
              <option hidden value=""></option>
              {projects?.map((project) => (
                <option value={project._id}>{project.name}</option>
              ))}
            </select>
            <div
              style={{
                height: '77%',
                marginTop: '20px',
              }}
            >
              {!selectedProject?.name && (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#DCDCE1',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <h2>
                    <b>No Project Selected</b>
                  </h2>
                </div>
              )}
              {selectedProject?.name && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!e.target.id) return;
                    console.log(selectedProject);
                    document
                      .querySelector(`.selected`)
                      ?.classList.remove('selected');
                    e.target.classList.add('selected');
                    setSelectedPlot(
                      selectedProject.landDivisions?.filter(
                        (p) => p.name === e.target.id
                      )[0]
                    );
                  }}
                  dangerouslySetInnerHTML={{
                    __html: selectedProject?.layout || '',
                  }}
                ></div>
              )}
            </div>
            {selectedPlot?.name && (
              <div
                id="selected-plot"
                style={{
                  position: 'absolute',
                  top: '20%',
                  right: '5%',
                  width: '22%',
                  cursor: 'move',
                  zIndex: '9999',
                  backgroundColor: 'white',
                  padding: '30px',
                  borderTop: '1px solid #E7E7E7',
                  boxShadow:
                    'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
                }}
              >
                <h4
                  style={{
                    textAlign: 'center',
                  }}
                >
                  <b>Plot Details</b>
                </h4>
                <h4>
                  <br />
                  <b>Plot Name:</b> {selectedPlot.name}
                </h4>
                <h4>
                  <b>Plot Description:</b>{' '}
                  {selectedPlot.description
                    ? selectedPlot.description
                    : 'No Description'}
                </h4>
                <h4>
                  <b>Plot Size:</b> {selectedPlot.area} Sq Ft
                </h4>
                <h4>
                  <b>Plot Price:</b> ₹ {selectedPlot.cost}
                </h4>
                <h4>
                  <b>Interested leads:</b> {selectedPlot.leads?.length || 0}
                </h4>
              </div>
            )}
            <button
              style={{
                marginTop: '3%',
              }}
              onClick={async () => {
                if (!selectedPlot.name || !selectedProject.name)
                  return toast.error('Please select a project and plot');
                if (selectedPlot.leads.some((l) => l === profile._id))
                  return toast.error('Lead is already interested in this plot');
                selectedPlot.leads = [...selectedPlot.leads, profile._id];
                console.log(selectedPlot.leads, profile._id);
                selectedProject.landDivisions[
                  selectedProject.landDivisions.findIndex(
                    (l) => l._id === selectedPlot._id
                  )
                ] = selectedPlot;
                if (
                  !selectedProject.leads.some(
                    (lead) => lead._id === profile._id
                  )
                )
                  selectedProject.leads = [
                    ...selectedProject.leads,
                    profile._id,
                  ];
                if (!profile.project.some((p) => p._id === selectedProject._id))
                  profile.project = [...profile.projects, selectedProject].map(
                    (p) => p._id
                  );
                toast.promise(
                  Promise.all([
                    httpService.put(`/lead/${profile._id}`, {
                      ...profile,
                    }),
                    httpService.put(
                      `/project/${selectedProject._id}`,
                      selectedProject
                    ),
                  ]),
                  {
                    success: 'Lead added to project',
                    error: 'Error adding lead to project',
                    pending: 'Adding lead to project',
                  }
                );
                setAddProject(false);
                fetchLeadProfile();
                fetchProjects();
              }}
              className="btn add-btn"
            >
              Confirm
            </button>
          </div>
        </div>
      </Backdrop>
    </div>
  );
};
export default EmployeeProfile;
