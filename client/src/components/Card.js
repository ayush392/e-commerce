import { useState } from "react";
import {
  useUpdateCartMutation,
  useDeleteFromCartMutation,
} from "../redux/apiSlices/cartApiSlice";

function Card({ product, quantity, size }) {
  const { _id, imageUrl, brand, sizes, title, price, mrp, discount } = product;
  const [selectedSize, setSelectedSize] = useState(size);
  const [selectedQty, setSelectedQty] = useState(quantity);
  const [updateCart] = useUpdateCartMutation();
  const [deleteFromCart] = useDeleteFromCartMutation();

  const handleCartUpdate = async (quantity, size) => {
    try {
      console.log(_id, quantity, size);
      const res = await updateCart({ _id, quantity, size });
      // console.log(res.data);
      if (res.data.length > 0) alert("Cart updated successfully");
    } catch (error) {
      if (error.status === 500)
        alert("Something went wrong. Please try again later");
      if (error.status === 401) alert("Please login to continue");
      console.log(error);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      if (
        window.confirm("Are you sure you want to remove this item from cart?")
      ) {
        const res = await deleteFromCart({ _id: productId });
        console.log(res.data);
        if (res.data) alert("Item removed from cart");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Please try again later");
    }
  };

  return (
    <div
      className="d-flex border rounded w-100 p-2 mb-3 position-relative"
      style={{ height: "10rem" }}
    >
      <div>
        <img src={imageUrl} alt="..." className=" d-block h-100" />
      </div>
      <div className="ps-2 ms-1 d-flex flex-column justify-content-evenly h-100 ">
        <small className=" fw-semibold ">{brand}</small>
        <small className="small-2">{title}</small>

        <div className="d-flex">
          <div className="me-2">
            <small>Size: </small>
            <select
              className="small-2 fw-semibold"
              name="size"
              value={selectedSize}
              onChange={(e) => (
                setSelectedSize(e.target.value),
                handleCartUpdate(selectedQty, e.target.value)
              )}
            >
              {sizes.map((size, i) => (
                <option key={i} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="me-2">
            <small>Quantity: </small>
            <select
              className="small-2 fw-semibold"
              name="quantity"
              value={selectedQty}
              onChange={(e) => (
                console.log(e.target.value),
                setSelectedQty(e.target.value),
                handleCartUpdate(e.target.value, selectedSize)
              )}
            >
              <option value="1"> 1</option>
              <option value="2"> 2</option>
              <option value="3"> 3</option>
              <option value="4"> 4</option>
            </select>
          </div>
        </div>

        <div className="small mt-1">
          <span className=" fw-semibold">Rs.{price * selectedQty}</span>
          <span className="ms-2 text-secondary text-decoration-line-through ">
            Rs.{mrp * selectedQty}
          </span>
          <span className="ms-2 text-orange">{`${discount}% OFF`}</span>
        </div>

        <small className="small-2 m-0 text-secondary">
          <span className=" fw-semibold ">14 days</span> return available
        </small>
      </div>
      <button
        type="button"
        className="btn-close position-absolute end-0 me-2"
        onClick={() => handleRemoveFromCart(_id)}
      ></button>
    </div>
  );
}

export default Card;
