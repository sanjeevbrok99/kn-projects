import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from '../../paginationfunction';
import '../../antdstyle.css';
import httpService from '../../../lib/httpService';
import Swal from 'sweetalert2';

const Invoices = () => {
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
    const invoices = await httpService.get('/sale-invoice');
    console.log(invoices);
    setData(
      invoices.data?.map((invoice, index) => ({
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
      title: 'Client',
      dataIndex: 'client',
      sorter: (a, b) => a.client.length - b.client.length,
    },

    {
      title: 'Created Date',
      dataIndex: 'createddate',
      sorter: (a, b) => a.createddate.length - b.createddate.length,
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
    <div className="page-wrapper">
      <Helmet>
        <title>Invoices </title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Invoices</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Invoices</li>
              </ul>
            </div>
            <div className="col-auto float-right ml-auto">
              <Link to="/app/sales/invoices-create" className="btn add-btn">
                <i className="fa fa-plus" /> Create Invoice
              </Link>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        {/* Search Filter */}
        <div className="row filter-row">
          <div className="col-sm-6 col-md-4">
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
          <div className="col-sm-6 col-md-4">
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
          <div className="col-sm-6 col-md-4">
            <a href="#" className="btn btn-success btn-block">
              {' '}
              Search{' '}
            </a>
          </div>
        </div>
        {/* /Search Filter */}
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
                // bordered
                dataSource={data}
                rowKey={(record) => record.id}
                // onChange={this.handleTableChange}
              />
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default Invoices;
