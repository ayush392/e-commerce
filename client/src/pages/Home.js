// Navbar, slideshow, product by gender, product by category, ........., footer

import React from "react";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import { useNavigate } from "react-router-dom";

const categoryData = [
  { id: 1, title: "Men Jeans", category: "Jeans", gender: "Men" },
  { id: 2, title: "Women dresses", category: "dress", gender: "Women" },
  { id: 3, title: "Men Kurtas", category: "Kurta", gender: "Men" },
  { id: 4, title: "Sarees", category: "Saree", gender: "Women" },
  { id: 5, title: "Fashion Tops", category: "Top", gender: "Women" },
  { id: 6, title: "Women Jeans", category: "Jeans", gender: "Women" },
];

function Card({ data }) {
  const navigate = useNavigate();

  const navigateToProducts = ({ gender, category }) => {
    navigate(`/products/?gender=${gender}&category=${category}`);
  };

  return (
    <>
      <div className="col-6 col-md-4 col-lg-2">
        <div className="hover_shadow" onClick={() => navigateToProducts(data)}>
          <img
            className="d-block w-100"
            src={
              data.gender === "Men" && data.category === "Jeans"
                ? `./images/men_jeans.webp`
                : `./images/${data.category}.webp`
            }
            alt={data.title}
          />
          <div className="mb-3 py-2 h5 bg-light-subtle">{data.title}</div>
        </div>
      </div>
    </>
  );
}

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Carousel />
      {/* <div>Home</div> */}
      <div className="container mb-3 mb-lg-5 ">
        <div className="row">
          <div
            className="col-12 col-sm-6 gx-lg-5"
            onClick={() => navigate(`/products/?gender=Men`)}
          >
            <img
              className="d-block w-100 pointer"
              src="./banners/lhs.jpg"
              alt=".."
            />
          </div>
          <div
            className="col-12 col-sm-6 gx-lg-5"
            onClick={() => navigate(`/products/?gender=Women`)}
          >
            <img
              className="d-block w-100 pointer"
              src="./banners/rhs.webp"
              alt=".."
            />
          </div>
        </div>
      </div>

      <div className="container-fluid mb-3 mb-lg-5 text-center ">
        <h1 className="mb-4">Shop by category</h1>
        <div className=" row ">
          {categoryData.map((data) => (
            <Card key={data.id} data={data} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
