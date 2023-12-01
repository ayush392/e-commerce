import { useNavigate } from "react-router-dom";
import { useRemoveFromWishlistMutation } from "../redux/apiSlices/wishlistApiSlice";

function WishCard({ product }) {
  const navigate = useNavigate();
  const [deleteFromCart, {}] = useRemoveFromWishlistMutation();

  const handleRemoveFromCart = async (productId) => {
    try {
      const res = await deleteFromCart({ _id: productId }).unwrap();
      console.log(res);
      if (res) alert("Removed from wishlist");
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Please try again later");
    }
  };

  const handleNavigation = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <div
      className="m-3 mb-4 border position-relative"
      style={{ width: "13.125rem" }}
    >
      <img
        className="d-block w-100 mb-3 pointer "
        src={product.imageUrl}
        alt=""
        style={{ height: "17.5rem" }}
        onClick={handleNavigation}
      />
      <div className=" ps-2 mb-3">
        <p className=" text-secondary  mb-2 small">
          {`${product.title.slice(0, 25)}...`}
        </p>
        <div>
          <span className=" fw-bolder ">Rs. {product.price}</span>
          <span className="ms-2 small-2 text-decoration-line-through ">
            Rs. {product.mrp}
          </span>
          <span className="ms-2 small-2 text-orange">{`(${product.discount}% OFF)`}</span>
        </div>
      </div>
      <div>
        <button className="btn rounded-0  text-orange fw-semibold w-100 border-top py-2 small">
          Move to Bag
        </button>
      </div>
      <button
        type="button"
        className="btn-close position-absolute top-0 end-0 small-2 mt-2 me-2"
        onClick={() => handleRemoveFromCart(product._id)}
      ></button>
    </div>
  );
}

export default WishCard;
