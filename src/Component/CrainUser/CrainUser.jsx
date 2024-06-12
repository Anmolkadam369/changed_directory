import React, { useState,useEffect } from 'react';
import './CrainUser.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';

function CrainUser() {
    const navigate = useNavigate();
  const token = useRecoilValue(tokenState);
  const userId = useRecoilValue(userIdState);
    useEffect(() => {
        console.log("token", token, userId);
        if (token === "" || userId === "") {
          navigate("/");
        }
      }, [token, userId, navigate]);
      
    function sendToHome() {
        console.log("SOMe");
        navigate('/');
    }

    return (    
        <div>
            <div className="craneuser-elem-10">
                <div className="craneuser-elem-9">
                    <div className="craneuser-elem-8"> </div>
                    <div className="craneuser-elem-2">
                        <span className="craneuser-elem-1">
                            <p>BVC ClaimPro Assist</p>
                        </span>
                    </div>
                    <div className="craneuser-elem-7">
                        <div className="craneuser-elem-6">
                            <span className="craneuser-elem-3">
                                    <div onClick={sendToHome}><p>Home</p></div>
                            </span>
                            <span className="craneuser-elem-4">
                                <a href="#DivMZVC" className="link" target="_self">
                                    <p>Contact Us</p>
                                </a>
                            </span>
                            <span className="craneuser-elem-5">
                                <a href="#DivFlyW" className="link" target="_self">
                                    <p>Raise Invoice</p>
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="craneuser-elem-27">
                <div className="craneuser-elem-12">
                    <span className="cd-paragraph-clean craneuser-elem-11">
                        <p>Pick and drop Location</p>
                    </span>
                </div>
                <div className="craneuser-elem-26">
                    <div className="craneuser-elem-25">
                        <div className="craneuser-elem-15">
                            <span className="cd-paragraph-clean craneuser-elem-13">
                                <p>Email</p>
                            </span>
                            <span className="cd-paragraph-clean craneuser-elem-14">
                                <p>info@experiya.in</p>
                            </span>
                        </div>
                        <div className="craneuser-elem-20">
                            <i className="fas fa-phone-alt craneuser-elem-16"></i>
                            <span className="cd-paragraph-clean craneuser-elem-17">
                                <p>Phone</p>
                            </span>
                            <span className="cd-paragraph-clean craneuser-elem-18">
                                <p>+1 987 456 321</p>
                            </span>
                            <span className="cd-paragraph-clean craneuser-elem-19">
                                <p>+1 987 456 321</p>
                            </span>
                        </div>
                        <div className="craneuser-elem-24">
                            <i className="fas fa-map-marker-alt craneuser-elem-21"></i>
                            <span className="cd-paragraph-clean craneuser-elem-22">
                                <p>Location</p>
                            </span>
                            <span className="cd-paragraph-clean craneuser-elem-23">
                                <p>123 Sample road Jaipur - 302001</p>
                            </span>
                        </div>
                    </div>
                    <div className="craneuser-elem-28">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6532898.031606963!2d-128.56189395958117!3d36.91685569804434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb9fe5f285e3d%3A0x8b5109a227086f55!2sCalifornia%2C%20USA!5e0!3m2!1sen!2sin!4v1667670501533!5m2!1sen!2sin" width="100%" height="100%" style={{ border: '0' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CrainUser;