import React from "react";
import { toast } from "react-hot-toast";
import { useStateContext } from "../../context/StateContext";
import "./style.css";
import Confetti from "react-confetti";
import { useState } from "react";

const Cart = () => {
  const { totalPrice,clearCartItems, cartItems, toggleCartItemQuantity, onRemove } =
    useStateContext();

  const [show, setShow] = useState(false);

  return (
    <>
      <section className="cart-items mt-20">
        <div className="container md:flex w-full">
          <div className=" w-full md:w-[70vw]">
            {cartItems?.length === 0 && (
              <h1 className="no-items product">No Items are add in Cart</h1>
            )}

            {cartItems?.map((item) => {
              return (
                <div className=" product  md:flex justify-between  " key={item.id}>
                       <div className="w-full text-right md:hidden">
                      <button
                        className=""
                        onClick={() => onRemove(item)}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                  <div className="img m-2 flex gap-4 w-full  ">
                    <img   src={item?.images[0]} loading="lazy" alt="" />
                    <div className="cart-details  w-full">
                    <h3 className="capitalize">{item?.title}</h3>
                    <p className="text-lg capitalize ">
                      ({item?.category.replaceAll("-", " ")})
                    </p>
                    <h4>
                      ${item?.price}.00 * {item?.qty}
                      <span>${item?.quantity}.00</span>
                    </h4>
                    
                  </div>
             
                  </div>
               
              
                  <div className="cart-items-function flex w-full">
                
                    <div className="cartControl flex justify-end w-full">
                      
                      <button
                        className="incCart"
                        onClick={() => toggleCartItemQuantity(item?.id, "inc")}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                      <button
                        className="desCart "
                        onClick={() => toggleCartItemQuantity(item?.id, "desc")}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                    </div>
                  </div>
                  <div className=" text-right hidden md:block">
                      <button
                        className=""
                        onClick={() => onRemove(item)}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                 
                </div>
              );
            })}
          </div>

          <div className="w-full md:w-[30vw] product">
            <h2>Cart Summary</h2>
            <div className=" d_flex">
              <h4 >Total Price :</h4>
              <h3 className="text-xl font-semibold">${totalPrice}.00</h3>
            </div>
          {cartItems.length>0 &&  <div>
              <button
                className="border-solid border-2 mt-10 w-full border-[#e94560]  hover:bg-[#f93758] hover:text-white  text-[#e94560] font-bold py-2 px-4 rounded"
                onClick={async (e) => {
                  e.preventDefault();
                   
                  setShow(true);
                  toast.success("Product Perchased Successfully");
                  clearCartItems()
                  setTimeout(() => {
                    setShow(false);
                  }, 6000);
                }}
              >
                <i class="fa fa-shopping-cart" aria-hidden="true"></i> Buy Now
              </button>
            </div>}
          </div>
        </div>
      </section>
      {show && <Confetti />}
    </>
  );
};

export default Cart;
