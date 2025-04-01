import React, { useEffect } from 'react';
import './Location2.css';
import { useNavigate } from 'react-router-dom'


function Location2() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    useEffect(() => {
        console.log("token", token, userId);
        if (token === "" || userId === "") {
          navigate("/");
        }
      }, [token, userId, navigate]);
    function submitted(){
        navigate('../UserIV')
    }
    return (
        <div>
            <div className="location2-elem-5">
                <div className="location2-elem-4">
                    <div className="location2-elem-3"></div>
                    <div className="location2-elem-2">
                        <span className="location2-elem-1">
                            <p>BVC ClaimPro Assist</p>
                        </span>
                    </div>
                </div>
            </div>
            <div className="location2-elem-65">
                <div className="location2-elem-64">
                    <div className="location2-elem-63">
                        <span className="cd-paragraph-clean location2-elem-50">
                            <p>Form filled by workshop</p>
                        </span>
                        <div className="location2-elem-62">
                            <div className="location2-elem-57">
                                <div className="location2-elem-56">
                                    <span className="cd-paragraph-clean location2-elem-54">
                                        <p>Estimated days for repair</p>
                                    </span>
                                    <input type="text" placeholder="" className="location2-elem-55" />
                                </div>
                            </div>
                            <div className="location2-elem-61">
                                <div className="location2-elem-60">
                                    <span className="cd-paragraph-clean location2-elem-58">
                                        <p>from and to</p>
                                    </span>
                                    <input type="email" placeholder="" className="location2-elem-59" />
                                </div>
                            </div>
                            <div className="location2-elem-53">
                                <span className="cd-paragraph-clean location2-elem-51">
                                    <p>Message</p>
                                </span>
                                <textarea placeholder="Type your message...." className="location2-elem-52"></textarea>
                            </div>
                        </div>
                        <div className="location2-elem-48">
                            <input type="checkbox" placeholder="" className="location2-elem-46" />
                            <span className="cd-paragraph-clean location2-elem-47">
                                <p>I accept the terms</p>
                            </span>
                        </div>
                        <button className="location2-elem-49" type="submit">
                            <p>Submit</p>
                        </button>
                    </div>
                </div>
            </div>
            <div className="location2-elem-10">
                <span className="location2-elem-6">
                    <p>Date wise Images upload</p>
                </span>
                <div className="location2-elem-9">
                    <div className="location2-elem-8">
                        <i className="fas fa-camera location2-elem-11"></i>
                        <span className="location2-elem-7">
                            <p>Upload Images</p>
                        </span>
                    </div>
                    {/* Repeat the below div block for each upload section */}
                    <div className="location2-elem-44">
                        <i className="fas fa-camera location2-elem-43"></i>
                        <span className="location2-elem-42">
                            <p>Upload Images</p>
                        </span>
                    </div>
                </div>
            </div>
            <button className="location2-elem-45" onClick={submitted}>
                <p>Submit</p>
            </button>
        </div>
    )
}

export default Location2;