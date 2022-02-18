import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import 'react-summernote/dist/react-summernote.css'; // import styles
import '../../index.css';
import httpService from '../../../lib/httpService';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import AddProjectModal from './popups/AddProjectModal';
import EditProjectModal from './popups/EditProjectModal';
import DeleteProjectModal from './popups/DeleteProjectModal';

const ProjectList = () => {
  const [projectList, setProjectList] = React.useState([]);
  const [projectsFromServer, setProjectsFromServer] = React.useState([]);
  const [projectToAdd, setProjectToAdd] = React.useState({});
  const [projectToEdit, setProjectToEdit] = React.useState({});
  const [projectNameToSearch, setProjectNameToSearch] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await httpService.get('/project');
      setProjectsFromServer(result.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const searchProject = async (e) => {
    e.preventDefault();
    const filteredProjects = projectsFromServer.filter((project) =>
      project.name.toLowerCase().includes(projectNameToSearch.toLowerCase())
    );
    setProjectList(filteredProjects);
  };

  useEffect(() => {
    if (!isLoading && projectNameToSearch) {
      const filteredProjects = projectsFromServer.filter((project) =>
        project.name.toLowerCase().includes(projectNameToSearch.toLowerCase())
      );
      setProjectList(filteredProjects);
    } else {
      setProjectList(projectsFromServer);
    }
  }, [isLoading, projectNameToSearch]);

  const addProjects = async () => {
    toast.promise(
      new Promise((resolve, reject) => {
        httpService
          .post('/project', projectToAdd)
          .then((res) => {
            fetchData();
            document.querySelectorAll('.close')?.forEach((e) => e.click());
            resolve();
          })
          .catch((err) => {
            reject();
          });
      }),
      {
        error: 'Something went wrong!',
        success: 'Project added successfully!',
        pending: 'Adding project...',
      }
    );
  };

  const editProjects = async () => {
    toast.promise(
      new Promise((resolve, reject) => {
        httpService
          .put(`/project/${projectToEdit._id}`, projectToEdit)
          .then((res) => {
            fetchData();
            setProjectToEdit({});
            document.querySelectorAll('.close')?.forEach((e) => e.click());
            resolve();
          })
          .catch((err) => {
            console.log(err);
            reject();
          });
      }),
      {
        pending: 'Updating Project...',
        success: 'Project Updated Successfully',
        error: 'Something went wrong',
      }
    );
  };

  const deleteProject = async () => {
    toast.promise(
      new Promise((resolve, reject) => {
        httpService.delete(`/project/${projectToEdit._id}`).then((res) => {
          if (res.status < 400) {
            fetchData();
            document.querySelectorAll('.cancel-btn')?.forEach((e) => e.click());
            setProjectToEdit({});
            resolve();
          } else {
            reject();
          }
        });
      }),
      {
        pending: 'Deleting Project...',
        success: 'Project Deleted Successfully',
        error: 'Something went wrong',
      }
    );
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
          <div className="row filter-row">
            <div className="col-9">
              <div className="form-group form-focus focused">
                <input
                  onChange={(e) => {
                    setProjectNameToSearch(e.target.value);
                  }}
                  type="text"
                  placeholder="Project Name"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <a
                href="#"
                onClick={searchProject}
                className="btn btn-success btn-block"
              >
                {' '}
                Search{' '}
              </a>
            </div>
          </div>
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
                        Start Date
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

                          <td>{convertDate(project.startDate)} </td>

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
                                  onClick={() => setProjectToEdit(project)}
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
                {!projectList.length && (
                  <div
                    style={{
                      width: '100%',
                      height: '300px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <h3>No Projects</h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <AddProjectModal
        onSubmit={addProjects}
        setProjectToAdd={setProjectToAdd}
      />
      <EditProjectModal
        onSubmit={editProjects}
        setProjectToEdit={setProjectToEdit}
        projectToEdit={projectToEdit}
      />
      <DeleteProjectModal onSubmit={deleteProject} />
    </div>
  );
};

export default ProjectList;
