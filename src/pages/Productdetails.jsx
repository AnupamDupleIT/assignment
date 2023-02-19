/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useHistory, useParams } from "react-router-dom";
import { useStateContext } from "../context/StateContext";
import Confetti from "react-confetti";

const ProductDetails = () => {
  const [show, setShow] = useState(false);
  const history = useHistory();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(history.location.state || null);
  const { qty, onAdd, userAuth } = useStateContext();
  const [index, setIndex] = useState(0);

  const getSingleProducts = async (val) => {
    try {
      setLoading(true);
      await fetch(`https://dummyjson.com/products/${val}`)
        .then((res) => res.json())
        .then((json) => {
          setLoading(false);
          setProduct(json);
        });
    } catch (e) {
      setLoading(false);
      toast.error(e?.message);
    }
  };
  useEffect(() => {
    getSingleProducts(params?.product);
  }, []);

  const getRating = (val) => {
    const rating = val;
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<i className="fa fa-star text-[#ffcd4e]" key={i}></i>);
      } else {
        stars.push(<i className="fa fa-star text-gray-400" key={i}></i>);
      }
    }

    return stars;
  };
  return (
    <div className="mt-40 flex justify-center align-items-center">
      {loading ? (
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 md:h-64 md:w-64"></div>
      ) : (
        <>
          <div className="box flex flex-col md:flex-row gap-5 container ">
            <div className=" w-full md:w-[600px]">
              <div className="product  ">
                <span className="discount">
                  {" "}
                  {Math.ceil(product?.discountPercentage)}% Off
                </span>
                <div className="object-contain  my-2  aspect-square p-5  flex justify-center">
                  <img loading="lazy" src={product?.images[index]} alt="" />
                </div>{" "}
              </div>
              <div className="small-images-container">
                {product?.images?.map((item, i) => (
                  <img
                    key={i}
                    src={item}
                    className={
                      i === index
                        ? "small-image selected-image shadow"
                        : "small-image"
                    }
                    onMouseOver={() => setIndex(i)}
                  />
                ))}
              </div>
            </div>
            <div className="product-details w-full mt-10 md:mx-10 md:mt-0">
              <h3 className="text-3xl font-semibold capitalize">
                {product?.title}
              </h3>
              <p className="text-lg capitalize ">
                ({product?.category.replaceAll("-", " ")})
              </p>
              <div className="">{getRating(Math.ceil(product?.rating))}</div>
              <div className="">
                <h4 className="text-xl font-semibold">${product?.price}.00 </h4>
                <p className="my-5 text-[#475569]">
                  {product?.description}
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable. If you are going to use a passage of
                  Lorem Ipsum, you need to be sure there isn't anything
                  embarrassing hidden in the middle of text. All the Lorem Ipsum
                  generators on the Internet tend to repeat predefined chunks as
                  necessary, making this the first true generator on the
                  Internet. It uses a dictionary of over 200 Latin words,
                  combined with a handful of model sentence structures, to
                  generate Lorem Ipsum which looks reasonable. The generated
                  Lorem Ipsum is therefore always free from repetition
                </p>
                <div className="flex gap-4">
                  <button
                    className="bg-[#e94560] hover:bg-[#f93758] text-white font-bold py-2 px-4 rounded w-full md:w-40"
                    onClick={(e) => {
                      e.preventDefault();
                      if (userAuth) {
                        onAdd(product, qty);
                      } else {
                        history.push("/login");
                      }
                    }}
                  >
                    <i className="fa fa-plus"></i> Add To Cart
                  </button>
                  <button
                    className="border-solid border-2 border-[#e94560]  hover:bg-[#f93758] hover:text-white w-full md:w-40 text-[#e94560] font-bold py-2 px-4 rounded"
                    onClick={async (e) => {
                      e.preventDefault();
                      if (userAuth) {
                        setShow(true);
                        toast.success("Product Perchased Successfully");
                        setTimeout(() => {
                          setShow(false);
                        }, 6000);
                      } else {
                        history.push("/login");
                      }
                    }}
                  >
                    <i class="fa fa-shopping-cart" aria-hidden="true"></i> Buy
                    Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {show && <Confetti />}
    </div>
  );
};

export default ProductDetails;
