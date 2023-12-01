import React from "react";
import WishCard from "../components/WishCard";
import { useGetWishlistItemsQuery } from "../redux/apiSlices/wishlistApiSlice";
import Navbar from "../components/Navbar";

function Wishlist() {
  const { data, isLoading, isError, isSuccess } = useGetWishlistItemsQuery();
  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="pt-2 my-4">
          My Wishlist{" "}
          <span className="h3 fw-normal "> {data?.length} items </span>
        </h2>
        {isError && <div>Something went wrong</div>}
        {isLoading && <div>Loading...</div>}
        {isSuccess && data.length > 0 && (
          <div className="d-flex flex-wrap justify-content-evenly">
            {data.map((item) => (
              <WishCard key={item._id} product={item.product} />
            ))}
          </div>
        )}
        {console.log(data)}
      </div>
    </>
  );
}

export default Wishlist;
