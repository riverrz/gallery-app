import { useState, useCallback } from "react";

const ITEMS_PER_PAGE = 10;

export default function useApi({
  initialData = [],
  fetcher,
  initialPage = 0,
  itemsPerPage = ITEMS_PER_PAGE,
  debounceTimeout = 300,
}) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);

  const handleLoadData = useCallback(
    async (params, pagination = false, reset = true) => {
      try {
        setLoading(true);
        setError(null);
        const paginationPayload = {
          page,
          itemsPerPage,
        };
        if (!pagination || reset) {
          const newPage = initialPage ? initialPage : 1;
          setPage(newPage);
          setData(initialData);
          paginationPayload.page = newPage;
        } else {
          const newPage = page + 1;
          if (totalPages && newPage > totalPages) {
            // reached the last page
            return;
          }
          paginationPayload.page = newPage;
          setPage(newPage);
        }
        const { results, total_pages } = await fetcher(
          params,
          paginationPayload
        );
        let newData = results;
        if (pagination) {
          if (!reset) {
            newData = data.concat(results);
          }
          setTotalPages((prev) => {
            if (prev) {
              return prev;
            }
            return total_pages;
          });
        }
        setData(newData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [fetcher, page, itemsPerPage, totalPages, data, initialPage, initialData]
  );

  return {
    data,
    loading,
    error,
    hasError: !!error,
    handleLoadData,
    totalPages,
    finished: !totalPages || page === totalPages,
    page,
  };
}
