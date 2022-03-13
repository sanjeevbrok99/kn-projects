/**
 * TermsCondition Page
 */
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { getACustomer } from './../../../lib/api/index';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from '../../paginationfunction';
import '../../antdstyle.css';
import httpService from '../../../lib/httpService';
import Swal from 'sweetalert2';
import { Backdrop } from '@mui/material';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import PhoneIcon from '@mui/icons-material/PhoneOutlined';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import AddressIcon from '@mui/icons-material/LocationOnOutlined';
import PersonIcon from '@mui/icons-material/PersonOutlined';

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

const Invoices = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if ($('.select').length > 0) {
      $('.select').select2({
        minimumResultsForSearch: -1,
        width: '100%',
      });
    }
    fetchInvoice();
  }, []);

  useEffect(() => {
    fetchInvoice();
  }, [props.invoice]);

  const handleDelete = async (id) => {
    console.log(id);
    Swal.fire({
      title: 'Delete Invoice',
      text: 'Are you sure you want to delete this invoice?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Proceed',
      preConfirm: () => {
        return httpService.delete(`/sale-invoice/${id}`);
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetchInvoice();
        Swal.fire(
          'Invoice Deleted',
          'Invoice has been deleted successfully',
          'success'
        );
      }
    });
  };

  const handleMarkAsPaid = async (invoice) => {
    Swal.fire({
      title: 'Mark as Paid',
      text: 'Are you sure you want to mark this invoice as paid?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Proceed',
      preConfirm: () => {
        return httpService.post(`/sale-payment`, {
          invoice: invoice._id,
          customer: invoice.customer._id,
          amount: invoice.total,
          paymentMode: 'Manual Record',
          paymentDate: new Date(),
        });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetchInvoice();
        Swal.fire(
          'Invoice Marked as Paid',
          'Invoice has been marked as paid successfully',
          'success'
        );
      }
    });
  };

  const fetchInvoice = async () => {
    console.log('========Inv Prop========');
    const invoices = props.invoice;
    console.log(invoices);

    setData(
      invoices?.map((invoice, index) => ({
        ...invoice,
        id: index + 1,
        invoicenumber: 'INV-' + invoice._id.toString().padStart(4, '0'),
        createddate: new Date(invoice.createdAt).toGMTString().substring(4, 16),
        duedate: new Date(invoice.invoiceDate).toGMTString().substring(4, 16),
        client: invoice.customer.name,
        amount: invoice.total,
        status:
          invoice.type === 'RECURRING'
            ? 'Monthly ' + invoice.status
            : invoice.status,
      }))
    );
  };

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      sorter: (a, b) => a.id.length - b.id.length,
    },
    {
      title: 'Invoice Number',
      dataIndex: 'invoicenumber',
      render: (text, record) => (
        <Link to={`/app/sales/invoices-view/${record._id}`}>#{text}</Link>
      ),
      sorter: (a, b) => a.invoicenumber.length - b.invoicenumber.length,
    },
    {
      title: 'Due Date',
      dataIndex: 'duedate',
      sorter: (a, b) => a.duedate.length - b.duedate.length,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (text, record) => <span>₹ {text}</span>,
      sorter: (a, b) => a.amount.length - b.amount.length,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => (
        <span
          className={
            text.includes('Paid')
              ? 'badge bg-inverse-success'
              : 'badge bg-inverse-info'
          }
        >
          {text}
        </span>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
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
              onClick={(e) => {
                e.preventDefault();
                console.log(record.status);
                if (record.status === 'Paid') {
                  Swal.fire('Invoice Paid already', '', 'success');
                  return;
                }
                handleMarkAsPaid(record);
              }}
              className="dropdown-item"
              href="#"
            >
              <i className="fa fa-file-pdf-o m-r-5" /> Mark Paid
            </a>
            <Link
              className="dropdown-item"
              to={`/app/sales/invoices-edit/${record._id}`}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </Link>
            <Link className="dropdown-item" to="/app/sales/invoices-view">
              <i className="fa fa-eye m-r-5" /> View
            </Link>
            <a className="dropdown-item" href="#">
              <i className="fa fa-file-pdf-o m-r-5" /> Download
            </a>
            <a
              onClick={(e) => {
                e.preventDefault();
                // console.log(record);
                handleDelete(record._id);
              }}
              className="dropdown-item"
              href="#"
            >
              <i className="fa fa-trash-o m-r-5" /> Delete
            </a>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="table-responsive">
          <Table
            className="table-striped"
            pagination={{
              total: data.length,
              showTotal: (total, range) =>
                `Showing ${range[0]} to ${range[1]} of ${total} entries`,
              showSizeChanger: true,
              onShowSizeChange: onShowSizeChange,
              itemRender: itemRender,
            }}
            style={{ overflowX: 'auto' }}
            columns={columns}
            dataSource={data}
            rowKey={(record) => record.id}
          />
        </div>
      </div>
    </div>
  );
};

const VendorProfile = () => {
  const [customer, setCustomer] = useState(null);
  const user = useSelector((state) => state.authentication.value.user);
  let { id } = useParams();
  const [addInvoiceModal, setAddInvoiceModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});
  const [selectedPlot, setSelectedPlot] = useState({});
  const [projects, setProjects] = useState([]);
  const fetchProjects = async () => {
    const res = await httpService.get('/project');
    setProjects(res.data);
  };
  const [isLoading, setIsLoading] = useState(true);
  async function fetchApi() {
    const res = await httpService.get('/vendor/' + id);
    setCustomer(res.data);
    setIsLoading(false);
  }

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  useEffect(() => {
    fetchApi();
    fetchProjects();
  }, []);

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Client Profile </title>
        <meta name="description" content="Reactify Blank Page" />
      </Helmet>
      {/* Page Content */}
      {isLoading ? (
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
      ) : (
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Profile</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Profile</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="card mb-0">
            <div className="card-body">
              <div className="row">
                <div className="col-12">
                  <Stack justifyContent={'space-between'} direction={'row'}>
                    <Stack direction={'row'} alignItems={'center'} spacing={1}>
                      <Avatar sx={{ bgcolor: red[400], height: 52, width: 52 }}>
                        {customer.name?.substr(0, 1)}
                      </Avatar>
                      <Stack>
                        <div
                          style={{
                            fontSize: '1.1rem',
                            fontWeight: 500,
                          }}
                        >
                          {customer.name}
                        </div>
                      </Stack>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} spacing={1}>
                      <Button
                        sx={{
                          color: 'black',
                          width: '18px',
                          height: '30px',
                          fontSize: '1rem',
                        }}
                      >
                        <EditIcon />
                      </Button>
                    </Stack>
                  </Stack>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div
              style={{
                paddingRight: '0px',
              }}
              className="col-md-4"
            >
              <div className="card">
                <div
                  className="card-body"
                  style={{
                    minHeight: '70vh',
                  }}
                >
                  <h4
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    Stats
                  </h4>
                  <hr />
                  <div
                    style={{
                      marginBottom: '15px',
                      marginBottom: '50px',
                    }}
                  >
                    {/* {customer.invoices.length} Invoices */}
                  </div>
                  <h4
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    Basic Info
                  </h4>
                  <hr />
                  <div
                    style={{
                      marginBottom: '15px',
                      fontSize: '1rem',
                      color: '#8c8c8c',
                      marginBottom: '50px',
                    }}
                  >
                    <Stack
                      direction={'row'}
                      marginBottom={2}
                      alignItems={'flex-end'}
                    >
                      <PhoneIcon />
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;{customer.phone}</span>
                    </Stack>
                    <Stack
                      direction={'row'}
                      marginBottom={2}
                      alignItems={'flex-end'}
                    >
                      <EmailIcon />
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;{customer.email}</span>
                    </Stack>
                    <Stack
                      direction={'row'}
                      marginBottom={2}
                      alignItems={'flex-end'}
                    >
                      <AddressIcon />
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;{customer.address}</span>
                    </Stack>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                paddingLeft: '0px',
              }}
              className="col-md-8 p-r-0"
            >
              <div className="card tab-box">
                <div className="row user-tabs">
                  <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
                    <ul className="nav nav-tabs nav-tabs-bottom">
                      <li className="nav-item">
                        <a
                          href="#emp_notes"
                          data-toggle="tab"
                          className="nav-link active"
                        >
                          Purchase
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                style={{
                  minHeight: '65vh',
                  maxHeight: '65vh',
                  overflowY: 'auto',
                }}
                className="card p-4 tab-content"
              >
                <div className="tab-pane fade show active" id="emp_notes">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <h3>Purchase</h3>
                    <button
                      onClick={() => {
                        setAddInvoiceModal(true);
                      }}
                      className="btn add-btn"
                    >
                      Add Purchase
                    </button>
                  </div>
                  <hr />
                  {/* <Invoices invoice={customer.invoices} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Backdrop
        open={addInvoiceModal}
        style={{ zIndex: '9999' }}
        onClick={() => {
          setAddInvoiceModal(false);
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
              width: '50%',
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '30px',
              position: 'relative',
            }}
          >
            <div className="row">
              <div className="col-sm-6 m-b-20">
                <img className="inv-logo" alt="" />
                <ul className="list-unstyled">
                  <li>KN Multiprojects</li>
                  <li>Plot No-31 Basundhara Complex, Hanspal,</li>
                  <li> Bhubaneswar, Odisha 752101</li>
                  <li>GST No:</li>
                </ul>
              </div>
              <div className="col-sm-6 m-b-20">
                <div className="invoice-details">
                  <h3 className="text-uppercase">New Invoice</h3>
                  <ul className="list-unstyled">
                    <li>
                      Date:{' '}
                      <span> {new Date().toISOString().split('T')[0]}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6 col-lg-7 col-xl-8 m-b-20">
                <ul className="list-unstyled">
                  <li>
                    <strong>{customer?.name}</strong>
                  </li>
                  <li>
                    <span>{customer?.company}</span>
                  </li>
                  <li>{customer?.address}</li>
                  <li>{customer?.phone}</li>
                  <li>
                    <a href="#">{customer?.email}</a>
                  </li>
                </ul>
              </div>
            </div>
            <h4>Select Project</h4>
            <select
              onChange={(e) => {
                setSelectedPlot(null);
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
            <h4
              style={{
                marginTop: '12px',
              }}
            >
              Select Plot
            </h4>
            <select
              value={selectedPlot?._id || ''}
              onChange={(e) => {
                setSelectedPlot(
                  selectedProject?.subPlots?.filter(
                    (p) => p._id === e.target.value
                  )[0]
                );
              }}
              className="custom-select"
            >
              <option hidden value=""></option>
              {selectedProject?.subPlots?.map((plot) => (
                <option value={plot._id}>{plot.name}</option>
              ))}
            </select>

            <button
              style={{
                marginTop: '3%',
              }}
              onClick={async () => {
                if (!selectedPlot.name || !selectedProject.name)
                  return toast.error('Please select a project and plot');
                if (selectedPlot.sold) {
                  return toast.error('This plot is already sold');
                }
                selectedPlot.sold = true;
                selectedPlot.soldAt = new Date();
                selectedPlot.soldBy = user._id;
                selectedPlot.soldTo = customer._id;
                await toast.promise(
                  Promise.all([
                    httpService.post('/sale-invoice', {
                      customer: customer._id,
                      project: selectedProject._id,
                      invoiceDate: new Date(),
                      items: [
                        {
                          item: selectedProject.name + ' ' + selectedPlot.name,
                          description: selectedPlot.description,
                          unitCost: selectedProject.costPerSqFeet,
                          quantity: 1,
                          amount:
                            selectedPlot.area * selectedProject.costPerSqFeet,
                        },
                      ],
                      total: selectedPlot.area * selectedProject.costPerSqFeet,
                    }),
                    httpService.put(`/project/${selectedProject._id}`, {
                      ...selectedProject,
                      subPlots: selectedProject.subPlots.map((p) => {
                        if (p._id === selectedPlot._id) {
                          return selectedPlot;
                        }
                        return p;
                      }),
                    }),
                  ]),
                  {
                    error: 'Error creating an invoice',
                    success: 'Invoice created successfully',
                    pending: 'Creating invoice...',
                  }
                );
                setAddInvoiceModal(false);
                setSelectedPlot(null);
                setSelectedProject(null);
                fetchProjects();
                fetchApi();
              }}
              className="btn add-btn"
            >
              Confirm
            </button>
          </div>
        </div>
      </Backdrop>
      {/* /Page Content */}
    </div>
  );
};
export default VendorProfile;
