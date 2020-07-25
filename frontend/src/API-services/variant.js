import axiosInstance from './axiosInstance'

export async function postVariant(payload) {
  try {
    let response = axiosInstance.post("/api/variant", payload);

    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getVariant(page = 1, perPage = 10) {
  try {
    let response = axiosInstance.get(
      `/api/variants?page=${page}&per_page=${perPage}`
    );

    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getVariantById(variantId) {
  try {
    let response = axiosInstance.get(
      `/api/variant/${variantId}`
    );

    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function updateVariant(variantId, payload) {
  try {
    let response = axiosInstance.put(`/api/variant/${variantId}`, payload);

    return response;
  } catch (error) {
    console.error(error);
  }
}