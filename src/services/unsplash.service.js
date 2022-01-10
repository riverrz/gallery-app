import coreAxios from "axios";

const BASE_URL = "https://api.unsplash.com";

const axios = coreAxios.create({ baseURL: BASE_URL });

export function searchCollectionsByQuery({ query, page, per_page }) {
  return axios.get(`/search/collections`, {
    params: { query, page, per_page },
  });
}
