import React from "react";
//outlet used to render contents of nested routes (eg. home page to other page url... helps to render contents of the other pages of a website)
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

//arrow function - shorthand way to write functions in js
const Main = () => {
  return (
    <div>
      {/* rendering the header, outlet and footer components */}
      <Header />
      {/* renders all contents between header and footer */}
      <Outlet />  
      <Footer />
    </div>
  );
};

export default Main;

//rafce -- kind of boiler plate code
