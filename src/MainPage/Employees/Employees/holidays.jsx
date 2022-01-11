import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  appendHolidayStore,
  setFetched,
  setHolidayStore,
} from '../../../features/holiday/holidaySlice';
import httpService from '../../../lib/httpService';
import { useAuthority } from '../../../hooks';

const Holidays = () => {
  const [data, setData] = React.useState([]);
  const fetched = useSelector((state) => state.holiday.fetched);
  const holidaysFromStore = useSelector((state) => state.holiday.value);
  const [leaveToAdd, setLeaveToAdd] = React.useState('');
  const [leaveDateToAdd, setLeaveDateToAdd] = React.useState('');
  const [holidayToModify, setHolidayToModify] = React.useState(null);
  const holidayWriteAuthority = useAuthority('HOLIDAY_CREATE');

  useEffect(() => {
    console.log(holidayWriteAuthority);
    (async () => {
      if (fetched) {
        setData(
          holidaysFromStore.map((holiday, i) => ({ ...holiday, id: i + 1 }))
        );
      } else {
        const res = await httpService.get('/private/holiday');
        setData(res.data.map((holiday, i) => ({ ...holiday, id: i + 1 })));
        setHolidayStore(res.data);
        setFetched(true);
      }
    })();
  }, []);

  const handleAdd = async () => {
    if (leaveToAdd && leaveDateToAdd) {
      console.log(leaveToAdd, leaveDateToAdd);
      const res = await httpService.post('/private/holiday', {
        title: leaveToAdd,
        date: leaveDateToAdd,
      });
      setData([...data, { ...res.data, id: data.length + 1 }]);
      appendHolidayStore(res.data);
      document.querySelectorAll('.close')?.forEach((e) => e.click());
    }
  };

  const handleDelete = async () => {
    const res = await httpService.delete(
      `/private/holiday/${holidayToModify.hoildayId}`
    );
    setData([
      ...data.slice(0, holidayToModify.id - 1),
      ...data.slice(holidayToModify.id).map((e) => ({ ...e, id: e.id - 1 })),
    ]);
    document.querySelectorAll('.cancel-btn')?.forEach((e) => e.click());
  };

  const handleEdit = async () => {
    const res = await httpService.put(
      `/private/holiday/${holidayToModify.hoildayId}`,
      {
        holidayId: holidayToModify.hoildayId,
        title: holidayToModify.title,
        date: holidayToModify.date,
      }
    );
    setData([
      ...data.slice(0, holidayToModify.id - 1),
      { ...res.data, id: holidayToModify.id },
      ...data.slice(holidayToModify.id),
    ]);
    document.querySelectorAll('.close')?.forEach((e) => e.click());
  };

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Holidays </title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Holidays</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Holidays</li>
              </ul>
            </div>
            {holidayWriteAuthority && (
              <div className="col-auto float-right ml-auto">
                <a
                  href="#"
                  className="btn add-btn"
                  data-toggle="modal"
                  data-target="#add_holiday"
                >
                  <i className="fa fa-plus" /> Add Holiday
                </a>
              </div>
            )}
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <table className="table table-striped custom-table mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title </th>
                    <th>Holiday Date</th>
                    <th>Day</th>
                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((holiday, i) => (
                    <tr key={i}>
                      <td>{holiday.id}</td>
                      <td>{holiday.title}</td>
                      <td>{holiday.date}</td>
                      <td>
                        {new Date(holiday.date).toLocaleString('en-us', {
                          weekday: 'long',
                        })}
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
                              data-target="#edit_holiday"
                              onClick={() => {
                                setHolidayToModify(holiday);
                              }}
                            >
                              <i className="fa fa-pencil m-r-5" /> Edit
                            </a>
                            <a
                              className="dropdown-item"
                              href="#"
                              data-toggle="modal"
                              data-target="#delete_holiday"
                              onClick={() => {
                                setHolidayToModify(holiday);
                              }}
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
      {/* Add Holiday Modal */}
      <div className="modal custom-modal fade" id="add_holiday" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Holiday</h5>
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
                  handleAdd();
                }}
              >
                <div className="form-group">
                  <label>
                    Holiday Name <span className="text-danger">*</span>
                  </label>
                  <input
                    onChange={(e) => setLeaveToAdd(e.target.value)}
                    className="form-control"
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label>
                    Holiday Date <span className="text-danger">*</span>
                  </label>
                  <div>
                    <input
                      className="form-control"
                      type={'date'}
                      onChange={(e) => setLeaveDateToAdd(e.target.value)}
                    />
                  </div>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Holiday Modal */}
      {/* Edit Holiday Modal */}
      <div className="modal custom-modal fade" id="edit_holiday" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Holiday</h5>
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
                  handleEdit();
                }}
              >
                <div className="form-group">
                  <label>
                    Holiday Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    defaultValue={holidayToModify?.title || ''}
                    onChange={(e) =>
                      setHolidayToModify({
                        ...holidayToModify,
                        title: e.target.value,
                      })
                    }
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label>
                    Holiday Date <span className="text-danger">*</span>
                  </label>
                  <div>
                    <input
                      className="form-control datetimepicker"
                      defaultValue={holidayToModify?.date || ''}
                      onChange={(e) =>
                        setHolidayToModify({
                          ...holidayToModify,
                          date: e.target.value,
                        })
                      }
                      type="date"
                    />
                  </div>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Edit Holiday Modal */}
      {/* Delete Holiday Modal */}
      <div
        className="modal custom-modal fade"
        id="delete_holiday"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Holiday</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete();
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
      {/* /Delete Holiday Modal */}
    </div>
  );
};

export default Holidays;
