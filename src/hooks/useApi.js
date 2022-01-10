import { useState, useCallback, useMemo } from "react";
import debounce from "lodash.debounce";

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

  const handleLoadData = useCallback(
    async (params, pagination = false) => {
      try {
        setLoading(true);
        setError(null);
        const paginationPayload = {
          page,
          itemsPerPage,
        };
        if (!pagination) {
          setPage(initialPage);
          setData(initialData);
          paginationPayload.page = initialPage;
        } else {
          let newPage = page + 1;
          paginationPayload.page = newPage;
          setPage(newPage);
        }
        const response = await fetcher(params, paginationPayload);
        let newData = response;
        if (pagination) {
          newData = data.concat(response);
        }
        setData(newData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [fetcher, page, itemsPerPage]
  );

  const handleLoadDataLazily = useMemo(() => {
    return debounce(handleLoadData, debounceTimeout);
  }, [handleLoadData, debounceTimeout]);

  return {
    data,
    loading,
    error,
    hasError: !!error,
    handleLoadData,
    handleLoadDataLazily,
  };
}
