import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../../components/container/Container'
import Image from '../../components/image/Image'
import Title from '../../components/title/Title'
import { Button } from 'antd'

import react_img from '../../static/image/logo192.png';

function Home() {
  return (
    <>
      <h1>Home</h1>
      <Container>
        <Image src={react_img}/>
        <Title style={{ marginLeft: 10 }}>Product</Title>
        <div className="button-container">
          <Link to="/variant/list">
            <Button type="primary" danger>
              Detail
            </Button>
          </Link>
          <Link to="/product/form">
            <Button style={{ marginLeft: 16 }} type="primary">
              Edit
            </Button>
          </Link>
        </div>
      </Container>
      <Container>
        <Image />
        <Title style={{ marginLeft: 10 }}>Variant</Title>
        <div className="button-container">
          <Link to="/variant/list">
            <Button type="primary" danger>
              Detail
            </Button>
          </Link>
          <Link to="/product/form">
            <Button style={{ marginLeft: 16 }} type="warning">
              Edit
            </Button>
          </Link>
        </div>
      </Container>
      <Container>
        <Image />
        <Title style={{ marginLeft: 10 }}>Images</Title>
        <div className="button-container">
          <Link to="/variant/list">
            <Button type="primary" danger>
              Detail
            </Button>
          </Link>
          <Link to="/image_logo/form">
            <Button style={{ marginLeft: 16 }} type="danger">
              Edit
            </Button>
          </Link>
        </div>
      </Container>
    </>
  )
}

export default Home
