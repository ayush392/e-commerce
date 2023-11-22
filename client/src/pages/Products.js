import React from "react";
import { useGetProductsQuery } from "../redux/apiSlices/productsApiSlice";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import { useSearchParams } from "react-router-dom";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, isError, isSuccess } = useGetProductsQuery(
    searchParams.toString()
  );

  const handleSortChange = (e) => {
    const { name, value } = e.target;
    searchParams.set(name, value);
    setSearchParams(searchParams);
  };

  const getSortValue = () => {
    if (searchParams.has("sort")) {
      return searchParams.get("sort").toString();
    }
    return "recommended";
  };

  return (
    <>
      <Navbar />
      <div className="mb-2"></div>
      <div className="d-flex">
        <div>
          <Filters />
        </div>
        <div className="w-100">
          <div className="container py-2 my-1 border-bottom ">
            <div
              className="input-group ms-auto pe-4 me-3"
              style={{ maxWidth: "300px" }}
            >
              <div
                className="input-group-text bg-transparent"
                id="btnGroupAddon"
              >
                Sort by:
              </div>
              <select
                className="form-select fw-semibold "
                name="sort"
                value={getSortValue()}
                onChange={handleSortChange}
              >
                <option value="recommended">Recommended</option>
                <option value="discount">Better Discount</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="pt-3 container ">
            {isLoading && <div>Loading...</div>}
            {isError && <div>Something went wrong</div>}
            {isSuccess && data.length > 0 && (
              <div className="d-flex flex-wrap justify-content-evenly">
                {data.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
            {isSuccess && data && data.length <= 0 && (
              <div className="text-secondary text-center">
                <h1>No products found</h1>
                <h3>Try applying less filters</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
