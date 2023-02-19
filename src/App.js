import React from "react";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import Cart from "./common/Cart/Cart";
import Header from "./common/header/Header";
import { StateContext, useStateContext } from "./context/StateContext";
import Login from "./pages/Login";
import Pages from "./pages/Pages";
import ProductDetails from "./pages/Productdetails";
function App() {
  const { userAuth } = useStateContext();

  const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location.pathname },
            }}
          />
        )
      }
    />
  );
  return (
    <>
      <StateContext>
        <Toaster />
        <Router>
          <Header />

          <Switch>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/" exact>
              <Pages />
            </Route>

            <PrivateRoute
              path="/cart"
              isAuthenticated={
                userAuth !== undefined || userAuth !== null ? true : false
              }
              component={(props) => <Cart {...props} />}
            />

            <Route path="/:product" exact>
              <ProductDetails />{" "}
            </Route>
          </Switch>
        </Router>
      </StateContext>
    </>
  );
}

export default App;
