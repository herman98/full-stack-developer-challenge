import React from 'react'
import './list.css'
import Container from '../../../components/container/Container'
import Image from '../../../components/image/Image'
import Title from '../../../components/title/Title'

function List(props) {
  return (
    <>
      <div className="product-info-container">
        <Image />
        <Title style={{ marginLeft: 16 }}>Product Name</Title>
      </div>

      <h1>Variant List</h1>
      <Container>
        <Image />
        <Title style={{marginLeft: 10}}>Variant Name</Title>
      </Container>
      <Container>
        <Image />
        <Title style={{marginLeft: 10}}>Variant Name</Title>
      </Container>
    </>
  )
}

export default List
