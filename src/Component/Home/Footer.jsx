import { React, useRef, useEffect, useState } from 'react';
import './Home.css';
import './responsive-mobile.css'
import './responsive-tablet.css'
import './responsive-bp_1280.css'
import './responsive-bp_1440.css'
import './responsive-bp_1920.css'
import { FaFacebook, FaLinkedin, FaInstagramSquare, FaWhatsapp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';






const Footer = () => {
    const navigate = useNavigate();
    const openInNewTab = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };
    function navigateToContactUs() {
        navigate('./ContactUs');
    }
    return (
        <div>
            <hr />
            <div className="home-elem-188">
                <div className="home-elem-185">
                    <div className="home-elem-176">
                        <span className="home-elem-173">
                            <p>BVC ClaimPro Assist</p>
                        </span>
                        <span className="home-elem-174">
                            <p>We are a dedicated team committed to provide prompt assistance during commercial vehicle accidents.</p>
                        </span>
                        <div className="home-elem-183">
                            <i className="fab fa-instagram-square home-elem-180"></i>
                            <i className="fab fa-twitter-square home-elem-182"></i>
                            <i className="fab fa-facebook home-elem-181"></i>
                        </div>
                        <div>
                        </div>

                    </div>

                    <div className="home-elem-184">

                        <p style={{ fontSize: "16px", fontWeight: 700, marginBottom: "15px" }}>Social Media Accounts </p>
                        <div style={{ display: 'flex', marginBottom: "20px" }}>
                            <div
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    backgroundColor: '#3b5998',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 10px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => openInNewTab('https://www.facebook.com/people/BVC-ClaimPro-Assist/61559865797607/?mibextid=LQQJ4d')}
                            >
                                <FaFacebook style={{ color: 'white', fontSize: '24px' }} />
                            </div>
                            <div
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    backgroundColor: '#0077b5',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 10px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => openInNewTab('https://www.linkedin.com/company/bvc-claim-pro-assist/')}
                            >
                                <FaLinkedin style={{ color: 'white', fontSize: '24px' }} />
                            </div>
                            <div
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    backgroundColor: '#3b5998',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 10px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => openInNewTab(' https://www.instagram.com/claimproassist?utm_source=ig_web_button_share_sheet&igsh=ODdmZWVhMTFiMw==')}
                            >
                                <FaInstagramSquare style={{ color: 'white', fontSize: '24px' }} />
                            </div>
                            <div
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    backgroundColor: '#3b5998',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 10px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => openInNewTab('https://whatsapp.com/channel/0029Vaf9dkzEgGfM3tCiUJ3Z')}
                            >
                                <FaWhatsapp style={{ color: 'white', fontSize: '24px' }} />
                            </div>
                        </div>
                        <span className="home-elem-177">
                            <p>Contact us</p>
                            <span className="home-elem-179">
                                <p>+91 7800 78 4700</p>
                            </span>
                            <button className="home-elem-175" onClick={navigateToContactUs}>
                                <p>Contact Us</p>
                            </button>
                        </span>

                    </div>
                </div>
                <div className="home-elem-187">
                    <span className="home-elem-186">
                        <p>© {new Date().getFullYear()} BVC ClaimPro Assist, we love our users!</p>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Footer;