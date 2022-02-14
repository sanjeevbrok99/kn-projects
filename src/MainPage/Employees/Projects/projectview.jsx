import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory, useParams } from 'react-router-dom';
import httpService from '../../../lib/httpService';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import { Backdrop } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Swal from 'sweetalert2';
import PlotsTable from './plotsTable';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import PlotsBreakdown from './PlotsBreakdown';

const InactiveTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 250,
  },
});

const InDisscussionTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 250,
  },
});

const InNegotiationTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 250,
    background: '#89CFF0',
    color: '#fff',
  },
});

const LeadsWontTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 250,
    background: '#9A66CB',
    color: '#fff',
  },
});

const SoldOutTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 250,
    background: '#4CBB17',
    color: '#fff',
  },
});

const legends = [
  {
    name: 'Inactive',
    color: '#EF473A',
  },
  {
    name: 'In Discussion',
    color: '#FEF600',
  },
  {
    name: 'In Negotiation',
    color: '#89CFF0',
  },
  {
    name: 'Leads Won',
    color: '#9A66CB',
  },
];

const ProjectView = () => {
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [projectDetails, setProjectDetails] = useState({});
  const [projectToEdit, setProjectToEdit] = useState({});
  const layoutImageRef = useRef(null);
  const imgRef = useRef(null);
  const [plotInfoBackdrop, setPlotInfoBackdrop] = useState(false);
  const [plotInfo, setPlotInfo] = useState({});
  const [activeInfoTab, setActiveInfoTab] = useState(2);
  const [selectePlotId, setSelectedPlotId] = useState('');
  const [selectedPath, setSelectedPath] = useState('');
  const [customerPurchases, setCustomerPurchases] = useState([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [updatedPaths, setUpdatedPaths] = useState(false);
  const [imageReady, setImageReady] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [totalPlotArea, setTotalPlotArea] = useState(0);
  const [plotAreaUnderDiscussion, setPlotAreaUnderDiscussion] = useState(0);
  const [plotAreaInNegotiation, setPlotAreaInNegotiation] = useState(0);
  const [plotAreaLeadsWon, setPlotAreaLeadsWon] = useState(0);
  const [plotAreaSoldOut, setPlotAreaSoldOut] = useState(0);
  const [totalPlots, setTotalPlots] = useState(0);
  const [totalPlotsSoldOut, setTotalPlotsSoldOut] = useState(0);
  const [totalPlotsInDiscussion, setTotalPlotsInDiscussion] = useState(0);
  const [totalPlotsInNegotiation, setTotalPlotsInNegotiation] = useState(0);
  const [totalPlotsLeadsWon, setTotalPlotsLeadsWon] = useState(0);
  const [showPlotsBreakdown, setShowPlotsBreakdown] = useState(false);

  useEffect(() => {
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
    await toast
      .promise(
        httpService.post(`/project/${projectDetails._id}/subPlots`, {
          subPlots: projectDetails.subPlots,
        }),
        {
          error: 'Something went wrong',
          success: 'Layout deatils updated successfully',
          pending: 'Updating Layout Deatils',
        }
      )
      .then(() => {
        window.location.reload();
      });
    setUpdatedPaths(false);
  };

  useEffect(() => {
    if (selectedPath) {
      document.querySelector(`.selected`)?.classList.remove('selected');
      document.querySelector(`#${selectedPath}`)?.classList.add('selected');
    }
  }, [selectedPath]);

  useEffect(() => {
    console.log(coordinates);
  }, [coordinates.length]);

  const fetchProjectDetails = async () => {
    if (!id) {
      history.goBack();
    }
    const res = await httpService.get(`/project/${id}`);
    setProjectDetails(res.data);
    setProjectToEdit(res.data);
    if (
      res?.data?.subPlots.some((p) => !p.component) ||
      res?.data?.subPlots.length === 0
    ) {
      setUpdatedPaths(true);
    }
    res?.data?.subPlots
      .filter((l) => l.sold)
      .map((land) => land.soldTo)
      .forEach((c) => {
        setCustomerPurchases((p) => {
          const temp = p;
          if (!temp.some((p) => p._id === c._id)) {
            temp.push(c);
          }
          return temp;
        });
      });
    const totalArea = res?.data?.subPlots.reduce((a, b) => a + b.area, 0);
    const totalAreaSold = res?.data?.subPlots
      .filter((l) => l.sold)
      .reduce((a, b) => a + b.area, 0);
    const totalAreaInDiscussion = res?.data?.subPlots
      .filter(
        (p) =>
          !p.sold &&
          p.leadsInfo.some(
            (l) => l.leadType === 'Discussions' || l.leadType === 'New Lead'
          )
      )
      .reduce((a, b) => a + b.area, 0);
    const totalAreaInNegotiation = res?.data?.subPlots
      .filter(
        (p) => !p.sold && p.leadsInfo.some((l) => l.leadType === 'Negotiations')
      )
      .reduce((a, b) => a + b.area, 0);
    const totalAreaLeadsWons = res?.data?.subPlots
      .filter(
        (p) => !p.sold && p.leadsInfo.some((l) => l.leadType === 'Lead Won')
      )
      .reduce((a, b) => a + b.area, 0);
    const totalPlots = res?.data?.subPlots.length;
    const totalPlotsSoldOut = res?.data?.subPlots.filter((l) => l.sold).length;
    const totalPlotsInDiscussion = res?.data?.subPlots.filter(
      (p) =>
        !p.sold &&
        p.leadsInfo.some(
          (l) => l.leadType === 'Discussions' || l.leadType === 'New Lead'
        )
    ).length;
    const totalPlotsInNegotiation = res?.data?.subPlots.filter(
      (p) => !p.sold && p.leadsInfo.some((l) => l.leadType === 'Negotiations')
    ).length;
    const totalPlotsLeadsWons = res?.data?.subPlots.filter(
      (p) => !p.sold && p.leadsInfo.some((l) => l.leadType === 'Lead Won')
    ).length;
    setTotalPlotArea(totalArea);
    setPlotAreaSoldOut(totalAreaSold);
    setPlotAreaInNegotiation(totalAreaInNegotiation);
    setPlotAreaLeadsWon(totalAreaLeadsWons);
    setPlotAreaUnderDiscussion(totalAreaInDiscussion);
    setTotalPlots(totalPlots);
    setTotalPlotsSoldOut(totalPlotsSoldOut);
    setTotalPlotsInDiscussion(totalPlotsInDiscussion);
    setTotalPlotsInNegotiation(totalPlotsInNegotiation);
    setTotalPlotsLeadsWon(totalPlotsLeadsWons);
    setIsLoading(false);
  };

  const editProject = async () => {
    await httpService.put(`/project/${projectToEdit._id}`, projectToEdit);
    fetchProjectDetails();
    document.querySelectorAll('.close')?.forEach((e) => e.click());
  };

  const handleSubPlotFile = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('layout', file);
    toast
      .promise(
        httpService
          .post(`/project/${projectDetails._id}/landDivision/csv`, formData)
          .catch(() => {
            toast.error('Something went wrong');
          }),
        {
          error: 'Something went wrong',
          success: 'Plot deatils updated successfully',
          pending: 'Updating Plot Deatils',
        }
      )
      .then(() => {
        fetchProjectDetails();
      });
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
          <div
            className="page-header"
            style={{
              marginBottom: '1rem',
            }}
          >
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
          <Stack
            sx={{
              marginBottom: '1rem',
            }}
            direction="row"
            spacing={1}
          >
            <Chip label={`Total Plots (${totalPlots})`} color="warning" />
            <Chip
              label={`Plots under Negotiations(${totalPlotsInNegotiation})`}
              color="primary"
            />
            <Chip
              label={`Plots under Discussions(${totalPlotsInDiscussion})`}
              color="secondary"
            />
            <Chip label={`Leads Won(${totalPlotsLeadsWon})`} color="error" />
            <Chip label={`Plots Sold(${totalPlotsSoldOut})`} color="info" />
            {/* <Chip
              onClick={() => {
                setShowPlotsBreakdown(true);
              }}
              label="Detailed Breakdown"
              sx={{
                cursor: 'pointer',
              }}
              color="success"
            /> */}
          </Stack>

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
                          const markers = projectDetails.subPlots?.map((p) => ({
                            ...p,
                            component: JSON.parse(p.component),
                          }));
                          markers.map((m) => {
                            m.component.x =
                              imgRef.current.getBoundingClientRect().x +
                              m.component.x;
                            m.component.y =
                              imgRef.current.getBoundingClientRect().y +
                              m.component.y;
                            return m;
                          });
                          setMarkers(markers);
                        }, 200);
                      }}
                      href="#layout"
                      data-toggle="tab"
                      className="nav-link"
                    >
                      Project Layout
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      onClick={() => {}}
                      href="#subPlot"
                      data-toggle="tab"
                      className="nav-link"
                    >
                      Sub Plots
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#leads" data-toggle="tab" className="nav-link">
                      Leads
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#customers" data-toggle="tab" className="nav-link">
                      Customers
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
                          <tr>
                            <td>Total subplots:</td>
                            <td className="text-right">
                              {projectDetails?.subPlots?.length}
                            </td>
                          </tr>
                          <tr>
                            <td>Subplots sold:</td>
                            <td className="text-right">
                              {
                                projectDetails?.subPlots?.filter((l) => l.sold)
                                  .length
                              }
                            </td>
                          </tr>
                          <tr>
                            <td>Subplots under discussion:</td>
                            <td className="text-right">
                              {
                                projectDetails?.subPlots?.filter(
                                  (l) => l.leads?.length
                                ).length
                              }
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="card project-user">
                    <div className="card-body">
                      <h6 className="card-title m-b-20">Leads</h6>
                      <ul className="list-box">
                        {projectDetails?.leads
                          .filter(
                            (lead) =>
                              lead.status !== 'Lead Won' &&
                              lead.status !== 'Lead Lost'
                          )
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
              <h2 className="card-title mb-0 h-100 mt-2">Project Layout</h2>
              <hr />
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                }}
              >
                {legends.map((legend, index) => (
                  <div
                    key={index}
                    style={{
                      marginRight: '10px',
                    }}
                  >
                    <div
                      style={{
                        background: legend.color,
                        display: 'inline-block',
                        width: '10px',
                        height: '10px',
                      }}
                    ></div>{' '}
                    {legend.name}
                  </div>
                ))}
              </div>
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
                {projectDetails?.layout && updatedPaths && (
                  <div className="card-body">
                    <div className="clearfix">
                      {
                        projectDetails?.subPlots?.filter((e) => !e.component)
                          .length
                      }{' '}
                      more plot(s) need to be mapped
                      <button
                        className="btn add-btn"
                        style={{
                          marginLeft: 'auto',
                        }}
                        onClick={() => {
                          if (
                            projectDetails?.subPlots?.filter(
                              (e) => !e.component
                            ).length
                          ) {
                            toast.error(
                              'All plots needs to be mapped before saving'
                            );
                            return;
                          }
                          updateProjectPaths();
                        }}
                      >
                        Save Layout
                      </button>
                    </div>
                    <img
                      ref={layoutImageRef}
                      src={projectDetails?.layout}
                      draggable="false"
                      useMap="#layoutMap"
                      onLoad={(e) => {
                        layoutImageRef.current.addEventListener(
                          'click',
                          (e) => {
                            Swal.fire({
                              title: 'Enter plot name',
                              input: 'text',
                              preConfirm: (value) => {
                                return new Promise((resolve) => {
                                  setTimeout(() => {
                                    if (value === '') {
                                      resolve(
                                        Swal.showValidationMessage(
                                          'Please enter a name'
                                        )
                                      );
                                    } else {
                                      resolve();
                                    }
                                  }, 400);
                                });
                              },
                            }).then((result) => {
                              if (result.isConfirmed) {
                                const temp = projectDetails.subPlots;
                                temp.find(
                                  (v) => v.name === result.value
                                ).component = JSON.stringify({
                                  x: e.offsetX,
                                  y: e.offsetY,
                                });
                                setProjectDetails({
                                  ...projectDetails,
                                  subPlots: temp,
                                });
                                setCoordinates((c) => [
                                  ...c,
                                  {
                                    x: e.offsetX,
                                    y: e.offsetY,
                                    name: result.value,
                                  },
                                ]);
                              }
                            });
                          }
                        );
                      }}
                      className="layout-image"
                    />
                    <map name="layoutMap"></map>
                    <br />
                    {projectDetails.subPlots.map((plot, index) =>
                      plot.component ? (
                        <InactiveTooltip key={index} title={plot.name}>
                          <div
                            onClick={() => {
                              setPlotInfoBackdrop(true);
                              setPlotInfo(plot);
                            }}
                            className="pin"
                            style={{
                              position: 'absolute',
                              top:
                                window.scrollY +
                                layoutImageRef.current.getBoundingClientRect()
                                  .y +
                                JSON.parse(plot.component).y,
                              left:
                                window.scrollX +
                                layoutImageRef.current.getBoundingClientRect()
                                  .x -
                                220 +
                                JSON.parse(plot.component).x,
                              background: '#EF473A',
                            }}
                          ></div>
                        </InactiveTooltip>
                      ) : (
                        <></>
                      )
                    )}
                  </div>
                )}
                {projectDetails.subPlots && !updatedPaths && (
                  <div className="card-body">
                    <img
                      ref={imgRef}
                      src={projectDetails?.layout}
                      draggable="false"
                      useMap="#layoutMap"
                      className="layout-image"
                      onLoad={(e) => {
                        setImageReady(true);
                      }}
                    />
                    {imageReady &&
                      markers?.map((plot, index) =>
                        plot.component ? (
                          <>
                            {plot.leadsInfo.length === 0 && !plot.sold && (
                              <InactiveTooltip key={index} title={plot.name}>
                                <div
                                  onClick={() => {
                                    setPlotInfoBackdrop(true);
                                    setPlotInfo(plot);
                                  }}
                                  className="pin"
                                  style={{
                                    position: 'absolute',
                                    top: plot.component.y - 7,
                                    left: -220 + plot.component.x,
                                    background: '#EF473A',
                                  }}
                                ></div>
                              </InactiveTooltip>
                            )}
                            {plot.leadsInfo.some(
                              (l) =>
                                l.leadType == 'Discussions' ||
                                l.leadType == 'New Lead'
                            ) &&
                              !plot.sold && (
                                <InDisscussionTooltip
                                  key={index}
                                  title={plot.name}
                                >
                                  <div
                                    onClick={() => {
                                      setPlotInfoBackdrop(true);
                                      setPlotInfo(plot);
                                    }}
                                    className="pin"
                                    style={{
                                      position: 'absolute',
                                      top: plot.component.y - 7,
                                      left: -220 + plot.component.x,
                                      background: '#FFF700',
                                    }}
                                  ></div>
                                </InDisscussionTooltip>
                              )}
                            {plot.leadsInfo.some(
                              (l) => l.leadType == 'Negotiations'
                            ) &&
                              !plot.sold && (
                                <InNegotiationTooltip
                                  key={index}
                                  title={plot.name}
                                >
                                  <div
                                    onClick={() => {
                                      setPlotInfoBackdrop(true);
                                      setPlotInfo(plot);
                                    }}
                                    className="pin"
                                    style={{
                                      position: 'absolute',
                                      top: plot.component.y - 7,
                                      left: -220 + plot.component.x,
                                      background: '#89CFF0',
                                    }}
                                  ></div>
                                </InNegotiationTooltip>
                              )}
                            {plot.leadsInfo.some(
                              (l) => l.leadType == 'Lead Won'
                            ) &&
                              !plot.sold && (
                                <LeadsWontTooltip key={index} title={plot.name}>
                                  <div
                                    onClick={() => {
                                      setPlotInfoBackdrop(true);
                                      setPlotInfo(plot);
                                    }}
                                    className="pin"
                                    style={{
                                      position: 'absolute',
                                      top: plot.component.y - 7,
                                      left: -220 + plot.component.x,
                                      background: '#9A66CB',
                                    }}
                                  ></div>
                                </LeadsWontTooltip>
                              )}
                            {plot.sold && (
                              <SoldOutTooltip key={index} title={plot.name}>
                                <div
                                  onClick={() => {
                                    setPlotInfoBackdrop(true);
                                    setPlotInfo(plot);
                                  }}
                                  className="pin"
                                  style={{
                                    position: 'absolute',
                                    top: plot.component.y - 7,
                                    left: -220 + plot.component.x,
                                    background: '#4CBB17',
                                  }}
                                ></div>
                              </SoldOutTooltip>
                            )}
                          </>
                        ) : (
                          <></>
                        )
                      )}
                    <br />
                  </div>
                )}
              </div>
            </div>
            <div className="tab-pane fade" id="subPlot">
              <h2 className="card-title mb-0 h-100 mt-2">Sub Plots</h2>
              <hr />
              <div className="row">
                {projectDetails.subPlots.length === 0 && (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <input
                      type={'file'}
                      onChange={handleSubPlotFile}
                      style={{
                        display: 'none',
                      }}
                    />
                    <button
                      onClick={(e) => {
                        e.target.previousSibling.click();
                      }}
                      className="btn btn-primary"
                    >
                      Add Plots Details
                    </button>
                  </div>
                )}
                {projectDetails.subPlots.length > 0 && (
                  <PlotsTable plots={projectDetails?.subPlots || []} />
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
                {projectDetails?.leads
                  .filter(
                    (l) => l.status !== 'Lead Won' && l.status !== 'Lead Lost'
                  )
                  .map((lead) => (
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
            <div id="customers" className="tab-pane fade">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <h3>Customers</h3>
              </div>
              <div
                className="row"
                style={{
                  padding: '15px',
                }}
              >
                {customerPurchases.map((customer) => (
                  <div
                    key={customer._id}
                    className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3"
                  >
                    <div className="profile-widget">
                      <div className="profile-img">
                        <Link
                          to={`/app/profile/lead-profile/${customer._id}`}
                          className="avatar"
                        >
                          <img src={''} alt="" />
                        </Link>
                      </div>
                      <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                        <Link to="/app/profile/employee-profile">
                          {customer.name}
                        </Link>
                      </h4>
                      <div className="small text-muted">{customer.phone}</div>
                      <div className="small text-muted">{customer.email}</div>
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
                width: '40%',
                minHeight: '50%',
                maxHeight: '50%',
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '30px',
                overflow: 'auto',
              }}
            >
              <h3
                style={{
                  textAlign: 'center',
                }}
              >
                {plotInfo.name}
              </h3>
              <div className="card tab-box">
                <div className="row user-tabs">
                  <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
                    <ul className="nav nav-tabs nav-tabs-bottom">
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
              <div
                className="tab-content"
                style={{
                  paddingTop: '4px',
                }}
              >
                {/* {activeInfoTab === 1 && (
                  <div id="info" className="">
                    <div>
                      <h4>
                        <b>Plot Name</b>: <span>{plotInfo.name}</span>
                      </h4>
                      <h4>
                        <b>Plot Size</b>: <span>{plotInfo.area} Sq Feet</span>
                      </h4>
                      <h4>
                        <b>Plot Cost</b>:{' '}
                        <span>
                          {plotInfo.cost ||
                            plotInfo.area * projectDetails.estimatedCost}
                        </span>
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
                    </div>
                  </div>
                )} */}
                {activeInfoTab === 2 && (
                  <div id="lead" className="">
                    <Box sx={{ margin: 1 }}>
                      <Table size="small" aria-label="purchases">
                        {plotInfo.leadsInfo?.length > 0 && (
                          <TableHead>
                            <TableRow>
                              <TableCell>Lead</TableCell>
                              <TableCell>Email</TableCell>
                              <TableCell>Phone</TableCell>
                              <TableCell>Status</TableCell>
                              <TableCell>Managed By (Employee ID)</TableCell>
                            </TableRow>
                          </TableHead>
                        )}
                        <TableBody>
                          {plotInfo.leadsInfo?.length === 0 && (
                            <h4
                              style={{
                                textAlign: 'center',
                                marginTop: '1rem',
                                marginBottom: '1rem',
                              }}
                            >
                              No Leads
                            </h4>
                          )}
                          {plotInfo.leadsInfo?.map((r) => (
                            <TableRow key={r.lead._id}>
                              <TableCell component="th" scope="row">
                                {r.lead.name}
                              </TableCell>
                              <TableCell>{r.lead.email}</TableCell>
                              <TableCell>{r.lead.phone}</TableCell>
                              <TableCell>{r.leadType}</TableCell>
                              <TableCell>{r.lead.assignedTo}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
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
      <Backdrop
        open={showPlotsBreakdown}
        sx={{
          zIndex: 999999999999,
        }}
        onClick={() => {
          setShowPlotsBreakdown(false);
        }}
      >
        <div
          style={{
            width: '90%',
            height: '90%',
            background: 'white',
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <PlotsBreakdown subPlots={projectDetails.subPlots} />
        </div>
      </Backdrop>
      {/* /Edit Project Modal */}
    </div>
  );
};

export default ProjectView;
