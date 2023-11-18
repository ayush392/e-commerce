import React from "react";
import { useGetFiltersQuery } from "../redux/apiSlices/productsApiSlice";
import { useSearchParams } from "react-router-dom";

function Filters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, isError, isSuccess } = useGetFiltersQuery(
    searchParams.toString()
  );

  const handleClick = () => {
    setSearchParams({ gender: "Women" });
  };

  return (
    <div style={{ width: "250px" }}>
      {console.log(data)}
      <div className=" d-flex justify-content-between align-items-center ps-3 py-3 border-bottom">
        <h5 className="mb-0">FILTERS</h5>
        <p className="mb-0 me-2 text-orange fw-bolder small-2 ">CLEAR ALL</p>
      </div>
      <div className="  ps-3 py-3 border-end border-bottom ">
        <h6 className="mb-2 pb-1 ">GENDER</h6>
        <>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault2"
              id="flexRadioDefault2"
            />
            <label class="form-check-label" for="flexRadioDefault2">
              Men
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault2"
              id="flexRadioDefault2"
            />
            <label class="form-check-label" for="flexRadioDefault2">
              Women
            </label>
          </div>
        </>
      </div>

      <div className="  ps-3 py-3 border-end border-bottom ">
        <h6 className="mb-2 pb-1 ">CATEGORIES</h6>
        {data?.categories.map((category, i) => {
          return (
            <div key={i} class="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={category}
                id="defaultCheck1"
              />
              <label class="form-check-label">{category}</label>
            </div>
          );
        })}
      </div>

      <div className="  ps-3 py-3 border-end border-bottom ">
        <h6 className="mb-2 pb-1 ">BRAND</h6>
        {data?.brands.slice(0, 8).map((brand, i) => {
          return (
            <div key={i} class="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={brand}
                id="defaultCheck1"
              />
              <label class="form-check-label">{brand}</label>
            </div>
          );
        })}
      </div>

      <div className="  ps-3 py-3 border-end border-bottom ">
        <h6 className="mb-2 pb-1 ">PRICE</h6>
        <>
          <div class="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="0-499"
              id="defaultCheck1"
            />
            <label class="form-check-label">Below Rs. 499</label>
          </div>

          <div class="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="500-1999"
              id="defaultCheck1"
            />
            <label class="form-check-label">Rs. 500 to Rs. 1999</label>
          </div>

          <div class="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="2000-10000"
              id="defaultCheck1"
            />
            <label class="form-check-label">Rs. 2000 and Above</label>
          </div>
        </>
      </div>

      <div className="  ps-3 py-3 border-end border-bottom ">
        <h6 className="mb-2 pb-1 ">COLOR</h6>
        {data?.colors.slice(1, 8).map((color, i) => {
          return (
            <div key={i} class="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={color}
                id="defaultCheck1"
              />
              <label class="form-check-label">{color}</label>
            </div>
          );
        })}
      </div>

      <div className="  ps-3 py-3 border-end border-bottom ">
        <h6 className="mb-2 pb-1 ">DISCOUNT RANGE</h6>
        <>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />
            <label class="form-check-label" for="flexRadioDefault1">
              20% and above
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />
            <label class="form-check-label" for="flexRadioDefault1">
              50% and above
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />
            <label class="form-check-label" for="flexRadioDefault1">
              80% and above
            </label>
          </div>
        </>
      </div>

      <button
        className="btn btn-danger w-100 sticky-bottom "
        onClick={handleClick}
      >
        Apply Filter
      </button>
    </div>
  );
}

export default Filters;
