import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button } from "antd";
import { AutoComplete } from "antd";
import { 
  getProduct, 
  getProductById 
} from "../../API-services/product";
import {
  postVariant,
  getVariantById,
  updateVariant,
} from "../../API-services/variant";
import { successModal, errorModal } from "../../utilities/modal";

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

const VariantForm = (props) => {
  let isMounted = true;
  let variantId = props.match.params.variantId;
  let [autoCompleteOption, setAutoCompleteOption] = useState([]);
  let [productId, setProductId] = useState("");
  let [product, setProduct] = useState("");
  let [name, setName] = useState("");
  let [size, setSize] = useState("");
  let [color, setColor] = useState("");
  let [loading, setLoading] = useState(false);
  // const { register, handleSubmit, reset } = useForm();
  // {
  //   defaultValues: {
  //     Name: '',
  //     Size: '',
  //     Color: '',
  //   },
  // }

  const [form] = Form.useForm();
  // let [description, setDescription] = useState('')

  const onSelect = (value, optionObject) => {
    setProductId(optionObject.id);
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onSizeChange = (e) => {
    setSize(e.target.value);
  };

  const onColorChange = (e) => {
    setColor(e.target.value);
  };

  const onSubmit = async () => {
    if (isMounted) {
      setLoading(true);
    }

    const payload = {
      name,
      size,
      color,
      product_id: productId,
    };
    try {
      let response = {};

      if (variantId) {
        response = await updateVariant(productId, payload);
      } else {
        response = await postVariant(payload);
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
    if (isMounted) {
      setLoading(false);
    }
    
  };

  const fetchProducts = async () => {
    try {
      let response = await getProduct(1, 100);
      let result = [];
      if (response.status === 200) {
        result = response.data.data.products.map((product) => ({
          id: product.id,
          value: product.name,
        }));
        if (isMounted) {
          setAutoCompleteOption(result);
        }

      } else {
        console.error("fail to fetch products");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductbyID = async (productId) => {
    try {
      let response = await getProductById(productId);
      let productData = response.data.data.product;
      setProduct(productData.name);
      form.setFieldsValue({
        Product: productData.name
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchVariant = async (variantId) => {
    try {
      let response = await getVariantById(variantId);
      fetchProductbyID(response.data.data.variant.product_id)

      let variantData = response.data.data.variant;
      if (variantId && isMounted) {
        setName(variantData.name);
        setSize(variantData.size);
        setProductId(variantData.product_id);
        setColor(variantData.color);

        form.setFieldsValue({
          Name: variantData.name,
          Size: variantData.size,
          Color: variantData.color,
        });
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    if (variantId) {
      fetchVariant(variantId);
    }

    return function cleanup() {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <h1>Variant Form</h1>

      <Form
        {...formItemLayout}
        form={form}
        name="nest-messages"
        validateMessages={validateMessages}
      >
        <Form.Item
          name="Product"
          label="Product"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AutoComplete
            style={{
              width: 200,
            }}
            options={autoCompleteOption}
            onSelect={onSelect}
            placeholder="Insert product name"
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          />
        </Form.Item>
        <Form.Item
          name="Name"
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input value={name} onChange={onNameChange} />
        </Form.Item>
        <Form.Item
          name="Size"
          label="Size"
          rules={[]}
        >
          <Input value={size} onChange={onSizeChange} />
        </Form.Item>
        <Form.Item
          name="Color"
          label="Color"
          rules={[
            ]}
        >
          <Input value={color} onChange={onColorChange} />
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

export default VariantForm;
