import React from "react";
import { useGetProductsQuery } from "../redux/apiSlices/productsApiSlice";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";

function Products() {
  const { data, isLoading, isError, isSuccess } = useGetProductsQuery();
  return (
    <>
      <Navbar />
      <div className="mb-2"></div>
      <div className="d-flex">
        <div>
          <Filters />
        </div>
        <div>
          <div className="py-2 my-1 border-bottom text-end ">
            <button className="btn btn-outline-secondary me-5">
              Sort by: <b>Recommended </b>
            </button>
          </div>

          <div className="pt-3 container ">
            {isLoading && <div>Loading...</div>}
            {isError && <div>Something went wrong</div>}
            {isSuccess && (
              <div className="d-flex flex-wrap justify-content-evenly">
                {data.slice(0, 50).map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
