import React, { useState, useEffect } from "react";
import { getImage } from "../../API-services/images";
import { EntityImageLogo as ImageEntity }  from "../../components/Entity";
import { Pagination } from "antd";

const List = () => {
  let isMounted = true;
  let [images, setImages] = useState([]);
  let [paging, setPaging] = useState({});

  const fetchVariants = async (page, perPage) => {
    try {
      let response = await getImage(page, perPage);
      let result = [];
      let paginationAttribute = {};
      if (response.status === 200) {
        result = response.data.data.images.map((variant) => ({
          id: variant.id,
          url_name: variant.url,
        }));
        paginationAttribute = response.data.data.paging;
        if (isMounted) {
            setImages(result);
          setPaging({
            currentPage: paginationAttribute.current_page,
            total: paginationAttribute.count,
          });
        }
      } else {
        console.error("fail to fetch images logo");
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
        <h1>Images List</h1>
        {images.map((images, index) => {
          return (
            <ImageEntity
              key={index}
              url_name={images.url_name}
            //   detailUrl={`/image/detail/${variant.id}`}
              editUrl={`/image_logo/${images.id}`}
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