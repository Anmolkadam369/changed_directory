import React, { useState ,useEffect} from 'react';
import './UserIV1.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';

function UserIV1() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    useEffect(() => {
        console.log("token", token, userId);
        if (token === "" || userId === "") {
          navigate("/");
        }
      }, [token, userId, navigate]);    
    function submittedHere(){
        navigate('../CraneUser')
    }
    return (
        <div>
            <div className="useriv1-elem-5">
                <div className="useriv1-elem-4">
                    <div className="useriv1-elem-3"> </div>
                    <div className="useriv1-elem-2">
                        <span className="useriv1-elem-1">
                            <p>BVC ClaimPro Assist </p>
                        </span>
                    </div>
                </div>
                <div className="useriv1-elem-15">
                    <span className="useriv1-elem-16">
                        <p>Corporate Plans</p>
                    </span>
                    <div className="useriv1-elem-14">
                        <div className="useriv1-elem-13">
                            <span className="useriv1-elem-6">
                                <p>Starter</p>
                            </span>
                            <span className="useriv1-elem-12">
                                <p>Save time and money,</p>
                            </span>
                            <span className="useriv1-elem-10">
                                <p>Rs 500/-</p>
                            </span>
                            <span className="useriv1-elem-11">
                                <p>per vehicle, billed annually (Minimum 200 Vehicles)</p>
                            </span>
                            <button className="useriv1-elem-59" onClick={submittedHere}>
                                <p>Get Started</p>
                            </button>
                            <div className="useriv1-elem-9">
                                <div className="useriv1-elem-8">
                                    <i className="fas fa-times useriv1-elem-56"></i>
                                    <span className="useriv1-elem-7">
                                        <p>On-spot Repair</p>
                                    </span>
                                </div>
                                <div className="useriv1-elem-21">
                                    <i className="fas fa-times useriv1-elem-57"></i>
                                    <span className="useriv1-elem-20">
                                        <p>Cranes</p>
                                    </span>
                                </div>
                                <div className="useriv1-elem-19">
                                    <i className="fas fa-times useriv1-elem-17"></i>
                                    <span className="useriv1-elem-18">
                                        <p>Advocate</p>
                                    </span>
                                </div>
                                <div className="useriv1-elem-23">
                                    <i className="fas fa-check useriv1-elem-58"></i>
                                    <span className="useriv1-elem-22">
                                        <p>Workshop</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="useriv1-elem-55">
                            <span className="useriv1-elem-39">
                                <p>Plus</p>
                            </span>
                            <span className="useriv1-elem-84">
                                <p>Save time and money,</p>
                            </span>
                            <span className="useriv1-elem-53">
                                <p>Rs 1000/-</p>
                            </span>
                            <span className="useriv1-elem-54">
                                <p>per vehicle, billed annually (Minimum 200 Vehicles)</p>
                            </span>
                            <button className="useriv1-elem-52" onClick={submittedHere}>
                                <p>Get Started</p>
                            </button>
                            <div className="useriv1-elem-51">
                                <div className="useriv1-elem-42">
                                    <i className="fas fa-check useriv1-elem-40"></i>
                                    <span className="useriv1-elem-41">
                                        <p>On-spot Repair</p>
                                    </span>
                                </div>
                                <div className="useriv1-elem-48">
                                    <i className="fas fa-check useriv1-elem-46"></i>
                                    <span className="useriv1-elem-47">
                                        <p>Cranes</p>
                                    </span>
                                </div>
                                <div className="useriv1-elem-45">
                                    <i className="fas fa-times useriv1-elem-43"></i>
                                    <span className="useriv1-elem-44">
                                        <p>Advocate</p>
                                    </span>
                                </div>
                                <div className="useriv1-elem-50">
                                    <i className="fas fa-check useriv1-elem-83"></i>
                                    <span className="useriv1-elem-49">
                                        <p>Workshop</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="useriv1-elem-38">
                            <span className="useriv1-elem-24">
                                <p>Pro</p>
                            </span>
                            <span className="useriv1-elem-85">
                                <p>Save time and money,</p>
                            </span>
                            <span className="useriv1-elem-36">
                                <p>Rs 1500/-</p>
                            </span>
                            <span className="useriv1-elem-37">
                                <p>per vehicle, billed annually (Minimum 200 Vehicles)</p>
                            </span>
                            <button className="useriv1-elem-60" onClick={submittedHere}>
                                <p>Get Started</p>
                            </button>
                            <div className="useriv1-elem-35">
                                <div className="useriv1-elem-27">
                                    <i className="fas fa-check useriv1-elem-25"></i>
                                    <span className="useriv1-elem-26">
                                        <p>On-Spot Repair</p>
                                    </span>
                                </div>
                                <div className="useriv1-elem-32">
                                    <i className="fas fa-check useriv1-elem-30"></i>
                                    <span className="useriv1-elem-31">
                                        <p>Cranes</p>
                                    </span>
                                </div>
                                <div className="useriv1-elem-29">
                                    <i className="fas fa-check useriv1-elem-61"></i>
                                    <span className="useriv1-elem-28">
                                        <p>Advocate</p>
                                    </span>
                                </div>
                                <div className="useriv1-elem-34">
                                    <i className="fas fa-check useriv1-elem-62"></i>
                                    <span className="useriv1-elem-33">
                                        <p>Workshop</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container useriv1-elem-82">
                    <span className="useriv1-elem-63">
                        <img src="https://res.cloudinary.com/dbyioi2qq/q_auto/v1705838029/static/logo_page-0001jpg_1705838020_75147.jpg" alt="Logo" />
                    </span>
                    <div className="useriv1-elem-81">
                        <div className="useriv1-elem-70">
                            <div className="useriv1-elem-69">
                                <span className="cd-paragraph-clean useriv1-elem-64">
                                    <p>Company</p>
                                </span>
                                <span className="cd-paragraph-clean useriv1-elem-65">
                                    <p>Legal</p>
                                </span>
                                <span className="cd-paragraph-clean useriv1-elem-66">
                                    <p>Terms &amp; Condition</p>
                                </span>
                                <span className="cd-paragraph-clean useriv1-elem-67">
                                    <p>Privacy policy</p>
                                </span>
                                <span className="cd-paragraph-clean useriv1-elem-68">
                                    <p>Cookies Policy</p>
                                </span>
                            </div>
                        </div>
                        <div className="useriv1-elem-80">
                            <div className="useriv1-elem-74">
                                <span className="cd-paragraph-clean useriv1-elem-71">
                                    <p>Reach us</p>
                                </span>
                                <span className="cd-paragraph-clean useriv1-elem-72">
                                    <a href="tel:0000000000" className="link" target="_self">
                                        <p>+91-</p>
                                    </a>
                                </span>
                                <span className="cd-paragraph-clean useriv1-elem-73">
                                    <a href="mailto:example@email.com" className="link" target="_self">
                                        <p>info@claimpro.in</p>
                                    </a>
                                </span>
                            </div>
                            <div className="useriv1-elem-79">
                                <span className="useriv1-elem-75">
                                    <img src="https://res.cloudinary.com/dbyioi2qq/q_auto/v1658039695/static/twitter-brands-1svg_1658039694_28808.svg" alt="Twitter" />
                                </span>
                                <span className="useriv1-elem-76">
                                    <img src="https://res.cloudinary.com/dbyioi2qq/q_auto/v1658039695/static/facebook-f-brands-1svg_1658039694_37683.svg" alt="Facebook" />
                                </span>
                                <span className="useriv1-elem-77">
                                    <img src="https://res.cloudinary.com/dbyioi2qq/q_auto/v1658039695/static/instagram-brands-1svg_1658039694_41229.svg" alt="Instagram" />
                                </span>
                                <span className="useriv1-elem-78">
                                    <img src="https://res.cloudinary.com/dbyioi2qq/q_auto/v1658039695/static/youtube-brands-1svg_1658039694_73913.svg" alt="Youtube" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserIV1;