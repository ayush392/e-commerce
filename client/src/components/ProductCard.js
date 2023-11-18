import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="mb-5 hover_shadow"
      style={{ width: "13.125rem" }}
    >
      <img
        className="d-block w-100 mb-1"
        src={product.imageUrl}
        alt=""
        style={{ height: "17.5rem" }}
      />
      <div className=" ps-2 pb-2">
        <p className=" fw-bolder mb-1">{product.brand}</p>
        <p className=" text-secondary  mb-1 small">
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
    </div>
  );
}

export default ProductCard;
