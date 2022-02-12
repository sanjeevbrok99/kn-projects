
import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  Avatar_11,
  Avatar_09,
  Avatar_02,
  Avatar_10,
  Avatar_05,
} from '../../Entryfile/imagepath';

import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from '../paginationfunction';
import '../antdstyle.css';

import {
  fetchTicket,
  addTicket,
  updateTicket,
  deleteTicket,
  fetchSingleTicket,
  fetchdepartment,
  fetchClient,
  allemployee
} from '../../lib/api';


const Tickets = () => {
  const [data, setData] = useState([]);
  const [department, setDepartment] = useState([]);
  const [client, setClient] = useState([]);
  const [employees, setEmployees] = useState([]);


  useEffect(() => {
    if ($('.select').length > 0) {
      $('.select').select2({
        minimumResultsForSearch: -1,
        width: '100%',
      });
    }
  });

  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    (
      async () => {
        
        const res = await fetchTicket();
        setData(res.data);
        
        const res_d = await fetchdepartment();
        setDepartment(res_d);
        
        const res_c = await fetchClient();
        setClient(res_c);

        const res_e = await allemployee();
        setEmployees(res_e);
      
      }
    )();
  }, [rerender]);

  const [selectedTicketData, setSelectedTicketData] = useState({});

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      sorter: (a, b) => a.title < b.title,
      render: (text, record) => <p>{text}</p>,
    },
    {
      title: 'Ticket Id',
      dataIndex: '_id',
      render: (text, record) => (
        <Link
          onClick={() => localStorage.setItem('minheight', 'true')}
          to="/app/employees/ticket-view"
        >
          {text}
        </Link>
      ),
    },
    {
      title: 'Assigned Staff',
      dataIndex: 'assigneeName',
      render: (text, record) => (
        <h2 className="table-avatar">
          <Link to="/app/profile/employee-profile">{``}</Link>
        </h2>
      ),
      sorter: (a, b) => a.assignee.firstName < b.assignee.firstName,
    },
    {
      title: 'Department',
      dataIndex: 'department',
      render: (text, record) => <p>{text}</p>,
      sorter: (a, b) => a.department < b.department,
    },
    {
      title: 'Last Reply',
      dataIndex: 'updatedAt',
      render: (text, record) => <p>{text}</p>,
      sorter: (a, b) => {
        return a.updatedAt < b.updatedAt;
      },
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      render: (text, record) => <p>{text.toLowerCase()}</p>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => <p>{text}</p>,
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
              data-target="#edit_ticket"
              onClick={() => {
                setSelectedTicketData(record);
              }}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a
              className="dropdown-item"
              onClick={async () => {
                setSelectedTicketData(record);
                await deleteTicket(record._id);
                setRerender(!rerender);
              }}
            >
              <i className="fa fa-trash-o m-r-5" /> Delete
            </a>
          </div>
        </div>
      ),
    },
  ];

  const paginationControl = {
    total: data.length,
    showTotal: (total, range) =>
      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
    showSizeChanger: true,
    onShowSizeChange: onShowSizeChange,
    itemRender: itemRender,
  };

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Tickets </title>
        <meta name="description" content="Login page" />
      </Helmet>

      {/* Page Content */}
      <div className="content container-fluid">
        <TicketHeader />

        <TicketTracker />

        <SearchTicket />

        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <Table
                className="table-striped"
                pagination={paginationControl}
                style={{ overflowX: 'auto' }}
                columns={columns}
                dataSource={data}
                rowKey={(record) => record.id}
              />
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}

      <AddTicket
        setRerender={setRerender}
        rerender={rerender}
        department={department}
        client={client}
        employees={employees}
      />

      <EditTicket
        selectedTicketData={selectedTicketData}
        setRerender={setRerender}
        rerender={rerender}
      />

      <DeleteTicket id={selectedTicketData?._id} />
    </div>
  );
};



const AddTicket = (props) => {
  const form = useRef();
  const btn = useRef();

  const resetForm = () => {
    form.current.reset();
    btn.current.innerHTML = 'Submit';
    props.setRerender(!props.rerender);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTicket = {};
    btn.current.innerHTML = 'Submitting...';
    newTicket.title = e.target.title.value;
    newTicket.status = "Active";
    newTicket.priority = e.target.priority.value;
    newTicket.description = e.target.description.value;
    newTicket.department = e.target.department.value;
    newTicket.assignee = e.target.assignee.value;
    newTicket.followers = e.target.followers.value;
    newTicket.client = e.target.client.value;

    console.log(newTicket);
    try {
      //res = await addTicket(newTicket);
    } catch (err) {
      console.log(err);
    }
    btn.current.innerHTML = 'Submitted!';
    //resetForm();
  };

  return (
    <div id="add_ticket" className="modal custom-modal fade" role="dialog">
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Ticket</h5>
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
            <form ref={form} onSubmit={handleSubmit}>

              <div className="row">
                
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Ticket Title</label>
                    <input
                      className="form-control"
                      type="text"
                      name="title"
                    />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Status</label>
                      <option >active</option>
                  </div>
                </div>

              </div>


              <div className="row">
                
                <div className="col-sm-12">
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      defaultValue={''}
                      name="description"
                    />
                  </div>

                </div>
              </div>

              <div className="row">
                
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Client</label>
                    <select className="select" name="client">
                      {
                        props.client.map((client) => {
                          return (
                            <option data-id={client._id}>{`${client.firstName} ${client.lastName}`}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                </div>

              
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Priority</label>
                    <select className="select" name="priority">
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
                    <label>Assign Staff</label>
                    <select className="select" name="assignee">
                      {
                        props.employees.map((emp) => {
                          return (
                            <option selected>{`${emp.firstName} ${emp.lastName}`}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Department</label>
                    <select className="select" name="department">
                      {
                        props.department.map((dep) => {
                          return (
                            <option selected>{dep.name}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Add Followers</label>
                    <select className="select" name="followers">
                      {
                        props.employees.map((emp) => {
                          return (
                            <option id={emp._id}>{`${emp.firstName} ${emp.lastName}`}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                </div>
                <div className="form-group">
                <label>Upload Files</label>
                <input className="form-control" type="file" name="file" />
              </div>
              </div>
          
           
              <div className="submit-section">
                <button
                  className="btn btn-primary"
                  ref={btn}
                  aria-label="Close"
                  type="submit"
                >
                  Submit
                </button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const DeleteTicket = (props) => {
  const handleDelete = async () => {
    const res = await deleteTicket(props.id);
  };
  return (
    <div className="modal custom-modal fade" id="delete_ticket" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="form-header">
              <h3>Delete Ticket</h3>
              <p>Are you sure want to delete ticket with id {props.id}?</p>
            </div>
            <div className="modal-btn delete-action">
              <div className="row">
                <div className="col-6">
                  <a
                    className="btn btn-primary continue-btn"
                    onClick={handleDelete}
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
  );
};

const SearchTicket = () => {
  return (
    <div className="row filter-row">
      <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
        <div className="form-group form-focus focused">
          <input type="text" className="form-control floating" />
          <label className="focus-label">Employee Name</label>
        </div>
      </div>
      <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
        <div className="form-group form-focus select-focus">
          <select className="select floating">
            <option> -- Select -- </option>
            <option> Pending </option>
            <option> Approved </option>
            <option> Returned </option>
          </select>
          <label className="focus-label">Status</label>
        </div>
      </div>
      <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
        <div className="form-group form-focus select-focus">
          <select className="select floating">
            <option> -- Select -- </option>
            <option> High </option>
            <option> Low </option>
            <option> Medium </option>
          </select>
          <label className="focus-label">Priority</label>
        </div>
      </div>
      <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
        <div className="form-group form-focus select-focus">
          <div>
            <input
              className="form-control floating datetimepicker"
              type="date"
            />
          </div>
          <label className="focus-label">From</label>
        </div>
      </div>
      <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
        <div className="form-group form-focus select-focus">
          <div>
            <input
              className="form-control floating datetimepicker"
              type="date"
            />
          </div>
          <label className="focus-label">To</label>
        </div>
      </div>
      <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
        <a href="#" className="btn btn-success btn-block">
          Search
        </a>
      </div>
    </div>
  );
};

const TicketHeader = () => {
  return (
    <div className="page-header">
      <div className="row align-items-center">
        <div className="col">
          <h3 className="page-title">Tickets</h3>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/app/main/dashboard">Dashboard</Link>
            </li>
            <li className="breadcrumb-item active">Tickets</li>
          </ul>
        </div>
        <div className="col-auto float-right ml-auto">
          <a
            href="#"
            className="btn add-btn"
            data-toggle="modal"
            data-target="#add_ticket"
          >
            <i className="fa fa-plus" /> Add Ticket
          </a>
        </div>
      </div>
    </div>
  );
};

const TicketTracker = () => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card-group m-b-30">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <div>
                  <span className="d-block">New Tickets</span>
                </div>
                <div>
                  <span className="text-success">+10%</span>
                </div>
              </div>
              <h3 className="mb-3">112</h3>
              <div className="progress mb-2" style={{ height: '5px' }}>
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: '70%' }}
                  aria-valuenow={40}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <div>
                  <span className="d-block">Solved Tickets</span>
                </div>
                <div>
                  <span className="text-success">+12.5%</span>
                </div>
              </div>
              <h3 className="mb-3">70</h3>
              <div className="progress mb-2" style={{ height: '5px' }}>
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: '70%' }}
                  aria-valuenow={40}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <div>
                  <span className="d-block">Pending Tickets</span>
                </div>
                <div>
                  <span className="text-danger">-75%</span>
                </div>
              </div>
              <h3 className="mb-3">125</h3>
              <div className="progress mb-2" style={{ height: '5px' }}>
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: '70%' }}
                  aria-valuenow={40}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EditTicket = ({ selectedTicketData, rerender, setRerender }) => {
  const form = useRef();
  const btn = useRef();

  const resetForm = () => {
    form.current.reset();
    btn.current.innerHTML = 'Submit';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTicket = {};
    btn.current.innerHTML = 'Submitting...';
    newTicket.title = e.target.subject.value;
    newTicket.staffAssigned = e.target.staffAssigned.value;
    newTicket.client = e.target.client.value;
    newTicket.priority = e.target.priority.value;
    newTicket.cc = e.target.cc.value;
    newTicket.description = e.target.description.value;
    newTicket.assign = e.target.assign.value;
    newTicket.followers = e.target.followers.value;
    newTicket.status = 'active';
    //-----------------------------------------------//
    newTicket.assignee = selectedTicketData.assignee;
    newTicket.department = '61fd4680741b1b5504df7d0d';
    newTicket.file = e.target.file.value;
    //-----------------------------------------------//

    let res;
    try {
      res = await updateTicket(selectedTicketData._id, newTicket);
      setRerender(!rerender);
    } catch (err) {
      console.log(err);
    }
    btn.current.innerHTML = 'Submitted!';
    resetForm();
  };

  return (
    <div id="edit_ticket" className="modal custom-modal fade" role="dialog">
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Ticket</h5>
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
            <form ref={form} onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Ticket Subject</label>
                    <input
                      className="form-control"
                      type="text"
                      name="subject"
                      defaultValue={
                        selectedTicketData?.title
                          ? selectedTicketData.title
                          : ''
                      }
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Ticket Id</label>
                    <input
                      className="form-control"
                      type="text"
                      name="ticketId"
                      defaultValue={
                        selectedTicketData?._id ? selectedTicketData._id : ''
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Assign Staff</label>
                    <select className="select" name="staffAssigned">
                      <option>-</option>
                      <option>Shreya Singh</option>
                      <option>Harvinder</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Client</label>
                    <select className="select" name="client">
                      <option>-</option>
                      <option>Godrej Properties Ltd</option>
                      <option>International Software Inc</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Priority</label>
                    <input
                      className="form-control"
                      type="text"
                      name="priority"
                      defaultValue={
                        selectedTicketData?.priority
                          ? selectedTicketData.priority
                          : ''
                      }
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>CC</label>
                    <input
                      className="form-control"
                      type="text"
                      name="cc"
                      defaultValue={
                        selectedTicketData?.cc ? selectedTicketData.cc : ''
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Assign</label>
                    <input type="text" className="form-control" name="assign" />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Ticket Assignee</label>
                    <div className="project-members">
                      <a
                        title="Harvinder"
                        data-placement="top"
                        data-toggle="tooltip"
                        href="#"
                        className="avatar"
                      >
                        <img src={Avatar_02} alt="admin" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Add Followers</label>
                    <input
                      type="text"
                      className="form-control"
                      name="followers"
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Ticket Followers</label>
                    <div className="project-members">
                      <a
                        title="Shital Agarwal"
                        data-toggle="tooltip"
                        href="#"
                        className="avatar"
                      >
                        <img src={Avatar_09} alt="" />
                      </a>
                      <a
                        title="Harvinder"
                        data-toggle="tooltip"
                        href="#"
                        className="avatar"
                      >
                        <img src={Avatar_10} alt="" />
                      </a>
                      <a
                        title="Shreya Singh"
                        data-toggle="tooltip"
                        href="#"
                        className="avatar"
                      >
                        <img src={Avatar_05} alt="" />
                      </a>
                      <a
                        title="Wilmer Deluna"
                        data-toggle="tooltip"
                        href="#"
                        className="avatar"
                      >
                        <img src={Avatar_11} alt="" />
                      </a>
                      <span className="all-team">+2</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      defaultValue={''}
                      name="description"
                    />
                  </div>
                  <div className="form-group">
                    <label>Upload Files</label>
                    <input className="form-control" type="file" name="file" />
                  </div>
                </div>
              </div>
              <div className="submit-section">
                <button className="btn btn-primary submit-btn" ref={btn}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;