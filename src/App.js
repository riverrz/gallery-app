import { useState, useCallback, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import useApi from "./hooks/useApi";
import {
  searchPhotosByQuery,
  getCollectionPhotos,
} from "./services/unsplash.service";
import { Button, Loader, Search } from "./components/atoms";
import ImageGrid from "./components/ImageGrid";
import Filters from "./components/Filters";
import InfiniteScroll from "./hoc/InfiniteScroll";
import { STAR_WARS_COLLECTION_ID } from "./constants/common";

function App() {
  const [appliedFilters, setAppliedFilters] = useState({});
  const [searchVal, setSearchVal] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const getSearchResults = useCallback(
    (query, { page, itemsPerPage }) =>
      searchPhotosByQuery({ query, page, per_page: itemsPerPage }),
    []
  );

  const getPhotosByCollectionId = useCallback(async (collectionId) => {
    const results = await getCollectionPhotos(collectionId);
    return { results };
  }, []);

  const { data, loading, error, handleLoadData, finished, reset } = useApi({
    itemsPerPage: 15,
  });

  useEffect(() => {
    if (searchVal) {
      handleLoadData(searchVal, getSearchResults, true, true);
    } else {
      reset();
      handleLoadData(
        STAR_WARS_COLLECTION_ID,
        getPhotosByCollectionId,
        false,
        true
      );
    }
  }, [searchVal]);

  const handlePaginatedLoadData = useCallback(() => {
    handleLoadData(searchVal, getSearchResults, true, false);
  }, [searchVal, handleLoadData, getSearchResults]);

  const onSearchValueChange = useMemo(() => {
    return debounce(setSearchVal, 300);
  }, []);

  const toggleShowFilters = useCallback(() => {
    setShowFilters((prev) => !prev);
  }, []);

  return (
    <main className="container">
      <div className="flex perfect-center">
        <div className="mr-12 flex-grow">
          <Search onChange={onSearchValueChange} />
        </div>
        <div>
          <Button onClick={toggleShowFilters}>Filters</Button>
        </div>
      </div>
      {showFilters && (
        <div className="mt-12">
          <Filters onClear={toggleShowFilters} />
        </div>
      )}
      <div className="mt-12">
        <InfiniteScroll
          finished={finished || !!error}
          loadData={handlePaginatedLoadData}
          loading={loading}
        >
          {!loading && data.length === 0 && (
            <p className="text-center">No results found</p>
          )}
          <ImageGrid data={data} />
        </InfiniteScroll>
        {loading && (
          <p className="text-center">
            <Loader />
          </p>
        )}
        {error && <p className="error-text">{error.message}</p>}
      </div>
    </main>
  );
}

export default App;
