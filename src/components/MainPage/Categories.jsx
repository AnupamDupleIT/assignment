import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Categories = ({ selectedCategory, setSelectedCategory }) => {
  const [category, setCategory] = useState([]);

  const getCategoryList = async () => {
    try {
      await fetch("https://dummyjson.com/products/categories")
        .then((res) => res.json())
        .then((json) => setCategory(json));
    } catch (e) {}
  };
  useEffect(() => {
    getCategoryList();
  }, []);
  return (
    <>
      <div className="flex w-full justify-between gap-2 align  text-left  items-center md:items-start md:flex-col md:justify-start md:align-items-start ">
        <div
          onClick={() => {
            setSelectedCategory("All");
          }}
          className={`${
            selectedCategory === "All"
              ? "text-[#e94560] bg-white p-2 rounded-xl shadow-md md:shadow-none"
              : ""
          } flex flex-col categoryItem gap-2 md:flex-row  cursor-pointer align-items-start bg-white p-2 rounded-xl`}
        >
          <span className="text-center md:text-left text-sm@  md:text-base capitalize">
            All
          </span>
        </div>
        {category?.map((value, index) => {
          return (
            <div
              onClick={() => {
                setSelectedCategory(value);
              }}
              className={`${
                selectedCategory.toLowerCase() === value.toLowerCase()
                  ? "text-[#e94560] bg-white p-2 rounded-xl shadow-md md:shadow-none"
                  : ""
              } flex flex-col categoryItem gap-2 md:flex-row  cursor-pointer align-items-start bg-white p-2 rounded-xl`}
              key={index}
            >
              <div className="flex justify-center "></div>
              <span className="text-center md:text-left text-sm@  md:text-base capitalize">
                {value.replaceAll("-", " ")}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Categories;
