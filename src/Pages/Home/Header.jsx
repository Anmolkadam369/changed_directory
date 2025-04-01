import { React, useRef, useEffect, useState } from 'react';
import './Home.css';
import './responsive-mobile.css'
import './responsive-tablet.css'
import './responsive-bp_1280.css'
import './responsive-bp_1440.css'
import './responsive-bp_1920.css'
import { useNavigate } from 'react-router-dom';
import claimproassist from "../../Assets/claimproassistwithoutName.jpg";
import ListIcon from '@mui/icons-material/List';

const Header = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const goBlog = () => {
        console.log('Navigating to Blogs');
        navigate('/Blogs')
    }
    function navigateToVehiclePage() {
        navigate('/LoginPage');
    }
    function goHome() {
        navigate('/');
    }

    function navigateToContactUs() {
        navigate('/ContactUs');
    }

    function naviagateToScrap() {
        navigate('/ImageViewer');
    }


    const [isMobile, setIsMobile] = useState(window.innerWidth < 1199);


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1199);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [isClicked, setIsClicked] = useState(false);


    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setIsClicked(!isClicked);
    };

    const scrollToTop = () => {
        console.log("Scrolling to the top...");
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
        document.body.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
            setIsClicked(false);
        }
    };


    return (
        <div>
            <div className="home-elem-14">
                <div className="home-elem-13">
                    <div className="home-elem-15">
                        <span className="home-elem-18">
                            <img src={claimproassist} className='logo-image' alt="company logo" />
                            <p className='title'>BVC ClaimPro Assist </p>
                        </span>
                    </div>

                    {isMobile ? (
                        <div className="menu-container">
                            <button className={`menu-button ${isClicked ? 'clicked' : ''}`} onClick={toggleMenu}>
                                <ListIcon />
                            </button>
                            {isOpen && (
                                <div className="menu-card" ref={menuRef}>
                                    <ul>
                                        <li>
                                            <a href="#home" onClick={goHome}>Home</a>
                                        </li>
                                        <li ><a>FAQ</a></li>
                                        <li onClick={navigateToContactUs}><a href="#contact">Contact Us</a></li>
                                        <li><a onClick={goBlog}>Blog</a></li>
                                        <li> <a onClick={naviagateToScrap}>Scrap Deal </a> </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="home-elem-16">
                            <div className="home-elem-12">
                                <span className="home-elem-8">
                                    <p style={{ cursor: 'pointer' }} onClick={goHome}>Home </p>
                                </span>
                                <span className="home-elem-9">
                                    <p style={{ cursor: 'pointer' }}  >FAQ </p>
                                </span>
                                <span className="home-elem-10">
                                    <span onClick={navigateToContactUs} style={{ cursor: 'pointer' }} >
                                        <p>Contact Us </p>
                                    </span>
                                </span>
                                <span className="home-elem-11">
                                    <p style={{ cursor: 'pointer' }} onClick={goBlog}>Blog </p>
                                </span>
                                <span className="home-elem-11">
                                    <p style={{ cursor: 'pointer' }} onClick={naviagateToScrap}>Scrap Deal </p>
                                </span>
                            </div>
                        </div>
                    )}


                    <button onClick={navigateToVehiclePage} className='home-elem-17'>
                        <p>Log in</p>
                    </button>
                </div>
            </div>


            <div className="home-elem-194">
                <div className="home-elem-193">
                    <span className="home-elem-189">
                        <a href="home.html" className="link" target="_self">
                            <p>Home</p>
                        </a>
                    </span>
                    <span className="home-elem-190">
                        <a href="#home-elem-45" className="link" target="_self">
                            <p>FAQ</p>
                        </a>
                    </span>
                    <span className="home-elem-191">
                        <a href="#home-elem-59" className="link" target="_self">
                            <p>Contact Us</p>
                        </a>
                    </span>
                    <span className="home-elem-192">
                        <a href="#home-elem-80" className="link" target="_self">
                            <p>Blog</p>
                        </a>
                    </span>
                    <button className="home-elem-196">
                        <a href="#home-elem-167" className="link" target="_self">
                            <p>Get Assistance</p>
                        </a>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header;