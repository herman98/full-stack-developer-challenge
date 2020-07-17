import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../../components/container/Container'
import Image from '../../components/image/Image'
import Title from '../../components/title/Title'
import { Button } from 'antd'

function Home() {
  return (
    <>
      <h1>Home</h1>
      <Container>
        <Image />
        <Title style={{ marginLeft: 10 }}>Lorem Ipsum</Title>
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
        <Title style={{ marginLeft: 10 }}>Lorem Ipsum</Title>
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
    </>
  )
}

export default Home
