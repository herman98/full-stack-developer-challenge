import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Form, Button, AutoComplete } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { getProduct } from "../../API-services/product";
import { getImage } from "../../API-services/images";
import { attachImageToProduct } from "../../API-services/imageAttachent";
import { successModal, errorModal } from "../../utilities/modal";

const validateMessages = {
  required: "${label} is required!",
};

const ImageLogoForm = () => {
  let isMounted = true
  let [productOption, setProductOption] = useState([]);
  let [imageOption, setImageOption] = useState([]);
  let [productId, setProductId] = useState("");
  let [loading, setLoading] = useState(false);
  let [images, setImages] = useState([
    {
      value: "",
      id: "-1",
    },
  ]);

  const onSelect = (value, optionObject) => {
    setProductId(optionObject.id);
  };

  const insertValue = (value, optionObject, index) => {
    let newArray = [...images];
    newArray[index]["id"] = optionObject.id;
    newArray[index]["value"] = value;
    setImages(newArray);
  };

  const addInput = () => {
    let newArray = [...images];
    newArray.push({
      value: "",
      id: "-1",
    });
    setImages(newArray);
  };

  const removeInput = (index) => {
    let newArray = [...images];
    newArray.splice(index, 1);
    setImages(newArray);
  };

  const onSubmit = async () => {
    setLoading(true);

    const payload = images.map((image) => ({
      image_id: image.id,
    }));
    try {
      let response = await attachImageToProduct(productId, payload)
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

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  const fetchProducts = async () => {
    try {
      let response = await getProduct(1, 1000);
      let result = [];
      if (response.status === 200) {
        result = response.data.data.products.map((product) => ({
          id: product.id,
          value: product.name,
        }));
        if (isMounted) {
          setProductOption(result);
        }
      } else {
        console.error("fail to fetch products");
      }
    } catch (error) {
      console.log(error);
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
        if (isMounted) {
          setImageOption(result);
        }
      } else {
        console.error("fail to fetch images");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchImage(1, 1000);

    return function cleanup() {
      isMounted = false
    }
  }, []);

  return (
    <>
      <h1>Image Form</h1>
      <Form
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 16 }}
        name="nest-messages"
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "product"]}
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
            options={productOption}
            onSelect={onSelect}
            placeholder="Insert product name"
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          />
        </Form.Item>

        {images.map((image, index) => {
          return (
            <Form.Item
              key={index}
              label="Image Url"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Form.Item
                style={{
                  display: "inline-block",
                  width: "calc(50% - 8px)",
                }}
              >
                <AutoComplete
                  options={imageOption}
                  onSelect={(value, option) =>
                    insertValue(value, option, index)
                  }
                  placeholder="Image name"
                  value={image.value}
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>
              <Form.Item style={{ display: "inline-block", marginLeft: 16 }}>
                <Button
                  style={{ display: "inline-block", marginLeft: 16 }}
                  type="primary"
                  onClick={() => removeInput(index)}
                  danger
                  disabled={index === 0 && images.length == 1}
                >
                  <CloseOutlined />
                </Button>
                {index === images.length - 1 && (
                  <Button
                    style={{ display: "inline-block", marginLeft: 16 }}
                    type="primary"
                    onClick={addInput}
                  >
                    <PlusOutlined />
                  </Button>
                )}
              </Form.Item>
            </Form.Item>
          );
        })}
        <Button type="primary" loading={loading} onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default ImageLogoForm;
