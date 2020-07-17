import React, { useState } from 'react'
import 'antd/dist/antd.css'
import { Form, Input, Button } from 'antd'

const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 8,
  },
}
const validateMessages = {
  required: '${label} is required!',
}

const ProductForm = () => {

  const [loading, setLoading] = useState(false)

  const onFinish = (values) => {
    console.log(values)
  }

  const enterLoading = () => {
    setLoading(true)
  }

  setTimeout(() => {
    setLoading(false)
  }, 2000)

  return (
    <>
      <h1>Product Form</h1>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={['user', 'name']}
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'Image Url']}
          label="Image Url"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'Description']} label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button
            type="primary"
            loading={loading}
            onClick={() => enterLoading(0)}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default ProductForm
