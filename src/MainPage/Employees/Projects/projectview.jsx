import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Avatar_16, Avatar_09, Avatar_10 } from '../../../Entryfile/imagepath';
import httpService from '../../../lib/httpService';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const ProjectView = () => {
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [projectDetails, setProjectDetails] = useState({});
  const [projectToEdit, setProjectToEdit] = useState({});
  const svgRef = useRef(null);
  const [fillCanChange, setFillCanChange] = useState(true);

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
    if (svgRef.current && !isLoading) {
      document.querySelectorAll('g *').forEach((e) => {
        const title = document.createElement('title');
        title.innerText = e.id;
        e.appendChild(title);
        e.classList.remove('selected');
        if (projectDetails.landDivisions?.some((x) => x.name === e.id)) {
          e.classList.add('selected');
        }
        setFillCanChange(false);
        e.addEventListener('click', (e) => {
          Swal.fire({
            title: 'Attach lead',
            html: `<select id="length" class="swal2-select" placeholder="Length">
            <option value="">Select Lead</option>
            ${projectDetails?.leads
              ?.filter(
                (lead) =>
                  lead.status !== 'Lead Won' && lead.status !== 'Lead Lost'
              )
              .map(
                (lead) => `<option value="${lead._id}">${lead.name}</option>`
              )}            
            </seclect>
            `,
            confirmButtonText: 'Confirm',
            focusConfirm: false,
            preConfirm: () => {
              const lead = Swal.getPopup().querySelector('#length').value;
              if (!lead) {
                Swal.showValidationMessage('Please select lead');
                return;
              }
              return httpService.put(`/project/${id}`, {
                ...projectDetails,
                landDivisions: [
                  ...projectDetails.landDivisions,
                  { name: e.target.id, lead: lead },
                ],
              });
            },
          }).then((result) => {
            if (result.isConfirmed) {
              fetchProjectDetails();
              e.target.classList.add('selected');
            }
          });
        });
      });
    }
  }, [svgRef.current, isLoading]);

  // useEffect(() => {
  //   document.querySelectorAll('g *').forEach((e) => {
  //     const title = document.createElement('title');
  //     title.innerText = e.id;
  //     e.appendChild(title);
  //     e.classList.remove('selected');
  //     if (projectDetails.landDivisions?.some((x) => x.name === e.id)) {
  //       e.classList.add('selected');
  //     }
  //     setFillCanChange(false);
  //   });
  // }, [fillCanChange]);

  const fetchProjectDetails = async () => {
    if (!id) {
      history.goBack();
    }
    const res = await httpService.get(`/project/${id}`);
    setProjectDetails(res.data);
    setProjectToEdit(res.data);
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
          <div className="row">
            <div className="col-lg-8 col-xl-9">
              <div className="card">
                <div className="card-body">
                  <div className="project-title">Project Description</div>
                  <hr />
                  <p>{projectDetails?.description}</p>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <h5 className="card-title m-b-20">Uploaded files</h5>
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
              {!projectDetails?.layout && (
                <div className="card">
                  <div className="card-body">
                    <h3>Project Layout</h3>
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
                        onChange={(e) => {}}
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
                          // e.target.previousSibling.click();
                          Swal.fire({
                            title: 'Add Layout',
                            input: 'textarea',
                            confirmButtonColor: '#E23E3B',
                            confirmButtonText: 'Confirm',
                            showCancelButton: true,
                            preConfirm: (value) => {
                              return httpService.put(
                                `/project/${projectDetails._id}/`,
                                {
                                  ...projectDetails,
                                  layout: value,
                                }
                              );
                            },
                          }).then((result) => {
                            if (result.isConfirmed) {
                              fetchProjectDetails();
                            }
                          });
                        }}
                      >
                        Add Layout
                      </button>
                    </h3>
                  </div>
                </div>
              )}
              {projectDetails?.layout && (
                <div className="card">
                  <div className="card-body">
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <h3>Project Layout</h3>
                      <button
                        style={{
                          marginLeft: 'auto',
                        }}
                        className="btn add-btn"
                      >
                        Edit Layout
                      </button>
                    </div>
                    <div
                      ref={svgRef}
                      dangerouslySetInnerHTML={{
                        __html: projectDetails?.layout,
                      }}
                    ></div>
                    <div>
                      Legend:{' '}
                      <div
                        style={{
                          display: 'inline-block',
                          backgroundColor: 'green',
                          width: '10px',
                          height: '10px',
                        }}
                      ></div>{' '}
                      - Lead Associated
                    </div>
                    <br />
                    <br />
                    <h4>Lead Interests</h4>
                    <div
                      className="task-wrapper"
                      style={{
                        padding: '0',
                      }}
                    >
                      <div className="task-list-container">
                        <div className="task-list-body">
                          <ul id="task-list">
                            {projectDetails.landDivisions?.map(
                              (landDivision, i) => (
                                <li className="task" key={i}>
                                  <div className="task-container">
                                    <span
                                      className="task-label"
                                      contentEditable="true"
                                      suppressContentEditableWarning={true}
                                    >
                                      {landDivision.lead?.name} has shown
                                      interest in Land area {landDivision.name}
                                    </span>
                                    <span
                                      onClick={(e) => {
                                        Swal.fire({
                                          title: 'Are you sure?',
                                          icon: 'warning',
                                          showCancelButton: true,
                                          confirmButtonColor: '#3085d6',
                                          preConfirm: () => {
                                            return httpService.put(
                                              `/project/${projectDetails._id}`,
                                              {
                                                ...projectDetails,
                                                landDivisions:
                                                  projectDetails.landDivisions.filter(
                                                    (_, index) => index !== i
                                                  ),
                                              }
                                            );
                                          },
                                        }).then(() => {
                                          fetchProjectDetails();
                                          document
                                            .querySelector(
                                              `svg #${landDivision.name}`
                                            )
                                            .classList.remove('selected');
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
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
                            {projectDetails?.createdBy?.firstName || 'Admin'}
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
      {/* /Edit Project Modal */}
    </div>
  );
};

export default ProjectView;
