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

import { Input, Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from '../paginationfunction';
import '../antdstyle.css';
import {
  fetchTicket,
  addTicket,
  fetchdepartment,
  updateTicket,
  deleteTicket,
  fetchSingleTicket,
<<<<<<< HEAD
  allemployee,
  fetchJobs,
=======
>>>>>>> f0f52c57a1b3ee0f2387c66e4405668a8a2da156
} from '../../lib/api';

const AddTicket = (props) => {
  const form = useRef();
  const btn = useRef();
  
  const resetForm = () => {
    form.current.reset();
    btn.current.innerHTML = 'Submit';
<<<<<<< HEAD
    //--------close modal---------//

    
    //--------close modal---------//
    props.setRerender(!props.rerender);
=======
>>>>>>> f0f52c57a1b3ee0f2387c66e4405668a8a2da156
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTicket = {};
    btn.current.innerHTML = 'Submitting...';
    newTicket.title = e.target.subject.value;
    newTicket.staffAssigned = e.target.staffAssigned.value;
    newTicket.client = e.target.client.value;
    newTicket.priority = e.target.priority.value;
    newTicket.description = e.target.description.value;
    newTicket.assign = e.target.assign.value;
    newTicket.followers = e.target.followers.value;
    newTicket.status = 'active';
<<<<<<< HEAD

    console.log("In submit!");
    
=======
    newTicket.assignee = 1;
    newTicket.department = '61fd4680741b1b5504df7d0d';

    //File Upload not working
    newTicket.file = e.target.file.value;
>>>>>>> f0f52c57a1b3ee0f2387c66e4405668a8a2da156
    let res;
    try {
      res = await addTicket(newTicket);
    } catch (err) {
      console.log(err);
    }
    btn.current.innerHTML = 'Submitted!';
    console.log(res);
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
<<<<<<< HEAD
          
=======
>>>>>>> f0f52c57a1b3ee0f2387c66e4405668a8a2da156
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
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
<<<<<<< HEAD
                  <label>Assign To</label>
                  <select className="select" name="assignTo">
                    {props.employee.map((emp) => <option>{emp.userName}</option>)}
                  </select>
                  </div>
                </div>

              </div>
              <div className="row">
              <div className="col-sm-6">
              <div className="form-group">
              <label>Department</label>
              <select className="select" name="assignTo">
                    {/*props.departments.map((dep) => <option>{dep.name}</option>)*/}
              </select>
              </div>
              </div>
=======
                    <label>Ticket Id</label>
                    <input
                      className="form-control"
                      type="text"
                      name="ticketId"
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
>>>>>>> f0f52c57a1b3ee0f2387c66e4405668a8a2da156
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
                    <select className="select" name="priority">
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                </div>
<<<<<<< HEAD
=======
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>CC</label>
                    <input className="form-control" type="text" name="cc" />
                  </div>
                </div>
>>>>>>> f0f52c57a1b3ee0f2387c66e4405668a8a2da156
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
<<<<<<< HEAD
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
=======
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
>>>>>>> f0f52c57a1b3ee0f2387c66e4405668a8a2da156
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
<<<<<<< HEAD
                <button className="btn btn-primary" ref={btn}
                  aria-label="Close"
                  type='submit'
                >
=======
                <button className="btn btn-primary submit-btn" ref={btn}>
>>>>>>> f0f52c57a1b3ee0f2387c66e4405668a8a2da156
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

<<<<<<< HEAD

const SearchTicket = ({setData, data}) => {

  const handleClick = (event) => {
    event.preventDefault();
    console.log(data);

    const title = document.getElementById("empIdSearch").value.toLowerCase();
    if (title != "") {
      const result = data.filter((obj) => {
        return obj.title.toLowerCase() == title;
      });
    }
    
    //const title = document.getElementById("searchStatue").value.toLowerCase();

    // const result = data.filter((obj) => {
    //   return obj.title.toLowerCase() == title;
    // });

    console.log("result");
    setData(result);
  }

=======
const EditTicket = ({ selectedTicketData, department }) => {
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
    newTicket.assignee = 1;
    newTicket.department = department;

    //File Upload not working
    newTicket.file = e.target.file.value;
    let res;
    try {
      res = await updateTicket(selectedTicketData._id, newTicket);
    } catch (err) {
      console.log(err);
    }
    btn.current.innerHTML = 'Submitted!';
    console.log(res);
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
                    <input className="form-control" type="text" name="cc" />
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
>>>>>>> f0f52c57a1b3ee0f2387c66e4405668a8a2da156
  return (
    <div className="row filter-row">
      <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
        <div className="form-group form-focus focused">
          <input id="empIdSearch" type="text" defaultValue="" className="form-control floating" />
          <label className="focus-label">Employee Name</label>
        </div>
      </div>
      <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
        <div className="form-group form-focus select-focus">
          <select className="select floating" id="searchStatue">
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
        <a href="#" className="btn btn-success btn-block" onClick={handleClick}>
          Search
        </a>
      </div>
    </div>
  );
<<<<<<< HEAD
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

=======
};
>>>>>>> f0f52c57a1b3ee0f2387c66e4405668a8a2da156

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
<<<<<<< HEAD

const EditTicket = ({selectedTicketData, rerender, setRerender}) => {
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
      console.log(res);
      setRerender(!rerender);
    } catch (err) {
      console.log(err);
    }
    btn.current.innerHTML = 'Submitted!';
    console.log(res);
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
                    <input className="form-control" type="text" name="cc"
                    defaultValue={selectedTicketData?.cc
                        ? selectedTicketData.cc
                      : ''
                    }
                    />
                    
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Assign</label>
                    <input type="text" className="form-control" name="assign"
                    />
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


const TicketTracker = ({data}) => {

  

=======

const TicketTracker = () => {
>>>>>>> f0f52c57a1b3ee0f2387c66e4405668a8a2da156
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
              <h3 className="mb-3">{data[0]}</h3>
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
              <h3 className="mb-3">{data[1]}</h3>
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
                  <span className="d-block">Open Tickets</span>
                </div>
                <div>
                  <span className="text-danger">-2.8%</span>
                </div>
              </div>
              <h3 className="mb-3">{data[2]}</h3>
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
              <h3 className="mb-3">{data[3]}</h3>
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

const Tickets = () => {
  const [data, setData] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [ticketStatus, setTicketStatus] = useState([0,0,0,0]);


  const resolveTicket = (arr) => {
    let pending = 0;
    arr.forEach((obj) => {
      if (obj.status.toLowerCase() == 'active') {
        pending++;
      }
    });
    return [0,0,0,pending];
  }

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
    (async () => {
      const res = await fetchTicket();
<<<<<<< HEAD
      setData(res.data);
      setTicketStatus(resolveTicket(res.data));
      const emp = await allemployee();
      setEmployee(emp);
      const dep = fetchdepartment();
      setDepartments(dep);
      console.log(dep.data);

    })();
  }, [rerender]);
=======
      setData(
        res.data.map((d) => ({
          ...d,
          assigneeName: d.assignee.firstName + d.assignee.lastName,
          departmentName: d.department.name,
        }))
      );
      console.log('------All Tickets------');
      console.log(data);
      console.log('-----------------------');
    })();
  }, []);
>>>>>>> f0f52c57a1b3ee0f2387c66e4405668a8a2da156

  const [selectedTicketData, setSelectedTicketData] = useState({});

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
<<<<<<< HEAD
      sorter: (a, b) =>  a.title < b.title,
=======
      //sorter: (a, b) => a.id.length - b.id.length,
>>>>>>> f0f52c57a1b3ee0f2387c66e4405668a8a2da156
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
          <Link to="/app/profile/employee-profile">{`${text.firstName} ${text.lastName}`}</Link>
        </h2>
      ),
<<<<<<< HEAD
      sorter: (a, b) => a.assignee.firstName < b.assignee.firstName
    },
    {
      title: 'Department',
      dataIndex: 'department',
      render: (text, record) => <p>{text}</p>,
      sorter: (a, b) => a.department < b.department
=======
    },
    {
      title: 'Department',
      dataIndex: 'departmentName',
      render: (text, record) => <p>{text}</p>,
      sorter: (a, b) => a.createddate.length - b.createddate.length,
>>>>>>> f0f52c57a1b3ee0f2387c66e4405668a8a2da156
    },
    {
      title: 'Last Reply',
      dataIndex: 'updatedAt',
      render: (text, record) => <p>{text}</p>,
      sorter: (a, b) => {return a.updatedAt < b.updatedAt}
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
<<<<<<< HEAD
              onClick={() => {
                console.log("setSelectedTicketData()");
=======
              onClick={(e) => {
                console.log(record);
>>>>>>> f0f52c57a1b3ee0f2387c66e4405668a8a2da156
                setSelectedTicketData(record);
              }}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a
              className="dropdown-item"
              // href="#"
              // data-toggle="modal"
              // data-target="#delete_ticket"
              onClick={async () => {
                console.log("setSelectedTicketData()");
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
<<<<<<< HEAD

=======
>>>>>>> f0f52c57a1b3ee0f2387c66e4405668a8a2da156

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Tickets </title>
        <meta name="description" content="Login page" />
      </Helmet>

      {/* Page Content */}
      <div className="content container-fluid">
        <TicketHeader />

<<<<<<< HEAD
        <TicketTracker data={ticketStatus} />

        <SearchTicket data={data} setData={setData}/>
=======
        <TicketTracker />

        <SearchTicket />
>>>>>>> f0f52c57a1b3ee0f2387c66e4405668a8a2da156

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
                onChange={console.log('change')}
              />
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}

<<<<<<< HEAD
      <AddTicket setRerender={setRerender} rerender={rerender} employee={employee}/>

      <EditTicket selectedTicketData={selectedTicketData} setRerender={setRerender} departments={departments} rerender={rerender}/>
=======
      <AddTicket />

      <EditTicket selectedTicketData={selectedTicketData} />
>>>>>>> f0f52c57a1b3ee0f2387c66e4405668a8a2da156

      <DeleteTicket id={selectedTicketData?._id} />
    </div>
  );
};

export default Tickets;
