// src/components/ProductList.tsx
import React, { useState } from 'react';
import { Table, Button, Pagination } from 'antd';
import { useGetProductsQuery } from '../app/apiSlice';
import { Link } from 'react-router-dom';
import './ProductList.css';

const ProductList: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const limit = 10;
  const skip = (current - 1) * limit;

  const { data, error, isLoading } = useGetProductsQuery({ limit, skip });
console.log(data)
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: { id: number }) => (
        <Link to={`/products/${record.id}`}>
          <Button type="primary">View Details</Button>
        </Link>
      ),
    },
  ];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading products</p>;
  }

  return (
    <div className="product-list">
      <Table
        dataSource={data?.products}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
      <Pagination
        current={current}
        total={data?.total}
        pageSize={limit}
        onChange={(page) => setCurrent(page)}
        style={{ marginTop: '16px', textAlign: 'center' }}
      />
    </div>
  );
};

export default ProductList;
