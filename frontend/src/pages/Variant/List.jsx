import React, { useState, useEffect } from "react";
import { getVariant } from "../../API-services/variant";
import { EntityVariant as Variant }  from "../../components/Entity";
import { Pagination } from "antd";

const List = () => {
  let isMounted = true;
  let [variants, setVariants] = useState([]);
  let [paging, setPaging] = useState({});

  const fetchVariants = async (page, perPage) => {
    try {
      let response = await getVariant(page, perPage);
      let result = [];
      let paginationAttribute = {};
      if (response.status === 200) {
        result = response.data.data.variants.map((variant) => ({
          id: variant.id,
          name: variant.name,
          product_id: variant.product_id,
        }));
        paginationAttribute = response.data.data.paging;
        if (isMounted) {
          setVariants(result);
          setPaging({
            currentPage: paginationAttribute.current_page,
            total: paginationAttribute.count,
          });
        }
      } else {
        console.error("fail to fetch variants");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onPaginationChange = (page, pageSize) => {
    fetchVariants(page, pageSize)
  }

  useEffect(() => {
    fetchVariants(1, 10);

    return function cleanup() {
      isMounted = false;
    };
  }, []);

  return (
    <div style={{ position: "relative", paddingBottom: 72 }}>
      <div>
        <h1>Variant List</h1>
        {variants.map((variant, index) => {
          return (
            <Variant
              key={index}
              name={variant.name}
              size={variant.size}
              color={variant.color}
              detailUrl={`/variant/detail/${variant.id}`}
              editUrl={`/variant/${variant.id}`}
              parentID={variant.product_id}
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
