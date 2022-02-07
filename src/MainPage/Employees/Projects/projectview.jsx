import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Avatar_16, Avatar_09, Avatar_10 } from '../../../Entryfile/imagepath';
import httpService from '../../../lib/httpService';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Backdrop } from '@mui/material';

const ProjectView = () => {
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [projectDetails, setProjectDetails] = useState({});
  const [projectToEdit, setProjectToEdit] = useState({});
  const svgRef = useRef(null);
  const [paths, setPaths] = useState([]);
  const [fillCanChange, setFillCanChange] = useState(true);
  const [plotInfoBackdrop, setPlotInfoBackdrop] = useState(false);
  const [plotInfo, setPlotInfo] = useState({});
  const [activeInfoTab, setActiveInfoTab] = useState(1);
  const [selectePlotId, setSelectedPlotId] = useState('');
  const [selectedPath, setSelectedPath] = useState('');

  useEffect(() => {
    if ($('.select').length > 0) {
      $('.select').select2({
        minimumResultsForSearch: -1,
        width: '100%',
      });
    }
    fetchProjectDetails();
  }, []);

  useEffect(() => {
    if (activeInfoTab === 1 && selectePlotId) {
      document
        .querySelector(`#plot-info #${selectePlotId}`)
        ?.classList.add('selected');
    }
  }, [activeInfoTab, selectePlotId]);

  const updateProjectPaths = async () => {
    await toast.promise(
      httpService.post(`/project/${projectDetails._id}/landDivision`, {
        landDivisions: paths,
      }),
      {
        error: 'Something went wrong',
        success: 'Layout deatils updated successfully',
        pending: 'Updating Layout Deatils',
      }
    );
    fetchProjectDetails();
  };

  useEffect(() => {
    if (selectedPath) {
      document.querySelector(`.selected`)?.classList.remove('selected');
      document.querySelector(`#${selectedPath}`)?.classList.add('selected');
    }
  }, [selectedPath]);

  const fetchProjectDetails = async () => {
    if (!id) {
      history.goBack();
    }
    const res = await httpService.get(`/project/${id}`);
    setProjectDetails(res.data);
    setProjectToEdit(res.data);
    setPaths([]);
    const div = document.createElement('div');
    div.innerHTML = res.data.layout;
    div.querySelectorAll('g *').forEach((e) => {
      if (e.tagName !== 'title') {
        setPaths((p) => [
          ...p,
          {
            name: e.id,
            component: e.outerHTML,
            area: '',
            cost: '',
            description: '',
          },
        ]);
      }
    });
    setIsLoading(false);
  };

  const editProject = async () => {
    await httpService.put(`/project/${projectToEdit._id}`, projectToEdit);
    fetchProjectDetails();
    document.querySelectorAll('.close')?.forEach((e) => e.click());
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
          <div className="card tab-box">
            <div className="row user-tabs">
              <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
                <ul className="nav nav-tabs nav-tabs-bottom">
                  <li className="nav-item">
                    <a
                      href="#details"
                      data-toggle="tab"
                      className="nav-link active"
                    >
                      Details
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#attachments"
                      data-toggle="tab"
                      className="nav-link"
                    >
                      Attachments
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      onClick={() => {
                        setTimeout(() => {
                          projectDetails.landDivisions.forEach((land) => {
                            const path = document.querySelector(
                              `#${land.name}`
                            );
                            if (path && land.leads.length > 0) {
                              path.style.fill = '#1DC5CF';
                            } else {
                              path.style.fill = '#FF5722';
                            }
                            if (path && land.sold) {
                              path.style.fill = '#FFC107';
                            }
                          });
                        }, 0);
                      }}
                      href="#layout"
                      data-toggle="tab"
                      className="nav-link"
                    >
                      Layout
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#leads" data-toggle="tab" className="nav-link">
                      Leads
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="tab-content">
            <div
              id="details"
              className="pro-overview show active tab-pane fade"
            >
              <div className="row">
                <div className="col-lg-8 col-xl-9">
                  <div className="card">
                    <div className="card-body">
                      <div className="project-title">Project Description</div>
                      <hr />
                      <p>{projectDetails?.description}</p>
                    </div>
                  </div>
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
                                {projectDetails?.createdBy?.firstName ||
                                  'Admin'}
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
                              <>
                                + {projectDetails?.leads?.length - 4} more leads
                              </>
                            )}
                          </Link>
                        </span>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="attachments">
              <div className="row">
                <div
                  className="input-group mb-3 pl-3"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <h3>Attachments</h3>
                  <input
                    type="file"
                    style={{
                      display: 'none',
                    }}
                    onChange={(e) => {
                      const form = new FormData();
                      form.append('attachment', e.target.files[0]);
                      toast
                        .promise(
                          httpService.post(
                            `/project/${projectDetails._id}/attachment`,
                            form
                          ),
                          {
                            pending: 'Uploading File',
                            success: 'File Uploaded',
                            error: 'File Upload Failed',
                          }
                        )
                        .then(() => {
                          fetchProjectDetails();
                        });
                    }}
                  />
                  <button
                    onClick={(e) => {
                      e.target.previousSibling.click();
                    }}
                    className="btn add-btn"
                  >
                    <i className="fa fa-plus" /> Add File
                  </button>
                </div>
                <div
                  className="card"
                  style={{
                    width: '100%',
                  }}
                >
                  <div className="card-body">
                    <ul className="files-list">
                      {projectDetails.attachments?.map((attachment) => (
                        <li>
                          <div className="files-cont">
                            <div className="file-type">
                              <span className="files-icon">
                                <i className="fa fa-file-pdf-o" />
                              </span>
                            </div>
                            <div className="files-info">
                              <span className="file-name text-ellipsis">
                                <a target={'_blank'} href={attachment.url}>
                                  {attachment.name}
                                </a>
                              </span>
                              <span className="file-date">
                                {new Date(
                                  attachment.uploadedAt
                                ).toLocaleDateString() +
                                  ' at ' +
                                  new Date(
                                    attachment.uploadedAt
                                  ).toLocaleTimeString()}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="layout">
              <h2 className="card-title mb-0 h-100 mt-2"> Builder Layout</h2>
              <hr />
              <div className="row">
                {!projectDetails?.layout && (
                  <div className="card-body">
                    <h3
                      style={{
                        textAlign: 'center',
                        color: '#C0C0C0',
                        marginTop: '40px',
                        marginBottom: '30px',
                      }}
                    >
                      <input
                        type={'file'}
                        onChange={(e) => {
                          console.log(e.target.files[0]);
                          const form = new FormData();
                          form.append('layout', e.target.files[0]);
                          toast
                            .promise(
                              httpService.post(
                                `/project/${projectDetails._id}/layout`,
                                form
                              ),
                              {
                                pending: 'Uploading File',
                                success: 'File Uploaded',
                                error: 'File Upload Failed',
                              }
                            )
                            .then(() => {
                              fetchProjectDetails();
                            });
                        }}
                        style={{
                          display: 'none',
                        }}
                      />
                      <button
                        className="btn add-btn"
                        style={{
                          float: 'none',
                        }}
                        onClick={(e) => {
                          e.target.previousSibling.click();
                        }}
                      >
                        Add Layout
                      </button>
                    </h3>
                  </div>
                )}
                {projectDetails?.layout &&
                  !projectDetails?.landDivisions?.length > 0 && (
                    <div className="card-body">
                      <button
                        className="btn add-btn"
                        style={{
                          marginLeft: 'auto',
                        }}
                        onClick={() => {
                          const invalidPaths = paths.filter(
                            (path) => path.area === ''
                          );
                          if (invalidPaths.length > 0) {
                            invalidPaths.forEach((path) => {
                              toast.error(
                                `Area for ${path.name} is not specified`
                              );
                            });
                          } else {
                            updateProjectPaths();
                          }
                        }}
                      >
                        Save Layout
                      </button>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      ></div>
                      <div
                        ref={svgRef}
                        dangerouslySetInnerHTML={{
                          __html: projectDetails?.layout,
                        }}
                      ></div>
                      <div className="row">
                        <div className="col-md-12 col-sm-12">
                          <div className="table-responsive">
                            <table className="table table-hover table-white">
                              <thead>
                                <tr>
                                  <th className="col-sm-2">Item</th>
                                  <th className="col-md-6">Size</th>
                                  <th style={{ width: '100px' }}>Facing</th>
                                  <th style={{ width: '80px' }}>Dimensions</th>
                                  <th style={{ width: '100px' }}>
                                    Calculated Price
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {paths.map((path, index) => (
                                  <tr>
                                    <td>
                                      <input
                                        className="form-control"
                                        style={{ minWidth: '150px' }}
                                        readOnly
                                        value={path.name}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        onFocus={() => {
                                          setSelectedPath(path.name);
                                        }}
                                        className="form-control"
                                        type="text"
                                        style={{ minWidth: '150px' }}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        onFocus={() => {
                                          setSelectedPath(path.name);
                                        }}
                                        className="form-control"
                                        style={{ width: '100px' }}
                                        type="text"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        onFocus={() => {
                                          setSelectedPath(path.name);
                                        }}
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
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        {/* {paths.map((path, i) => (
                          <div
                            key={path.name}
                            className="col-md-4 col-sm-6 col-12 col-lg-5 col-xl-4"
                          >
                            <div
                              className="card"
                              style={{
                                padding: '6px',
                              }}
                            >
                              <h3
                                style={{
                                  textAlign: 'center',
                                }}
                              >
                                {path.name}
                              </h3>
                              <input
                                type={'number'}
                                onChange={(e) => {
                                  setPaths((p) => {
                                    const newPaths = [...p];
                                    newPaths[i].area = e.target.value;
                                    newPaths[i].cost =
                                      e.target.value *
                                      projectDetails.estimatedCost;
                                    return newPaths;
                                  });
                                }}
                                onFocus={(e) => {
                                  document
                                    .querySelector(`svg #${path.name}`)
                                    .classList.add('selected');
                                }}
                                onBlur={(e) => {
                                  document
                                    .querySelector(`svg #${path.name}`)
                                    .classList.remove('selected');
                                }}
                                placeholder="Area"
                                className="form-control"
                              />
                              <br />
                              <textarea
                                onChange={(e) => {
                                  setPaths((p) => {
                                    const newPaths = [...p];
                                    newPaths[i].description = e.target.value;
                                    return newPaths;
                                  });
                                }}
                                className="form-control"
                                rows={4}
                                placeholder="Description"
                              />
                              <br />
                            </div>
                          </div>
                        ))} */}
                      </div>
                      <br />
                      <br />
                    </div>
                  )}
                {projectDetails?.landDivisions?.length > 0 && (
                  <div className="card-body">
                    <div
                      onClick={(e) => {
                        if (!e.target.id) return;
                        setPlotInfo(
                          projectDetails.landDivisions.find(
                            (d) => d.name === e.target.id
                          )
                        );
                        setPlotInfoBackdrop(true);
                        setSelectedPlotId(e.target.id);
                        setTimeout(() => {
                          document
                            .querySelector(`#plot-info #${e.target.id}`)
                            .classList.add('selected');
                        }, 0);
                      }}
                      ref={svgRef}
                      dangerouslySetInnerHTML={{
                        __html: projectDetails?.layout,
                      }}
                    ></div>
                    <h4>Legends</h4>
                    <div>
                      <div
                        style={{
                          background: '#1DC5CF',
                          display: 'inline-block',
                          width: '10px',
                          height: '10px',
                        }}
                      ></div>{' '}
                      Leads Attahced
                    </div>
                    <div>
                      <div
                        style={{
                          background: '#FF5722',
                          display: 'inline-block',
                          width: '10px',
                          height: '10px',
                        }}
                      ></div>{' '}
                      Inactive plots
                    </div>
                    <div>
                      <div
                        style={{
                          background: '#FFC107',
                          display: 'inline-block',
                          width: '10px',
                          height: '10px',
                        }}
                      ></div>{' '}
                      Sold Plots
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div id="leads" className="tab-pane fade">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <h3>Leads</h3>
              </div>
              <div
                className="row"
                style={{
                  padding: '15px',
                }}
              >
                {projectDetails?.leads.map((lead) => (
                  <div
                    key={lead._id}
                    className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3"
                  >
                    <div className="profile-widget">
                      <div className="profile-img">
                        <Link
                          to={`/app/profile/lead-profile/${lead._id}`}
                          className="avatar"
                        >
                          <img src={''} alt="" />
                        </Link>
                      </div>
                      <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                        <Link to="/app/profile/employee-profile">
                          {lead.name}
                        </Link>
                      </h4>
                      <div className="small text-muted">{lead.phone}</div>
                      <div className="small text-muted">{lead.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* /Page Content */}
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
                  editProject();
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
                          value={projectToEdit.estimatedCost}
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
                          value={
                            projectToEdit.startDate
                              ? new Date(projectToEdit.startDate)
                                  .toISOString()
                                  .split('T')[0]
                              : ''
                          }
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
                          value={
                            projectToEdit.startDate
                              ? new Date(projectToEdit.endDate)
                                  .toISOString()
                                  .split('T')[0]
                              : ''
                          }
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
      <Backdrop
        style={{
          zIndex: '9999',
        }}
        open={plotInfoBackdrop}
        onClick={() => {
          setPlotInfoBackdrop(false);
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
          {plotInfoBackdrop && (
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              style={{
                width: '80%',
                minHeight: '70%',
                maxHeight: '70%',
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '30px',
                overflow: 'auto',
              }}
            >
              <div className="card tab-box">
                <div className="row user-tabs">
                  <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
                    <ul className="nav nav-tabs nav-tabs-bottom">
                      <li className="nav-item">
                        <a
                          href="#info"
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveInfoTab(1);
                          }}
                          className={`nav-link ${
                            activeInfoTab === 1 ? 'active' : ''
                          }`}
                        >
                          Plot Info
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#lead"
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveInfoTab(2);
                          }}
                          className={`nav-link ${
                            activeInfoTab === 2 ? 'active' : ''
                          }`}
                        >
                          Leads
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#leads"
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveInfoTab(3);
                          }}
                          className={`nav-link ${
                            activeInfoTab === 3 ? 'active' : ''
                          }`}
                        >
                          Sales
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="tab-content">
                {activeInfoTab === 1 && (
                  <div id="info" className="">
                    <div>
                      <h4>
                        <b>Plot Name</b>: <span>{plotInfo.name}</span>
                      </h4>
                      <h4>
                        <b>Plot Size</b>: <span>{plotInfo.area} Sq Feet</span>
                      </h4>
                      <h4>
                        <b>Plot Cost</b>: <span>{plotInfo.cost}</span>
                      </h4>
                      <h4>
                        <b>Description</b>:{' '}
                        <span>
                          {plotInfo.description
                            ? plotInfo.description
                            : 'No Description Given'}
                        </span>
                      </h4>
                      <h4>
                        <b>Status</b>:{' '}
                        <span>{plotInfo.sold ? 'Sold ' : 'Not Sold'}</span>
                      </h4>
                      <h4>
                        <b>Plot Location</b>
                      </h4>
                      <div
                        id="plot-info"
                        dangerouslySetInnerHTML={{
                          __html: projectDetails?.layout,
                        }}
                      ></div>
                    </div>
                  </div>
                )}
                {activeInfoTab === 2 && (
                  <div id="lead" className="">
                    <h4>Interested leads</h4>
                    <div
                      className="task-wrapper"
                      style={{
                        padding: '0',
                      }}
                    >
                      <div className="task-list-container">
                        <div className="task-list-body">
                          <ul id="task-list">
                            {plotInfo.leads?.map((lead, i) => (
                              <li className="task" key={i}>
                                <div className="task-container">
                                  <span
                                    className="task-label"
                                    suppressContentEditableWarning={true}
                                  >
                                    <Link
                                      to={`/app/profile/lead-profile/${lead._id}`}
                                    >
                                      {lead.name}
                                    </Link>
                                  </span>
                                  <span></span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeInfoTab === 3 && plotInfo.sold ? (
                  <div id="lead" className="">
                    <div
                      className="task-wrapper"
                      style={{
                        padding: '0',
                      }}
                    >
                      <h4>
                        <b>Sold To</b>: {plotInfo.soldTo?.name}
                      </h4>
                      <h4>
                        <b>Sold On</b>: {plotInfo.soldAt}
                      </h4>
                      <h4>
                        <b>Sold Price</b>: {plotInfo.cost}
                      </h4>
                      <h4>
                        <b>Sold By</b>: {plotInfo.soldBy?.firstName}
                      </h4>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          )}
        </div>
      </Backdrop>
      {/* /Edit Project Modal */}
    </div>
  );
};

export default ProjectView;
