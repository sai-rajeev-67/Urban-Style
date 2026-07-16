import React from "react";
import { useSearchParams } from "react-router-dom";
import ProductList from "./ProductList";

const SearchResults = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q");

  return (
    <div className="container py-4">
      <h2 className="mb-4">
        Search Results for "{query}"
      </h2>

      <ProductList searchQuery={query} />
    </div>
  );
};

export default SearchResults;