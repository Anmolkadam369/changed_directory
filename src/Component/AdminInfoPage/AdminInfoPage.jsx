import React, { useState } from 'react';
import './AdminInfoPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


function AdminInfoPage() {
    return (
        <div>
            <div className="adminformpage-elem-10">
                <div className="adminformpage-elem-9">
                    <div className="adminformpage-elem-8"></div>
                    <div className="adminformpage-elem-2">
                        <span className="adminformpage-elem-1">
                            <p>Claim Pro Assist</p>
                        </span>
                    </div>
                    <div className="adminformpage-elem-7">
                        <div className="adminformpage-elem-6">
                            <span className="adminformpage-elem-3">
                                <a href="home.html" className="link" target="_self">
                                    <p>Home</p>
                                </a>
                            </span>
                            <span className="adminformpage-elem-4">
                                <a href="#DivMZVC" className="link" target="_self">
                                    <p>Contact Us</p>
                                </a>
                            </span>
                            <span className="adminformpage-elem-5">
                                <a href="#DivFlyW" className="link" target="_self">
                                    <p>Raise Invoice</p>
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="adminformpage-elem-29">
                    <div className="adminformpage-elem-28">
                        <div className="adminformpage-elem-27">
                            <span className="cd-paragraph-clean adminformpage-elem-15">
                                <p>Full Details</p>
                            </span>
                            <div className="adminformpage-elem-26">
                                <div className="adminformpage-elem-22">
                                    <div className="adminformpage-elem-21">
                                        <span className="cd-paragraph-clean adminformpage-elem-19">
                                            <p>Reg No.</p>
                                        </span>
                                        <input type="text" placeholder="" className="adminformpage-elem-20" />
                                    </div>
                                </div>
                                <div className="adminformpage-elem-25">
                                    <div className="adminformpage-elem-24">
                                        <span className="cd-paragraph-clean adminformpage-elem-30">
                                            <p>Owner Name</p>
                                        </span>
                                        <input type="email" placeholder="" className="adminformpage-elem-23" />
                                        <div className="adminformpage-elem-60">
                                            <span className="cd-paragraph-clean adminformpage-elem-58">
                                                <p>Accident location with city, state and pincode</p>
                                            </span>
                                            <input type="text" placeholder="" className="adminformpage-elem-59" />
                                        </div>
                                        {/* Other input fields */}
                                    </div>
                                </div>
                                <div className="adminformpage-elem-18">
                                    <span className="cd-paragraph-clean adminformpage-elem-16">
                                        <p>Remarks</p>
                                    </span>
                                    <textarea placeholder="Type your message...." className="adminformpage-elem-17"></textarea>
                                </div>
                            </div>
                            <div className="adminformpage-elem-13">
                                <input type="checkbox" placeholder="" className="adminformpage-elem-11" />
                                <span className="cd-paragraph-clean adminformpage-elem-12">
                                    <p>I accept the terms</p>
                                </span>
                            </div>
                            <button className="adminformpage-elem-14" type="submit">
                                <p>Submit</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AdminInfoPage;