import React from "react";
import { FaArrowRight, FaUserAlt, FaChartLine } from "react-icons/fa";
import "./FirstPageDesigns.css";
import craneImageBorderRadius from '../../../Assets/craneImageBorderRadius.jpeg'
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';

const FirstPageDesigns = () => {
    return (
        <div className="firstpage-small-container">
            <div className="firstpage-small-content">
                <div>
                    <LabelImportantIcon style={{
                        position: "absolute",
                        color: "black"
                    }} />
                    <h2  style={{ fontSize: "14px", fontWeight: 'bold',marginTop: "6px",marginLeft:"30px" }}>Get Best Services</h2>
                    <p style={{ fontSize: "10px",marginLeft:"30px" ,color:"red", marginTop: "10px" }}>crane, advocate, mechanic, workshop</p>
                </div>
                <div style={{ background: 'white', width: "370px", padding: "20px", borderRadius: "20px", marginLeft: "20px" }}>
                    <div style={{ marginLeft: "-20px", marginBottom: "8px", marginTop: "-4px", fontSize: "10px", width: "72px", background: "#1f5e35", padding: "6px", borderRadius: '0px 20px 20px 0px', color: "white" }}>
                        Get more
                    </div>
                    <div style={{ display: 'flex' }}>
                        <img src={craneImageBorderRadius} style={{ borderRadius: "27px", height: "60px", width: "67px" }} />
                        <div style={{ paddingLeft: '20px' }}>
                            <h2 style={{ fontSize: "14px", fontWeight: 'bold' }}>Crane Services</h2>
                            <p style={{ fontSize: "10px", marginTop: "10px" }}>Swift and Reliable On-spot Vehicle Repairs</p>
                            <LoyaltyIcon style={{
                                position: "absolute",
                                right: "290px",
                                top: "109px", color: "red"
                            }} />
                            <p style={{ fontSize: "10px", marginTop: "10px" }}>get vehicels for affordable prices and could see the ranges </p>
                        </div>
                    </div>
                    <hr />
                    <div className="button-container">
                        <p style={{ fontSize: "12px" }}>Get various options for your services that needs to be addressed</p>

                        <button className="feature-button">
                            <FaArrowRight /> More
                        </button>

                    </div>
                </div>
                 {/* <div style={{ background: 'white', width: "370px", padding: "20px", borderRadius: "20px", marginLeft: "20px" }}>
                    <div style={{ marginLeft: "-20px", marginBottom: "8px", marginTop: "-4px", fontSize: "10px", width: "72px", background: "#1f5e35", padding: "6px", borderRadius: '0px 20px 20px 0px', color: "white" }}>
                        Get more
                    </div>
                    <div style={{ display: 'flex' }}>
                        <img src={craneImageBorderRadius} style={{ borderRadius: "27px", height: "60px", width: "67px" }} />
                        <div style={{ paddingLeft: '20px' }}>
                            <h2 style={{ fontSize: "14px", fontWeight: 'bold' }}>Crane Services</h2>
                            <p style={{ fontSize: "10px", marginTop: "10px" }}>Swift and Reliable On-spot Vehicle Repairs</p>
                            <LoyaltyIcon style={{
                                position: "absolute",
                                right: "290px",
                                top: "109px", color: "red"
                            }} />
                            <p style={{ fontSize: "10px", marginTop: "10px" }}>get vehicels for affordable prices and could see the ranges </p>
                        </div>
                    </div>
                    <hr />
                    <div className="button-container">
                        <p style={{ fontSize: "12px" }}>Get various options for your services that needs to be addressed</p>

                        <button className="feature-button">
                            <FaArrowRight /> More
                        </button>

                    </div>
                </div> */}
                <div className="features-wrapper">
                    {/* <div className="firstpage-small-feature-card">
                        <h2>Feature 2</h2>
                        <p>Connect with like-minded individuals and share ideas.</p>
                        <div className="button-container">
                            <button className="feature-button">
                                <FaArrowRight /> More Info
                            </button>
                            <button className="feature-button">
                                <FaUserAlt /> Profile
                            </button>
                        </div>
                    </div>
                    <div className="firstpage-small-feature-card">
                        <h2>Feature 3</h2>
                        <p>Get detailed analytics and insights for better decisions.</p>
                        <div className="button-container">
                            <button className="feature-button">
                                <FaChartLine /> View Stats
                            </button>
                            <button className="feature-button">
                                <FaArrowRight /> Learn More
                            </button>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default FirstPageDesigns;
