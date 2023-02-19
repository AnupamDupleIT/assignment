import React, { useState } from "react";
import Categories from "../MainPage/Categories";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider";
import ShopCart from "./ShopCart";
import "./style.css";

const Shop = ({ shopItems }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [stars, setStars] = useState(5);
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  const filteredItems = shopItems?.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesPrice = item.price >= minPrice && item.price <= maxPrice;
    const matchStarts = Math.ceil(item?.rating) === stars;
    const matchesSearchQuery = item?.title
      ?.toLowerCase()
      .includes(searchQuery?.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearchQuery && matchStarts;
  });

  const getRating = (val) => {
    const rating = val;
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <i
            onClick={() => setStars(i)}
            className="fa fa-star text-[#ffcd4e] cursor-pointer text-xl"
            key={i}
          ></i>
        );
      } else {
        stars.push(
          <i
            onClick={() => setStars(i)}
            className="fa fa-star text-gray-400 cursor-pointer text-xl"
            key={i}
          ></i>
        );
      }
    }

    return stars;
  };

  return (
    <>
      <section className="shop background ">
        <div className=" md:flex container">
          <div className="w-full md:w-[400px] px-5">
            <div className="text-2xl mb-3 font-semibold">Filter</div>
            <div>
              <div className="mb-4">
                <label
                  for="email"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Search Product
                </label>
                <input
                  value={searchQuery}
                  required
                  onChange={handleSearch}
                  placeholder="Search Product ..."
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-[#e94560]  border-[#e94560] rounded-md focus:border-pink-400 focus:ring-[#e58494] focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-4">
                <label
                  for="email"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Ratings
                </label>
                <div className="my-2">{getRating(stars)}</div>{" "}
              </div>
              <div className="mb-4">
                <label
                  for="email"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Price Range
                </label>

                <MultiRangeSlider
                  min={0}
                  max={2000}
                  onChange={({ min, max }) => {
                    setMinPrice(Number(min));
                    setMaxPrice(Number(max));
                  }}
                />
              </div>

            
            </div>
            <div
                className="block text-sm font-semibold text-gray-800  mt-20"
              >
                Category
              </div>
            <div className="category">
              <Categories
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
              />
            </div>
          </div>
          <div className="w-full px-5">
            <div className="heading d_flex">
              <div className="heading-left row  f_flex  ">
                <h2 className="capitalize text-xl font-bold border-b-2">
                  {selectedCategory !== "" ? selectedCategory : "All"}
                </h2>
              </div>
              <div className="heading-right row "></div>
            </div>
            {filteredItems?.length > 0 ? (
              <div className="product-content  grid1 border-gray-700 w-full">
                <ShopCart shopItems={filteredItems} />
              </div>
            ) : (
              <div className="my-5  flex justify-center     align-items-center text-3xl font-semibold w-full h-96">
                No Product Found!
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
