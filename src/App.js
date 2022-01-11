import { useState, useCallback, useEffect, useMemo } from "react";
import useApi from "./hooks/useApi";
import { searchPhotosByQuery } from "./services/unsplash.service";
import { Button, Search } from "./components/atoms";
import ImageGrid from "./components/ImageGrid";
import InfiniteScroll from "./hoc/InfiniteScroll";
import debounce from "lodash.debounce";

function App() {
  const [appliedFilters, setAppliedFilters] = useState({});
  const [searchVal, setSearchVal] = useState("");

  const getSearchResults = useCallback(
    (query, { page, itemsPerPage }) =>
      searchPhotosByQuery({ query, page, per_page: itemsPerPage }),
    []
  );

  const { data, loading, error, handleLoadData, totalPages, finished, page } =
    useApi({
      fetcher: getSearchResults,
      itemsPerPage: 15,
    });

  useEffect(() => {
    if (searchVal) {
      handleLoadData(searchVal, true, true);
    }
  }, [searchVal]);

  const handlePaginatedLoadData = useCallback(() => {
    handleLoadData(searchVal, true, false);
  }, [searchVal, handleLoadData]);

  const onSearchValueChange = useMemo((val) => {
    return debounce(setSearchVal, 300);
  }, []);

  console.log({ page, finished, totalPages });

  return (
    <main className="container">
      <div className="flex perfect-center">
        <div className="mr-12 flex-grow">
          <Search onChange={onSearchValueChange} />
        </div>
        <div>
          <Button>Filters</Button>
        </div>
      </div>
      <div className="mt-12">
        <InfiniteScroll
          finished={finished}
          loadData={handlePaginatedLoadData}
          loading={loading}
        >
          <ImageGrid data={data} />
        </InfiniteScroll>
        {loading && <p>Loading...</p>}
        {error && <p>{error.message}</p>}
      </div>
    </main>
  );
}

export default App;
