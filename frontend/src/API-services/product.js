import axiosInstance from './axiosInstance'

export async function postProduct(payload) {
  try {
    let response = axiosInstance.post("/api/product", payload);

    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getProduct(page = 1, perPage = 10) {
  try {
    let response = axiosInstance.get(
      `/api/products?page=${page}&per_page=${perPage}`
    );

    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getProductById(productId) {
  try {
    let response = axiosInstance.get(
      `/api/product/${productId}`
    );

    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function updateProduct(productId, payload) {
  try {
    let response = axiosInstance.put(`/api/product/${productId}`, payload);

    return response;
  } catch (error) {
    console.error(error);
  }
}
