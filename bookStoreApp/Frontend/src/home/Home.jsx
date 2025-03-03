import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Freebook from "../components/Freebook";
import Footer from "../components/Footer";
import  { useState } from "react";
import Bestseller from "../components/Bestseller";
import ComingSoon from "../components/ComingSoon";
import EveryoneTalkingAbout from "../components/EveryoneTalkingAbout";
import RecentlyReviewed from "../components/RecentlyReviewed";
import Placard from "../components/Placard";
import Placardtwo from "../components/Placardtwo";
import Cover from "../components/Cover";
import Navbartwo from "../components/Navbartwo";
function Home() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  return (
    <>
      <Navbar  />
      <div className="w-full h-3"></div>
      {/* <Navbartwo/> */}
      <Banner />
      <Cover/>
      {/* <Placard/> */}
      <Bestseller/>
    
      <Freebook />
      <Placardtwo/>
      <EveryoneTalkingAbout/>
      <ComingSoon/>
      <Cover/>
      
      <RecentlyReviewed/>
      <Placard/>
      
      <Footer  />
    </>
  );
}

export default Home;
