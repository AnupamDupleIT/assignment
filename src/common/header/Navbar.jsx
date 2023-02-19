import React from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";
const Navbar = () => {
  const { totalQuantity, userAuth, logoutUser } = useStateContext();
  return (
    <>
      <section className="search">
        <div className="container c_flex">
          <div className="logo width ">
            <Link to="/">
              <h2 className="text-uppercase text-[#e94560] text-2xl font-bold">
                Ecart
              </h2>
            </Link>
          </div>
          <div className="icon f_flex width ">
            {userAuth?.email ? (
              <div className="">
                <div>{userAuth.email}</div>

                <div
                  onClick={() => logoutUser()}
                  className="text-[#e94560] w-full text-right cursor-pointer hover:underline"
                >
                  Log out
                </div>
              </div>
            ) : (
              <Link to="/login">
                <span className="hover:text-[#e94560]">Sign in</span>
              </Link>
            )}
            <div className="cart">
              <Link to="/cart">
                <i className="fa fa-shopping-bag icon-circle"></i>
                <span>{totalQuantity}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Navbar;
