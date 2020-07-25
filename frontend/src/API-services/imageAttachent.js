import axiosInstance from './axiosInstance'

export async function attachImageToProduct(productId, payload) {
  try {
    let response = axiosInstance.post(`/api/product/${productId}/images`, payload);

    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function attachImageToVariant(variantId, payload) {
  try {
    let response = axiosInstance.post(`/api/variant/${variantId}/images`, payload);

    return response;
  } catch (error) {
    console.error(error);
  }
}