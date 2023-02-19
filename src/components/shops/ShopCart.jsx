import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";
const ShopCart = ({ shopItems }) => {
  const { onAdd, userAuth } = useStateContext();
  const history = useHistory();

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
    <>
      { shopItems?.map((item, index) => {
            return (
              <div className="box " key={item?.id}>
                <div className="product mtop">
                  <Link
                    to={{
                      pathname: `/${item?.id}`,
                    }}
                  >
                    <div className="img">
                      <span className="discount">
                        {Math.ceil(item?.discountPercentage)}% Off
                      </span>
                      <div className="object-contain  my-2  aspect-video p-5 flex justify-center">
                        <img
                          loading="lazy"
                          className=""
                          src={item?.images[0]}
                          alt=""
                        />
                      </div>{" "}
                    </div>
                  </Link>
                  <div className="product-details">
                    <h3 className="capitalize text-xl font-semibold">
                      {item?.title}
                    </h3>
                    <p className="text-lg capitalize ">
                      ({item.category.replaceAll("-", " ")})
                    </p>
                    <div className="">
                      {getRating(Math.ceil(item?.rating))}
                    </div>
                    <div className="price">
                      <h4 className="text-xl font-semibold">
                        {" "}
                        ${item?.price}.00{" "}
                      </h4>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          if (userAuth) {
                            onAdd(item, 1);
                          } else {
                            
                            history.push("/login");
                          }
                        }}
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        }
    </>
  );
};

export default ShopCart;
