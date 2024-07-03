
import React from 'react';
import { useParams , Link } from 'react-router-dom';
import { useGetProductByIdQuery } from '../app/apiSlice';
import { Card, Spin, Row, Col,Button  } from 'antd';
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id, 10) : 0;

  const { data: product, error, isLoading } = useGetProductByIdQuery(productId);

  if (isLoading) {
    return <Spin />;
  }

  if (error) {
    return <p>Error loading product details</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="product-detail">
      <Card title={product.title}>
        <Row gutter={16}>
          <Col span={8}>
            <img src={product.thumbnail} alt={product.title} className="product-image" />
          </Col>
          <Col span={16}>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <Button style={{ marginRight: '10px' }}>
                <Link to="/products">Back</Link>
              </Button>
            <Button type="primary">
              <Link to={`/products/edit/${product.id}`}>Edit</Link>
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProductDetail;
