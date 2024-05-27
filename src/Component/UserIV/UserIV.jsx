import React, { useState, useEffect } from 'react';
import './UserIV.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
function UserIV() {
  const navigate = useNavigate();
  const token = useRecoilValue(tokenState);
  const userId = useRecoilValue(userIdState);
  useEffect(() => {
    console.log("token", token, userId);
    if (token === "" || userId === "") {
      navigate("/");
    }
  }, [token, userId, navigate]);

  function submitted() {
    navigate('../UserIV1')
  }
  return (
    <div>
      <div className="useriv-elem-5">
        <div className="useriv-elem-4">
          <div className="useriv-eleFm-3"> </div>
          <div className="useriv-elem-2">
            <span className="useriv-elem-1">
              <p>BVC ClaimPro Assist </p>
            </span>
          </div>
        </div>
      </div>
      <div className="useriv-elem-31">
        <div className="useriv-elem-8">
          <span className="cd-paragraph-clean useriv-elem-6">
            <p>How Can we help You?</p>
          </span>
          <span className="cd-paragraph-clean useriv-elem-7">
            <p><strong><u>Please select</u></strong></p>
          </span>
        </div>
        <div className="useriv-elem-30 containerServce">
        </div>
      </div>
      <button className="useriv-elem-56" onClick={submitted}>
        <p>Submit</p>
      </button>
      <div className="container useriv-elem-55">
        <span className="useriv-elem-36">
          <img src="https://res.cloudinary.com/dbyioi2qq/q_auto/v1705838029/static/logo_page-0001jpg_1705838020_75147.jpg" />
        </span>
        <div className="useriv-elem-54">
          <div className="useriv-elem-43">
            <div className="useriv-elem-42">
              <span className="cd-paragraph-clean useriv-elem-37">
                <p>Company</p>
              </span>
              <span className="cd-paragraph-clean useriv-elem-38">
                <p>Legal</p>
              </span>
              <span className="cd-paragraph-clean useriv-elem-39">
                <p>Terms &amp; Condition</p>
              </span>
              <span className="cd-paragraph-clean useriv-elem-40">
                <p>Privacy policy</p>
              </span>
              <span className="cd-paragraph-clean useriv-elem-41">
                <p>Cookies Policy</p>
              </span>
            </div>
          </div>
          <div className="useriv-elem-53">
            <div className="useriv-elem-47">
              <span className="cd-paragraph-clean useriv-elem-44">
                <p>Reach us</p>
              </span>
              <span className="cd-paragraph-clean useriv-elem-45">
                <a href="tel:0000000000" className="link" target="_self">
                  <p>+91-</p>
                </a>
              </span>
              <span className="cd-paragraph-clean useriv-elem-46">
                <a href="mailto:example@email.com" className="link" target="_self">
                  <p>info@claimpro.in</p>
                </a>
              </span>
            </div>
            <div className="useriv-elem-52">
              <span className="useriv-elem-48">
                <img src="https://res.cloudinary.com/dbyioi2qq/q_auto/v1658039695/static/twitter-brands-1svg_1658039694_28808.svg" />
              </span>
              <span className="useriv-elem-49">
                <img src="https://res.cloudinary.com/dbyioi2qq/q_auto/v1658039695/static/facebook-f-brands-1svg_1658039694_37683.svg" />
              </span>
              <span className="useriv-elem-50">
                <img src="https://res.cloudinary.com/dbyioi2qq/q_auto/v1658039695/static/instagram-brands-1svg_1658039694_41229.svg" />
              </span>
              <span className="useriv-elem-51">
                <img src="https://res.cloudinary.com/dbyioi2qq/q_auto/v1658039695/static/youtube-brands-1svg_1658039694_73913.svg" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserIV;
