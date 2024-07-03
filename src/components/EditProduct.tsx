
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Form, Button, Input, InputNumber, Select, Spin, Card, Row, Col } from 'antd';
import { useGetProductByIdQuery, useGetCategoriesQuery, useUpdateProductMutation } from '../app/apiSlice';
import './EditProduct.css';

// const { Option } = Select;

// interface Category {
//   slug: string;
//   name: string;
// }

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id, 10) : 0;
  const { data: product, error: productError, isLoading: productLoading } = useGetProductByIdQuery(productId);
  const { data: categories, error: categoriesError, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const [updateProduct] = useUpdateProductMutation();

  const [form] = Form.useForm();

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        ...product,
        reviews: product.reviews || [],
      });
    }
  }, [product, form]);

  const onFinish = async (values: any) => {
    console.log('Final output:', values);
    try {
      await updateProduct({ id: productId, data: values }).unwrap();
      console.log('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (productLoading || categoriesLoading) {
    return (
      <div className="centered">
        <Spin />
      </div>
    );
  }

  if (productError || categoriesError) {
    return (
      <div className="centered">
        <p className="error-message">Error loading data...</p>
      </div>
    );
  }

  const categoryOptions = categories?.map((category: any) => ({
    value: category.slug,
    label: category.name,
  }));

  console.log(categoryOptions)
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className="edit-product">
      <Card title={product?.title}>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter the product title' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter the product price' }]}>
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="brand" label="Brand" rules={[{ required: true, message: 'Please enter the product brand' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select the product category' }]}>
                <Select onChange={handleChange} options={categoryOptions} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter the product description' }]}>
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="discountPercentage" label="Discount%">
                <InputNumber min={0} max={100} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="stock" label="Stock" rules={[{ required: true, message: 'Please enter the product stock' }]}>
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.List name="reviews">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <div key={key}>
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item
                          {...restField}
                          name={[name, 'reviewer']}
                          label="Reviewer"
                          rules={[{ required: true, message: 'Please enter the reviewer name' }]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          {...restField}
                          name={[name, 'comment']}
                          label="Comment"
                          rules={[{ required: true, message: 'Please enter the review comment' }]}
                        >
                          <Input.TextArea rows={2} />
                        </Form.Item>
                      </Col>
                      <Col style={{ marginTop: '15px' }} span={4}>
                        <Button type="dashed" onClick={() => remove(name)} block>
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  </div>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block>
                    Add Review
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button style={{ marginRight: '10px' }}>
              <Link to={`/products/${productId}`}>Back</Link>
            </Button>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EditProduct;
