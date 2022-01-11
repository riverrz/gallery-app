import coreAxios from "axios";

const BASE_URL = "https://api.unsplash.com";

const axios = coreAxios.create({
  baseURL: BASE_URL,
});

export async function searchCollectionsByQuery({ query, page, per_page }) {
  const response = await axios.get(`/search/collections`, {
    params: {
      query,
      page,
      per_page,
      client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
    },
  });
  return response.data.results;
}
