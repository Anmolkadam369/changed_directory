import React, { useState } from 'react';
import './AdvocateUser.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function AdvocateUser(){
return (
    <div>
        <div className="advocatepage-elem-10">
      <div className="advocatepage-elem-9">
        <div className="advocatepage-elem-8"></div>
        <div className="advocatepage-elem-2">
          <span className="advocatepage-elem-1">
            <p>Claim Pro Assist</p>
          </span>
        </div>
        <div className="advocatepage-elem-7">
          <div className="advocatepage-elem-6">
            <span className="advocatepage-elem-3">
              <a href="home.html" className="link" target="_self">
                <p>Home</p>
              </a>
            </span>
            <span className="advocatepage-elem-4">
              <a href="#DivMZVC" className="link" target="_self">
                <p>Contact Us</p>
              </a>
            </span>
            <span className="advocatepage-elem-5">
              <a href="#DivFlyW" className="link" target="_self">
                <p>Raise Invoice</p>
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div className="advocatepage-elem-11">
      <div className="advocatepage-elem-12">
        <span className="advocatepage-elem-13">
          <p>Details</p>
        </span>
      </div>
      <div className="advocatepage-elem-14">
        <div className="advocatepage-elem-16">
          <span className="advocatepage-elem-15">
            <p>HR-46-D-XX99</p>
          </span>
          <span className="advocatepage-elem-17">
            <p>OWNER NAME- </p>
          </span>
          <span className="advocatepage-elem-72">
            <p>LOCATION - JAIPUR</p>
          </span>
          <span className="advocatepage-elem-73">
            <p>PS - YXZ THANA POLICE STATION</p>
          </span>
        </div>
        <div className="advocatepage-elem-16">
          <span className="advocatepage-elem-15">
            <p>HR-46-D-XX99</p>
          </span>
          <span className="advocatepage-elem-17">
            <p>OWNER NAME- </p>
          </span>
          <span className="advocatepage-elem-72">
            <p>LOCATION - JAIPUR</p>
          </span>
          <span className="advocatepage-elem-73">
            <p>PS - YXZ THANA POLICE STATION</p>
          </span>
        </div>
        <div className="advocatepage-elem-16">
          <span className="advocatepage-elem-15">
            <p>HR-46-D-XX99</p>
          </span>
          <span className="advocatepage-elem-17">
            <p>OWNER NAME- </p>
          </span>
          <span className="advocatepage-elem-72">
            <p>LOCATION - JAIPUR</p>
          </span>
          <span className="advocatepage-elem-73">
            <p>PS - YXZ THANA POLICE STATION</p>
          </span>
        </div>
        <div className="advocatepage-elem-16">
          <span className="advocatepage-elem-15">
            <p>HR-46-D-XX99</p>
          </span>
          <span className="advocatepage-elem-17">
            <p>OWNER NAME- </p>
          </span>
          <span className="advocatepage-elem-72">
            <p>LOCATION - JAIPUR</p>
          </span>
          <span className="advocatepage-elem-73">
            <p>PS - YXZ THANA POLICE STATION</p>
          </span>
        </div>
        <div className="advocatepage-elem-16">
          <span className="advocatepage-elem-15">
            <p>HR-46-D-XX99</p>
          </span>
          <span className="advocatepage-elem-17">
            <p>OWNER NAME- </p>
          </span>
          <span className="advocatepage-elem-72">
            <p>LOCATION - JAIPUR</p>
          </span>
          <span className="advocatepage-elem-73">
            <p>PS - YXZ THANA POLICE STATION</p>
          </span>
        </div>
        <div className="advocatepage-elem-16">
          <span className="advocatepage-elem-15">
            <p>HR-46-D-XX99</p>
          </span>
          <span className="advocatepage-elem-17">
            <p>OWNER NAME- </p>
          </span>
          <span className="advocatepage-elem-72">
            <p>LOCATION - JAIPUR</p>
          </span>
          <span className="advocatepage-elem-73">
            <p>PS - YXZ THANA POLICE STATION</p>
          </span>
        </div>
        {/* Repeat similar structures for other elements */}
      </div>
    </div>
    <div className="container advocatepage-elem-112">
      <span className="advocatepage-elem-93">
        <img src="https://res.cloudinary.com/dbyioi2qq/q_auto/v1705838029/static/logo_page-0001jpg_1705838020_75147.jpg" />
      </span>
      <div className="advocatepage-elem-111">
        <div className="advocatepage-elem-100">
          <div className="advocatepage-elem-99">
            <span className="cd-paragraph-clean advocatepage-elem-94">
              <p>Company</p>
            </span>
            <span className="cd-paragraph-clean advocatepage-elem-95">
              <p>Legal</p>
            </span>
            <span className="cd-paragraph-clean advocatepage-elem-96">
              <p>Terms &amp; Condition</p>
            </span>
            <span className="cd-paragraph-clean advocatepage-elem-97">
              <p>Privacy policy</p>
            </span>
            <span className="cd-paragraph-clean advocatepage-elem-98">
              <p>Cookies Policy</p>
            </span>
          </div>
        </div>
        <div className="advocatepage-elem-110">
          <div className="advocatepage-elem-104">
            <span className="cd-paragraph-clean advocatepage-elem-101">
              <p>Reach us</p>
            </span>
            <span className="cd-paragraph-clean advocatepage-elem-102">
              <a href="tel:0000000000" className="link" target="_self">
                <p>+91-</p>
              </a>
            </span>
            <span className="cd-paragraph-clean advocatepage-elem-103">
              <a href="mailto:example@email.com" className="link" target="_self">
                <p>info@claimpro.in</p>
              </a>
            </span>
          </div>
          <div className="advocatepage-elem-109">
            <span className="advocatepage-elem-105">
              <img src="https://res.cloudinary.com/dbyioi2qq/q_auto/v1658039695/static/twitter-brands-1svg_1658039694_28808.svg" />
            </span>
            <span className="advocatepage-elem-106">
              <img src="https://res.cloudinary.com/dbyioi2qq/q_auto/v1658039695/static/facebook-f-brands-1svg_1658039694_37683.svg" />
            </span>
            <span className="advocatepage-elem-107">
              <img src="https://res.cloudinary.com/dbyioi2qq/q_auto/v1658039695/static/instagram-brands-1svg_1658039694_41229.svg" />
            </span>
            <span className="advocatepage-elem-108">
              <img src="https://res.cloudinary.com/dbyioi2qq/q_auto/v1658039695/static/youtube-brands-1svg_1658039694_73913.svg" />
            </span>
          </div>
        </div>
      </div>
    </div>
    </div>
)
}
export default AdvocateUser;