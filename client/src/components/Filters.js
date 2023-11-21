import { useGetFiltersQuery } from "../redux/apiSlices/productsApiSlice";
import { useSearchParams } from "react-router-dom";

function Filters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, isError, isSuccess } = useGetFiltersQuery(
    searchParams.toString()
  );

  // handle gender change
  const handleGenderChange = (e) => {
    const { value } = e.target;
    setSearchParams({ gender: value });
  };

  // handle category, brand, color change
  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    if (searchParams.has(name)) {
      if (checked) {
        const prevVal = searchParams.get(name);
        const newVal = prevVal + "," + value;
        searchParams.set(name, newVal);
      } else {
        const prevVal = searchParams.get(name);
        const newVal = prevVal.replace("," + value, "");
        if (newVal === "," || newVal === "") {
          searchParams.delete(name);
        } else {
          searchParams.set(name, newVal);
        }
      }
    } else {
      searchParams.append(name, "," + value);
    }
    setSearchParams(searchParams);
  };

  // handle price, discount change
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    searchParams.set(name, value);
    setSearchParams(searchParams);
  };

  const isChecked = (name, value) => {
    if (searchParams.has(name)) {
      const val = searchParams.get(name);
      return val.includes(value);
    }
    return false;
  };

  const handleClearFilters = () => {
    setSearchParams({});
  };

  return (
    <div style={{ width: "250px" }}>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Something went wrong</div>}
      {/* {console.log(searchParams.toString())} */}
      <div className=" d-flex justify-content-between align-items-center ps-3 py-3 border-bottom">
        <h5 className="mb-0">FILTERS</h5>
        <p
          className="mb-0 me-2 text-orange fw-bolder small-2 "
          role="button"
          onClick={handleClearFilters}
        >
          CLEAR ALL
        </p>
      </div>
      {isSuccess && (
        <>
          <div className="  ps-3 py-3 border-end border-bottom ">
            <h6 className="mb-2 pb-1 ">GENDER</h6>
            <>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="Men"
                  id="gender_men"
                  onChange={handleGenderChange}
                  checked={isChecked("gender", "Men")}
                />
                <label className="form-check-label" htmlFor="gender_men">
                  Men
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="Women"
                  onChange={handleGenderChange}
                  checked={isChecked("gender", "Women")}
                  id="gender_women"
                />
                <label className="form-check-label" htmlFor="gender_women">
                  Women
                </label>
              </div>
            </>
          </div>

          <div className="  ps-3 py-3 border-end border-bottom ">
            <h6 className="mb-2 pb-1 ">CATEGORIES</h6>
            {data?.categories.map((category, i) => {
              return (
                <div key={i} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={category}
                    name="category"
                    onChange={handleCheckboxChange}
                    checked={isChecked("category", category)}
                    id="defaultCheck1"
                  />
                  <label className="form-check-label">{category}</label>
                </div>
              );
            })}
          </div>

          <div className="  ps-3 py-3 border-end border-bottom ">
            <h6 className="mb-2 pb-1 ">BRAND</h6>
            {data?.brands.slice(0, 8).map((brand, i) => {
              return (
                <div key={i} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={brand}
                    name="brands"
                    onChange={handleCheckboxChange}
                    checked={isChecked("brands", brand)}
                    id="defaultCheck1"
                  />
                  <label className="form-check-label">{brand}</label>
                </div>
              );
            })}
          </div>

          <div className="  ps-3 py-3 border-end border-bottom ">
            <h6 className="mb-2 pb-1 ">PRICE</h6>
            <>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="0,499"
                  name="price"
                  onChange={handleRadioChange}
                  checked={isChecked("price", "0,499")}
                  id="defaultCheck1"
                />
                <label className="form-check-label">Below Rs. 499</label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="500,1999"
                  name="price"
                  onChange={handleRadioChange}
                  checked={isChecked("price", "500,1999")}
                  id="defaultCheck1"
                />
                <label className="form-check-label">Rs. 500 to Rs. 1999</label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="2000,100000"
                  name="price"
                  onChange={handleRadioChange}
                  checked={isChecked("price", "2000,100000")}
                  id="defaultCheck1"
                />
                <label className="form-check-label">Rs. 2000 and Above</label>
              </div>
            </>
          </div>

          <div className="  ps-3 py-3 border-end border-bottom ">
            <h6 className="mb-2 pb-1 ">COLOR</h6>
            {data?.colors.slice(1, 8).map((color, i) => {
              return (
                <div key={i} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={color}
                    name="colors"
                    onChange={handleCheckboxChange}
                    checked={isChecked("colors", color)}
                    id="defaultCheck1"
                  />
                  <label className="form-check-label">{color}</label>
                </div>
              );
            })}
          </div>

          <div className="  ps-3 py-3 border-end border-bottom ">
            <h6 className="mb-2 pb-1 ">DISCOUNT RANGE</h6>
            <>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="discount"
                  value="20"
                  onChange={handleRadioChange}
                  checked={isChecked("discount", "20")}
                  id="flexRadioDefault1"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  20% and above
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="discount"
                  value="50"
                  onChange={handleRadioChange}
                  checked={isChecked("discount", "50")}
                  id="flexRadioDefault1"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  50% and above
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="discount"
                  value="80"
                  onChange={handleRadioChange}
                  checked={isChecked("discount", "80")}
                  id="flexRadioDefault1"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  80% and above
                </label>
              </div>
            </>
          </div>
        </>
      )}
    </div>
  );
}

export default Filters;
