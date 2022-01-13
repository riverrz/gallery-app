import coreAxios from "axios";

const BASE_URL = "https://api.unsplash.com";

const axios = coreAxios.create({
  baseURL: BASE_URL,
});

export async function searchPhotosByQuery({
  query,
  page,
  per_page,
  filters = {},
}) {
  const response = await axios.get(`/search/photos`, {
    params: {
      query,
      page,
      per_page,
      client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
      ...filters,
    },
  });
  return response.data;
}

export async function getCollectionPhotos({ collectionId, filters = {} }) {
  const response = await axios.get(`/collections/${collectionId}/photos`, {
    params: {
      client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
      ...filters,
    },
  });
  return response.data;
}
