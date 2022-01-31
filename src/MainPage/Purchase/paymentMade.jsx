import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from '../paginationfunction';
import '../antdstyle.css';
import { fetchBill, fetchPayment } from '../../lib/api';

const PaymentMade = () => {
  useEffect(() => {
    (async () => {
      const res = await fetchBill();

      setData(res.data);
      console.log('bill');
    })();
  }, []);

  const [data, setData] = useState([]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (text, record) => (
        <Link to="/app/sales/invoices-view">#{text}</Link>
      ),
      sorter: (a, b) => a.invoicenumber.length - b.invoicenumber.length,
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor',
      sorter: (a, b) => a.client.length - b.client.length,
    },

    {
      title: 'Expense',
      dataIndex: 'expense',
      sorter: (a, b) => a.paymenttype.length - b.paymenttype.length,
    },
    {
      title: 'Paid Date',
      dataIndex: 'PaymentDate',
      sorter: (a, b) => a.duedate.length - b.duedate.length,
    },
    {
      title: 'Paid Amount',
      dataIndex: 'amount',
      render: (text, record) => <span>₹ {text}</span>,
      sorter: (a, b) => a.amount.length - b.amount.length,
    },
    {
      title: 'Paid Mode',
      dataIndex: 'paymentMode',
      render: (text, record) => <span>₹ {text}</span>,
      sorter: (a, b) => a.amount.length - b.amount.length,
    },
  ];
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Payments </title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Payments</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Payments</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}
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

export default PaymentMade;
