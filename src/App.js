import { useState, useCallback, useEffect } from "react";
import useApi from "./hooks/useApi";
import { searchCollectionsByQuery } from "./services/unsplash.service";
import { Search } from "./components/atoms";

function App() {
  const [appliedFilters, setAppliedFilters] = useState({});
  const [searchVal, setSearchVal] = useState("");

  const getSearchResults = useCallback(
    (query, { page, itemsPerPage }) =>
      searchCollectionsByQuery({ query, page, per_page: itemsPerPage }),
    []
  );

  const { data, loading, error, handleLoadDataLazily } = useApi({
    fetcher: getSearchResults,
  });

  function handleSearchValChange(e) {
    const { value } = e.target;
    setSearchVal(value);
  }

  useEffect(() => {
    handleLoadDataLazily(searchVal);
  }, [searchVal]);

  return (
    <main className="container">
      <div className="flex perfect-center">
        <Search value={searchVal} onChange={handleSearchValChange} />
      </div>
    </main>
  );
}

export default App;
