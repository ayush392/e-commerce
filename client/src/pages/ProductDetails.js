import React, { useEffect, useState } from "react";
import { useGetSingleProductQuery } from "../redux/apiSlices/productsApiSlice";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAddToCartMutation } from "../redux/apiSlices/cartApiSlice";

function ProductDetails() {
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess } = useGetSingleProductQuery(id);
  const [image, setImage] = useState(data?.imageUrl);
  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();
  const [selectedSize, setSelectedSize] = useState("");
  const dummyImageUrl =
    "https://img.freepik.com/premium-photo/care-instructions-label_624181-6411.jpg?size=626";

  useEffect(() => {
    setImage(data?.imageUrl);
  }, [data]);

  const handleAddToCart = async (product) => {
    // console.log(product);
    if (selectedSize === "") {
      return alert("Please select a size");
    }
    try {
      const data = await addToCart(product).unwrap();
      alert("Added to cart");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      {isError && <div>Something went wrong</div>}
      {isLoading && <div>Loading...</div>}
      {isSuccess && (
        <div className="container">
          <br />
          <div className="row">
            <div className=" text-end col ps-4 pe-0">
              <div className="d-flex flex-column ">
                <img
                  className={`mw-100 border rounded border-secondary mb-3 ${
                    data.imageUrl === image && "shadow border-2 border-orange"
                  }`}
                  style={{ cursor: "pointer", maxHeight: "114px" }}
                  src={data.imageUrl}
                  alt=""
                  onClick={() => setImage(data.imageUrl)}
                />
                <img
                  className={`mw-100 border rounded border-secondary mb-3 ${
                    dummyImageUrl === image && "shadow border-2 border-orange"
                  }`}
                  style={{ cursor: "pointer", maxHeight: "114px" }}
                  src={dummyImageUrl}
                  alt=""
                  onClick={() => setImage(dummyImageUrl)}
                />
              </div>
            </div>

            <div className="text-center col-12 col-md-5 ">
              <img className=" mw-100 " src={image} alt="" />
            </div>

            <div className=" col-12 col-md-6 ">
              <h3 className=" fw-semibold">{data.brand}</h3>
              <h4 className=" fw-normal  text-secondary">{data.title}</h4>
              <p className="border my-1 d-inline-block px-2 py-1">
                <b>4.1 ⭐</b>{" "}
                <span className="text-secondary">| 392 Ratings</span>
              </p>
              <hr />

              <div className="mb-3">
                <span className="h3 fw-bold me-3">{`Rs. ${data.price}`}</span>
                <span className="h4 text-secondary fw-normal me-3">
                  MRP{" "}
                  <span className=" text-decoration-line-through ">
                    Rs.{data.mrp}
                  </span>
                </span>
                <span className="h4 fw-bold text-orange">{`(${data.discount}% OFF)`}</span>

                <p className=" mt-1 fw-bold text-success">
                  inclusive of all taxes
                </p>
              </div>

              <div className="mb-3">
                <h5 className="py-1 mb-2">SELECT SIZE</h5>
                <div className=" d-flex ">
                  {data.sizes.length > 0 ? (
                    data.sizes.map((size, i) => {
                      return (
                        <div
                          key={i}
                          className={`border rounded-circle me-lg-3 me-2 ${
                            selectedSize === size && "text-orange border-orange"
                          }`}
                          role="button"
                          style={{ width: "50px", height: "50px" }}
                          onClick={() => setSelectedSize(size)}
                        >
                          <h6 className={`m-0 p-3 text-center fw-bold `}>
                            {size}
                          </h6>
                        </div>
                      );
                    })
                  ) : (
                    <div
                      className="border rounded-pill me-2"
                      style={{ height: "50px" }}
                    >
                      <h6 className="m-0 p-3 text-center fw-bold ">Onesize</h6>
                    </div>
                  )}
                </div>
              </div>

              <div className="my-4 py-lg-2 ">
                <button
                  className="btn btn-primary me-3 px-5 py-2 fw-semibold "
                  onClick={() =>
                    handleAddToCart({
                      productId: data._id,
                      quantity: 1,
                      size: selectedSize,
                    })
                  }
                >
                  <span className="me-2">🛒</span>ADD TO CART
                </button>
                <button className="btn btn-outline-dark px-5 py-2 fw-semibold ">
                  <span className="me-2">🤍</span>WISHLIST
                </button>
              </div>

              <div>
                <h5>DESCRIPTION</h5>
                <p className="mb-2">{data.description}</p>
                <p className="mb-0"> 100% Original Products </p>
                <p className="mb-0"> Pay on delivery available </p>
                <p className="mb-0"> Easy 14 days returns and exchanges </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
