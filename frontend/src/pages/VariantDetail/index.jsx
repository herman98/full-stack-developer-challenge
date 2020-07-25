import React, { useState, useEffect } from "react";
import Image from "../../components/image/Image";
import Title from "../../components/title/Title";
import MediumText from "../../components/description/Description";
import { getVariantById } from "../../API-services/variant";
import { getProductById } from "../../API-services/product";
// import Variant from "../../components/Entity";

const Detail = (props) => {
  let isMounted = true
  let [variant, setVariant] = useState({
      id: "",
      name: "",
      size: "",
      color: "",
      product_id: "",
      images: [],
    },
  );
  let [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
  });

  const fetchVariant = async (variantId) => {
    try {
      let response = await getVariantById(variantId);
      fetchProduct(response.data.data.variant.product_id)
      // console.log("variant.product_id: "+ response.data.data.variant.product_id)
      
      let variantData = response.data.data.variant;
      setVariant(variantData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProduct = async (productId) => {
    try {
      let response = await getProductById(productId);
      let productData = response.data.data.product;
      setProduct(productData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVariant(props.match.params.variantId);
    
    return function cleanup() {
      isMounted = false
    }
  }, []);
  return (
    <>
      <h1 style={{ fontSize: 30 }}>Variant Detail</h1>
      <div style={{ borderBottom: "1px solid #ddd" }}>
        <MediumText style={{ fontWeight: "bold" }}>Product ID:</MediumText>
        <Title>{product.id}, {product.name}</Title>
      </div>
      <div style={{ borderBottom: "1px solid #ddd" }}>
        <MediumText style={{ fontWeight: "bold" }}>Variant Name:</MediumText>
        <h2>{variant.name}</h2>
      </div>
      <div style={{ borderBottom: "1px solid #ddd" }}>
        <MediumText style={{ fontWeight: "bold" }}>Size:</MediumText>
        <h2>{variant.size}</h2>
      </div>
      <div style={{ borderBottom: "1px solid #ddd" }}>
        <MediumText style={{ fontWeight: "bold" }}>Color:</MediumText>
        <h2>{variant.color}</h2>
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
        {variant.images.map((image, index) => {
          return (
            <Image
              key={index}
              imageUrl={image.url}
              style={{ marginRight: 16, border: "1px solid #ddd" }}
            />
          );
        })}
      </div>
    </>
  );
};

export default Detail;
