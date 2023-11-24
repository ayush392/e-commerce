import { useEffect, useState } from "react";
import { useGetCartItemsQuery } from "../redux/apiSlices/cartApiSlice";
import Card from "../components/Card";

function Cart() {
  const { data, isLoading, isError, isSuccess } = useGetCartItemsQuery();
  const [totalMrp, setTotalMrp] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  function getTotalMrp() {
    let mrp = data.reduce((acc, item) => {
      return (acc += Number(item.product.mrp) * Number(item.quantity));
    }, 0);
    setTotalMrp(mrp);
    return mrp;
  }

  function getTotalPrice() {
    let price = data.reduce((acc, item) => {
      return (acc += item.product.price * item.quantity);
    }, 0);
    setTotalPrice(price);
    return price;
  }

  useEffect(() => {
    if (isSuccess) {
      let mrp = Number(getTotalMrp());
      let price = Number(getTotalPrice());
      setTotalDiscount(mrp - price);
    }
  }, [isSuccess, data]);

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {isError && <h1>Something went wrong</h1>}
      {isSuccess && data.length === 0 && (
        <div className="container text-center w-100">
          <h1 className="mt-5 pt-5 text-center ">Your cart is empty</h1>
          <button className="btn btn-dark mt-4 py-2 px-3">
            Continue Shopping
          </button>
        </div>
      )}
      {isSuccess && data.length > 0 && (
        <div className="container m-auto " style={{ maxWidth: "980px" }}>
          <h2 className="mb-4">Shopping cart</h2>
          <div className="row">
            <div className="col me-3 pe-4 border-end ">
              {data.map((item) => (
                <Card
                  key={item._id}
                  product={item.product}
                  quantity={item.quantity}
                  size={item.size}
                />
              ))}
            </div>
            <div className="col-md-4">
              <div className="">
                <h5 className="mb-3">{`Price Details (${data.length} items)`}</h5>
                <div className="d-flex justify-content-between ">
                  <p>Total MRP</p>
                  <p>{`Rs. ${totalMrp}`}</p>
                </div>

                <div className="d-flex justify-content-between ">
                  <p>Discount on MRP</p>
                  <p className=" text-success ">{`- Rs. ${totalDiscount}`}</p>
                </div>

                <div className="d-flex justify-content-between ">
                  <p>Shippping Fee</p>
                  <p className=" text-success">FREE</p>
                </div>

                <hr className=" mt-0 pt-0 text-secondary " />

                <div className="d-flex fw-bold justify-content-between ">
                  <p>Total Amount</p>
                  <p>{`Rs. ${totalPrice}`}</p>
                </div>

                <button className="w-100 fw-semibold py-2 btn btn-primary rounded-0 ">
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
