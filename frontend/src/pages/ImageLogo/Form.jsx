import React, { useState, useEffect } from "react"; //, cancelCourse
import "antd/dist/antd.css";
import { Form, Input, Button } from "antd";
import {
  postImage,
  getImageById,
  updateImage,
} from "../../API-services/images";

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

const ImageLogoForm = (props) => {
  let isMounted = true
  let imageId = props.match.params.imageId;
  let [loading, setLoading] = useState(false);
  let [imageUrl, setImageUrl] = useState("");
  const [form] = Form.useForm();

  const imageInputChange = (e) => {
    if (isMounted) {
      setImageUrl(e.target.value);
    }
  };

  const onSubmit = async () => {
    if (isMounted) {
      setLoading(true);
    }

    const payload = {
      url: imageUrl,
    };

    try {
      let response = {};
      if (imageId) {
        response = await updateImage(imageId, payload);
      } else {
        response = await postImage(payload);
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

  const fetchImage = async (imageId) => {
    try {
      let response = await getImageById(imageId);
      let imageData = response.data.data.image;
      if (imageId && isMounted) {
        setImageUrl(imageData.url);
      
        form.setFieldsValue({
          ImageUrl: imageData.url,
        });
      } else {
        
      }
    } catch (error) {
      console.error(error);
    }
  };

  // cancelCourse(() => () => { 
  //   form.reset();
  // })

  useEffect(() => {
    console.log("useEffect imageId :" + imageId)
    
    if (imageId) {
      fetchImage(imageId);
    } 

    return function cleanup() {
      isMounted = false
    }
  }, [])

  
  return (
    <>
      <h1>Image Form</h1>
      <Form
        {...formItemLayout}
        form={form}
        name="nest-messages"
        validateMessages={validateMessages}
      >
        <Form.Item
          name="ImageUrl"
          label="Image Url"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input value={imageUrl} onChange={imageInputChange}/>
        </Form.Item>

        <Form.Item wrapperCol={{ ...formItemLayout.wrapperCol, offset: 8 }}>
          <Button type="primary" loading={loading} onClick={onSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ImageLogoForm;
