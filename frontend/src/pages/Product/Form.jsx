import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, AutoComplete } from "antd";
import { getImage } from "../../API-services/images";
import { successModal, errorModal } from "../../utilities/modal";
import { getProductById, postProduct, updateProduct } from "../../API-services/product";

const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 8,
  },
};
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const validateMessages = {
  required: "${label} is required!",
};

const ProductForm = (props) => {
  let isMounted = true
  let productId = props.match.params.productId
  let [autoCompleteOption, setAutoCompleteOption] = useState([]);
  let [loading, setLoading] = useState(false);
  let [productName, setProductName] = useState("");
  let [imageId, setImageId] = useState("");
  let [description, setDescription] = useState("");
  const [form] = Form.useForm();
  
  const onSubmit = async () => {
    setLoading(true);

    const payload = {
      name: productName,
      logo_id: imageId,
      description,
    };

    try {
      let response = {}

      if (productId) {
        response = await updateProduct(productId, payload);
      } else {
        response = await postProduct(payload);
      }

      if (response.status === 200) {
        successModal();
      } else {
        errorModal();
      }
    } catch (error) {
      errorModal();
      console.error(error);
    }

    setLoading(false);
  };

  const fetchProduct = async (productId) => {
    try {
      let response = await getProductById(productId);
      let productData = response.data.data.product;
      if (isMounted && isMounted) {
        setProductName(productData.name)
        setImageId(productData.logo_id)
        setDescription(productData.description)
        form.setFieldsValue({
          Name: productData.name,
          ImageUrl: productData.logo.url,
          Description: productData.description
        })
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchImage = async (page, perPage) => {
    try {
      let response = await getImage(page, perPage);
      let result = [];
      if (response.status === 200) {
        result = response.data.data.images.map((image) => ({
          id: image.id,
          value: image.url,
        }));
        if(isMounted) {
          setAutoCompleteOption(result);
        }
      } else {
        console.error("fail to fetch images");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onNameChange = (e) => {
    setProductName(e.target.value);
  };

  const onImageSelect = (value, optionObject) => {
    setImageId(optionObject.id);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    fetchImage(1, 1000);
    if (productId) {
      fetchProduct(productId)
    }

    return function cleanup() {
      isMounted = false
    }
  }, []);

  return (
    <>
      <h1>Product Form</h1>
      <Form
        {...formItemLayout}
        form={form}
        name="nest-messages"
        validateMessages={validateMessages}
      >
        <Form.Item
          name={"Name"}
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input value={productName} onChange={onNameChange} placeholder={"Insert product name here"} />
        </Form.Item>
        <Form.Item
          name={"ImageUrl"}
          label="Image Url"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AutoComplete
            options={autoCompleteOption}
            onSelect={onImageSelect}
            placeholder="Image name"
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          />
        </Form.Item>
        <Form.Item name={"Description"} label="Description">
          <Input.TextArea value={description} onChange={onDescriptionChange} placeholder={"Insert product description here"}/>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" loading={loading} onClick={onSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProductForm
