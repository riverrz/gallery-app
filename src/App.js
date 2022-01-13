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
import filterOptions from "./constants/filters.json";
import { getValidFilters } from "./helpers";

const DEFAULT_FILTERS = filterOptions.reduce((acc, { key, choices }) => {
  const defaultChoice = choices.find((choice) => {
    return !!choice.default;
  });
  acc[key] = defaultChoice ? defaultChoice.value : "*";
  return acc;
}, {});

function App() {
  const [appliedFilters, setAppliedFilters] = useState(DEFAULT_FILTERS);
  const [searchVal, setSearchVal] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const getSearchResults = useCallback(
    ({ query, filters }, { page, itemsPerPage }) => {
      return searchPhotosByQuery({
        query,
        page,
        per_page: itemsPerPage,
        filters: getValidFilters(filters),
      });
    },
    []
  );

  const getPhotosByCollectionId = useCallback(
    async ({ collectionId, filters }) => {
      const results = await getCollectionPhotos({
        collectionId,
        filters: getValidFilters(filters),
      });
      return { results };
    },
    []
  );

  const { data, loading, error, handleLoadData, finished, reset } = useApi({
    itemsPerPage: 15,
  });

  useEffect(() => {
    reset();
    if (searchVal) {
      handleLoadData(
        { query: searchVal, filters: appliedFilters },
        getSearchResults,
        true,
        true
      );
    } else {
      handleLoadData(
        { collectionId: STAR_WARS_COLLECTION_ID, filters: appliedFilters },
        getPhotosByCollectionId,
        false,
        true
      );
    }
  }, [searchVal, appliedFilters]);

  const handlePaginatedLoadData = useCallback(() => {
    handleLoadData(
      { query: searchVal, filters: appliedFilters },
      getSearchResults,
      true,
      false
    );
  }, [searchVal, handleLoadData, getSearchResults, appliedFilters]);

  const onSearchValueChange = useMemo(() => {
    return debounce(setSearchVal, 300);
  }, []);

  const toggleShowFilters = useCallback(() => {
    setShowFilters((prev) => !prev);
  }, []);

  const onFilterOptionChange = useCallback((option, value) => {
    setAppliedFilters((prevFilters) => ({ ...prevFilters, [option]: value }));
  }, []);

  const onClearFilters = useCallback(() => {
    setAppliedFilters(DEFAULT_FILTERS);
    setShowFilters(false);
  }, []);

  const showNoResultsFound = (!loading && data.length === 0) || !!error;

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
          <Filters
            onClear={onClearFilters}
            appliedFilters={appliedFilters}
            onFilterChange={onFilterOptionChange}
          />
        </div>
      )}
      <div className="mt-12">
        <InfiniteScroll
          finished={finished || !!error}
          loadData={handlePaginatedLoadData}
          loading={loading}
        >
          {showNoResultsFound && (
            <p className="text-center">No results found</p>
          )}
          <ImageGrid data={data} />
        </InfiniteScroll>
        {loading && (
          <p className="text-center">
            <Loader />
          </p>
        )}
      </div>
    </main>
  );
}

export default App;
