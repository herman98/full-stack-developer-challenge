import React, { useState, useEffect } from "react";
import Image from "../../components/image/Image";
import Title from "../../components/title/Title";
import MediumText from "../../components/description/Description";
import { getProductById } from "../../API-services/product";
import {EntityVariant as Variant} from "../../components/Entity";

const Detail = (props) => {
  let isMounted = true
  let [product, setProduct] = useState({
    id: "",
    logo: "",
    name: "",
    description: "",
    images: [],
    variants: [],
  });

  const fetchProduct = async (productId) => {
    try {
      let response = await getProductById(productId);
      let productData = response.data.data.product;
      if (isMounted) {
        setProduct(productData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct(props.match.params.productId);

    return function cleanup() {
      isMounted = false
    }
  }, []);
  return (
    <>
      <h1 style={{ fontSize: 30 }}>Product Detail</h1>
      <div style={{ borderBottom: "1px solid #ddd" }}>
        <Image imageUrl={product.logo.url} />
        <Title>{product.name}</Title>
        <MediumText style={{ fontWeight: "bold" }}>Description:</MediumText>
        <MediumText style={{ marginBottom: "16px" }}>
          {product.description}
        </MediumText>
      </div>
      <h2 style={{ marginTop: 32 }}>Attached Images:</h2>
      <div
        style={{
          paddingBottom: 16,
          display: "flex",
          flexWrap: "wrap",
          borderBottom: "1px solid #ddd",
        }}
      >
        {product.images.map((image, index) => {
          return (
            <Image
              key={index}
              imageUrl={image.url}
              style={{ marginRight: 16, border: "1px solid #ddd" }}
            />
          );
        })}
      </div>
      <h2 style={{ marginTop: 32 }}>Variant:</h2>
      <div>
        {product.variants.map((variant, index) => {
          return (
            <Variant key={index} name={variant.name} size={variant.size} color={variant.color}/>
          );
        })}
      </div>
    </>
  );
};

export default Detail;
