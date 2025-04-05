import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import logo from '../../../src/Assets/navbar/logo.svg';
import rightarrow from '../../../src/Assets/navbar/right-arrow.svg';
import bras from '../../../src/Assets/navbar/bras.svg';
import cancel from '../../../src/Assets/navbar/cancel.svg';

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const closeSidebar = () => setOpen(false);

  return (
    <>
      <header>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <div className="flex items-center gap-[24px]">
          <div onClick={() => navigate("/newLoginPage")} className="bg-[#21A6E9] flex py-[5px] rounded-full pr-[6px] pl-[26px]">
            <button className="font-satoshi font-[400] text-[18px] leading-[33.6px] pr-[56px] text-[#FFFFFF]">Log In</button>
            <img src={rightarrow} className="h-[40px] w-[40px]" alt="" />
          </div>
          <button onClick={() => setOpen(!open)} className="">
            <img src={bras} alt="" />
          </button>
        </div>
        <ul
          className="header-list items-start"
          style={{ right: open ? "0" : "-3000px" }}
        >
          <button onClick={() => setOpen(!open)} className="absolute top-[24px] md:left-[90%] left-[75%]">
            <img src={cancel} className="md:h-[38px] h-[16px] md:w-[38px] w-[16px]" alt="" />
          </button>
          <div className="flex h-full justify-center w-full md:items-start items-start md:pt-0 pt-[20px]">
            <ul className="flex header-lists justify-center flex-col items-start md:gap-[42px] gap-[20px]">
              <li onClick={closeSidebar} className="list-item">
                <Link to="/">HOME</Link>
              </li>
              <li onClick={closeSidebar} className="list-item">
                <Link to="">ABOUT US</Link>
              </li>
              <li onClick={closeSidebar} className="list-item">
                <Link to="/crane-service">SERVICE</Link>
              </li>
              <li onClick={closeSidebar} className="list-item">
                <Link to="">SCRAP</Link>
              </li>
              <li onClick={closeSidebar} className="list-item">
                <Link to="">BLOG</Link>
              </li>
              <li onClick={closeSidebar} className="list-item">
                <Link to="/contact-us">CONTACT US</Link>
              </li>
              {/* <div onClick={addVMobile} className="bg-[#21A6E9] flex md:hidden py-[5px] rounded-full pr-[6px] pl-[26px] ml-[-20px]">
                <button className="font-satoshi font-[400] text-[18px] leading-[33.6px] text-[#FFFFFF]">Add Vehicle</button>
                <img src="/assets/navbar/right-arrow.svg" alt="" />
              </div> */}
            </ul>
          </div>
        </ul>
      </header>
    </>
  );
}


export default Navbar;
