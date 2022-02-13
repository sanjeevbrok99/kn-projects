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
  const [ticketStats, setTicketStats] = useState([0, 0, 0]);
  const [selectedTicketData, setSelectedTicketData] = useState({});


  useEffect(() => {
    if ($('.select').length > 0) {
      $('.select').select2({
        minimumResultsForSearch: -1,
        width: '100%',
      });
    }
  });

  const updateTracker = (data) => {
    console.log(data);
    let a=0, b=0, c=0;
    data.forEach((ticket) => {
      if (ticket.status.toLowerCase() == 'active') c++;
      else b++;

      let date = new Date(ticket.updatedAt);
      let dateNow = Date.now();
      date = date.setDate(date.getDate() + 1);

      if (date >= dateNow) {
        a++;
      } else { 
        console.log("not");
      }
      
    });
    console.log(a,b,c);
    setTicketStats([a,b,c]);
  }

  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    (
      async () => {
        
        const res = await fetchTicket();
        setData(res.data);
        updateTracker(res.data);
        
        const res_d = await fetchdepartment();
        setDepartment(res_d);
        
        const res_c = await fetchClient();
        setClient(res_c);

        const res_e = await allemployee();
        setEmployees(res_e);
      
      }
    )();
  }, [rerender]);
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
      dataIndex: 'assignee',
      render: (text, record) => (
        <h2 className="table-avatar">
          <Link to="/app/profile/employee-profile"><p>{text.firstName}</p></Link>
        </h2>
      ),
      sorter: (a, b) => a.assignee.firstName < b.assignee.firstName,
    },
    {
      title: 'Department',
      dataIndex: 'department',
      render: (text, record) => <p>{text?.name}</p>,
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

        <TicketTracker ticketStats={ticketStats} />

        <SearchTicket
          setRerender={setRerender}
          rerender={rerender}
          data={data}
          setData={setData}
        />

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
        department={department}
        client={client}
        employees={employees}
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
    $('#add_ticket').modal('hide')
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
    newTicket.client = e.target.client.value;
    newTicket.followers = e.target.followers.value;
    newTicket.assignee = e.target.assignee.value;

    try {
      await addTicket(newTicket);
    } catch (err) {
      console.log(err);
    }
    btn.current.innerHTML = 'Submitted!';
    resetForm();
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
                            <option value={client._id}>{`${client.firstName} ${client.lastName}`}</option>
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
                            <option value={emp._id}>{`${emp.firstName} ${emp.lastName}`}</option>
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
                            <option value={dep._id}>{dep.name}</option>
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
                            <option value={emp._id}>{`${emp.firstName} ${emp.lastName}`}</option>
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

const SearchTicket = ({setData}) => {

  const handleSearch = async () => { 
    const { data } = await fetchTicket();
    const title = document.getElementById('ticket-title-search').value
    const employeeName = document.getElementById('ticket-search-empname').value
    const statue = document.getElementById('search-filter-status').value;
    const priority = document.getElementById('search-filter-priority').value;
    
    let result = data;

    if (title != '') {
        result = data.filter(ticket => {
        return ticket.title === title
      });
    }

    if (employeeName !== '') {
      result = result.filter(ticket => {
        if (ticket.assignee.firstName === employeeName || ticket.assignee.lastName === employeeName || `${ticket.assignee.firstName} ${ticket.assignee.lastName}` == employeeName) {
          return true;
        } else {
          return false;
        }
      });
    }

    if (statue != '') {
      result = result.filter(ticket => {
        return ticket.status == statue;
      });
    }

    if (priority != '') {
      result = result.filter(ticket => {
        return ticket.priority == priority;
      });
    }
    setData(result);
  }

  return (
    <div className="row filter-row">
     <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
        <div className="form-group form-focus focused">
          <input type="text" className="form-control floating" id='ticket-title-search'/>
          <label className="focus-label">Title</label>
        </div>
      </div>
      <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
        <div className="form-group form-focus focused">
          <input type="text" className="form-control floating" id='ticket-search-empname' />
          <label className="focus-label">Employee Name</label>
        </div>
      </div>
      <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
        <div className="form-group form-focus select-focus">
          <select className="select floating" id="search-filter-status">
            <option></option>
            <option> Active </option>
            <option> Approved </option>
            <option> Returned </option>
          </select>
          <label className="focus-label">Status</label>
        </div>
      </div>
      <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
        <div className="form-group form-focus select-focus">
          <select className="select floating" id='search-filter-priority'>
            <option></option>
            <option> High </option>
            <option> Low </option>
            <option> Medium </option>
          </select>
          <label className="focus-label">Priority</label>
        </div>
      </div>
      <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12" onClick={handleSearch}>
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

const TicketTracker = ({ticketStats}) => {
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
              </div>
              <h3 className="mb-3">{ticketStats[0]}</h3>
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
              </div>
              <h3 className="mb-3">{ticketStats[1]}</h3>
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
              </div>
              <h3 className="mb-3">{ticketStats[2]}</h3>
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

const EditTicket = ({ selectedTicketData, rerender, setRerender, client, department, employees}) => {
  const form = useRef();
  const btn = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTicket = {};
    btn.current.innerHTML = 'Submitting...';
    newTicket.title = e.target.title.value;
    newTicket.status = e.target.status.value;
    newTicket.priority = e.target.priority.value;
    newTicket.description = e.target.description.value;
    newTicket.department = e.target.department.value;
    newTicket.client = e.target.client.value;
    newTicket.followers = e.target.followers.value;
    newTicket.assignee = Number(e.target.assignee.value);
    try {
      let res = await updateTicket(selectedTicketData._id, newTicket);
      console.clear();
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
    btn.current.innerHTML = 'Submit';
    setRerender(!rerender);
    $('#edit_ticket').modal('hide')
  };

  return (
    <div id="edit_ticket" className="modal custom-modal fade" role="dialog">
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
                      defaultValue={selectedTicketData.title}
                    />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Status</label>
                    <select className="select" name="status"
                      value={selectedTicketData.status}
                    >
                      <option value="Active">Active</option>
                      <option value="Approved">Approved</option>
                      <option value="Returned">Returned</option>
                    </select>
                  </div>
                </div>
              </div>


              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      defaultValue={selectedTicketData.description}
                      name="description"
                    />
                  </div>

                </div>
              </div>

              <div className="row">
                
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Client</label>
                    <select className="select" name="client"
                      defaultValue={selectedTicketData.client?._id}>
                      {
                        client.map((client) => {
                          return (
                            <option value={client._id}>{`${client.firstName} ${client.lastName}`}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                </div>

              
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Priority</label>
                    <select className="select" name="priority" value={selectedTicketData.priority}>
                      <option value="High">High</option>
                      <option Value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Assign Staff</label>
                    <select className="select" name="assignee" value={selectedTicketData.assignee?._id}>
                      {
                        employees.map((emp) => {
                          return (
                            <option value={emp._id}>{`${emp.firstName} ${emp.lastName}`}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Department</label>
                    <select className="select" name="department" value={selectedTicketData.department?._id}>
                      {
                        department.map((dep) => {
                          return (
                            <option value={dep._id}>{dep.name}</option>
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
                    <select className="select" name="followers"  value={selectedTicketData.followers?._id}>
                      {
                        employees.map((emp) => {
                          return (
                            <option value={emp._id}>{`${emp.firstName} ${emp.lastName}`}</option>
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

export default Tickets;