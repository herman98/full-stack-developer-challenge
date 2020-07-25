import React, { useState, useEffect } from "react";
import { getProduct } from "../../API-services/product";
import {Entity as Product} from "../../components/Entity";
import { Pagination } from "antd";

const List = () => {
  let isMounted = true;
  let [products, setProducts] = useState([]);
  let [paging, setPaging] = useState({});

  const fetchProducts = async (page, perPage) => {
    try {
      let response = await getProduct(page, perPage);
      let result = [];
      let paginationAttribute = {};
      if (response.status === 200) {
        result = response.data.data.products.map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          logo: product.logo.url,
        }));
        paginationAttribute = response.data.data.paging;
        if (isMounted) {
          setProducts(result);
          setPaging({
            currentPage: paginationAttribute.current_page,
            total: paginationAttribute.count,
          });
        }
      } else {
        console.error("fail to fetch products");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const onPaginationChange = (page, pageSize) => {
    fetchProducts(page, pageSize)
  }

  useEffect(() => {
    fetchProducts(1, 10);

    return function cleanup() {
      isMounted = false;
    };
  }, []);

  return (
    <div style={{ position: "relative", paddingBottom: 72 }}>
      <div>
        <h1 style={{fontSize: 32}}>Product List</h1>
        {products.map((product, index) => {
          return (
            <Product
              key={index}
              name={product.name}
              logo={product.logo}
              description={product.description}
              detailUrl={"/product/detail/" + product.id}
              editUrl={`/product/${product.id}`}
            />
          );
        })}
      </div>
      <div
        style={{
          width: "100%",
          position: "absolute",
          bottom: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          defaultCurrent={1}
          total={paging.total}
          current={paging.currentPage}
          pageSize={10}
          onChange={onPaginationChange}
        />
      </div>
    </div>
  );
};

export default List;
