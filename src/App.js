import { useState, useCallback, useEffect } from "react";
import useApi from "./hooks/useApi";
import { searchPhotosByQuery } from "./services/unsplash.service";
import { Button, Search } from "./components/atoms";
import ImageGrid from "./components/ImageGrid";

function App() {
  const [appliedFilters, setAppliedFilters] = useState({});
  const [searchVal, setSearchVal] = useState("");

  const getSearchResults = useCallback(
    (query, { page, itemsPerPage }) =>
      searchPhotosByQuery({ query, page, per_page: itemsPerPage }),
    []
  );

  const { data, loading, error, handleLoadDataLazily } = useApi({
    fetcher: getSearchResults,
    itemsPerPage: 12,
  });

  function handleSearchValChange(e) {
    const { value } = e.target;
    setSearchVal(value);
  }

  useEffect(() => {
    if (searchVal) {
      handleLoadDataLazily(searchVal);
    }
  }, [searchVal, handleLoadDataLazily]);

  return (
    <main className="container">
      <div className="flex perfect-center">
        <div className="mr-12 flex-grow">
          <Search value={searchVal} onChange={handleSearchValChange} />
        </div>
        <div>
          <Button>Filters</Button>
        </div>
      </div>
      <div className="mt-12">
        <ImageGrid data={data} />
        {loading && <p>Loading...</p>}
        {error && <p>{error.message}</p>}
      </div>
    </main>
  );
}

export default App;
