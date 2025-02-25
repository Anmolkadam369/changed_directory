import { React, useRef, useEffect, useState } from 'react';
import './Home.css';
import './responsive-mobile.css'
import './responsive-tablet.css'
import './responsive-bp_1280.css'
import './responsive-bp_1440.css'
import './responsive-bp_1920.css'

import { useNavigate } from 'react-router-dom';
import backendUrl from '../../environment';
import trucks1 from '../../Assets/trucks1.jpg';
import trucks2 from '../../Assets/trucks2.jpg';
import onsiterepair from '../../Assets/onsiterepair.jpg';
import cranefrontpage from '../../Assets/cranefrontpage.jpg';
import workshopfirstpage from '../../Assets/workshopfirstpage.jpg';
import advocatefirstpage from '../../Assets/advoatefirstpage.jpeg';
import homepage1st from "../../Assets/homepage1st.jpg"
import homepage2nd from "../../Assets/homepage2nd.jpg"
import homepage3rd from "../../Assets/homepage3rd.jpg"
import craneadvocatemechanic from '../../Assets/camw.webp'; // Correct import path
import ConstructionIcon from '@mui/icons-material/Construction';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import GavelIcon from '@mui/icons-material/Gavel';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import customerImage from '../../Assets/customer.webp'; // Correct import path
import complaints from '../../Assets/complaints.webp'; // Correct import path
import registerComplaints from '../../Assets/registeredComplaints.webp'; // Correct import path
import remainingComplaints from '../../Assets/remainingComplaints.webp'; // Correct import path
import vehicleIcon from '../../Assets/vehicleIcon.webp'; // Correct import path
import vendorResponseImg from '../../Assets/vendorResponse.webp';
import claimproassist from "../../Assets/claimproassistwithoutName.jpg";
import ListIcon from '@mui/icons-material/List';
import { FaFacebook, FaLinkedin, FaInstagramSquare, FaWhatsapp } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { height } from '@mui/system';
import RotatingBoard from '../AAAAAAAAAAAAAAAAAA/RotatingBoard';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';


function Home() {
    const navigate = useNavigate();
    const openInNewTab = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    function navigateToVehiclePage() {
        navigate('./LoginPage');
    }

    const getCookie = (name) => {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : null;
    };

    const checkTokenValidity = async (token) => {
        try {
            const response = await axios.post(`${backendUrl}/api/verifyToken/isValid`, {}
                , { headers: { Authorization: `Bearer ${token}` }});
            return response.status === 200; // Backend will return 200 if valid
        } catch (error) {
            console.error('Token validation failed:', error);
            return false;
        }
    };
    // useEffect(() => {
    //     const isValidUser = async () => {
    //         const token = getCookie('token') || localStorage.getItem('token');
    //         const userId = localStorage.getItem('userId')
    //         if (token) {
    //             // Optionally verify token validity
    //             const isValid = checkTokenValidity(token); // Implement this function
    //             if (isValid) {
    //                 // User remains logged in
    //                 const response = await axios.get(`${backendUrl}/api/typeofUser/${userId}`, {
    //                     headers: {
    //                         'Authorization': `Bearer ${token}`
    //                     }
    //                 })
    //                 if (response.status !== 200) {
    //                     navigate('/LoginPage')
    //                 }
    //                 console.log("esponse.data.userType", response.data.data.userType)
    //                 if (response.data.data.userType === "admin" ||
    //                     response.data.data.userType === "Management") {
    //                     navigate("../Admin");
    //                 } else if (response.data.data.userType === "IT") {
    //                     navigate("../Admin");
    //                 }
    //                 else if (response.data.data.userType === "advocate") {
    //                     navigate("../advocateDashboard");
    //                 } else if (response.data.data.userType === "mechanic") {
    //                     navigate("../MechanicDashboard");
    //                 } else if (response.data.data.userType === "crane") {
    //                     navigate("../crane-user-dashboard");
    //                 } else if (response.data.data.userType === "workshop") {
    //                     navigate("../WorkshopDashboard");
    //                 } else if (response.data.data.userType === "Administration") {
    //                     navigate("../Admin");
    //                 } else if (response.data.data.userType === "Sales") {
    //                     navigate("../Salesteam");
    //                 }
    //                 else {
    //                     localStorage.setItem("fromLogin", true)
    //                     navigate('../user-landing-page');
    //                 }

    //                 console.log('Auto-login successful');
    //             }
    //         }
    //         console.log('Token expired or missing, redirecting to login.');
    //     }

    //     isValidUser()
    // }, [])

    useEffect(() => {
        const expiryTime = 12 * 60 * 60 * 1000;
        const delay = expiryTime - (Date.now() - localStorage.getItem('loginTime'));

        if (delay > 0) {
            setTimeout(() => {
                logoutUser();
            }, delay);
        } else {
            logoutUser(); // Immediately log out if expiry time is in the past
        }
    }, [])

    const logoutUser = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        document.cookie = 'token=; path=/; max-age=0; secure; samesite=strict';
        console.log('Logged out due to token expiry.');
        // window.location.href = '/loginPage'; // Redirect to login page
    };



    function navigateToContactUs() {
        navigate('./ContactUs');
    }

    const videoRefs = useRef([]);

    const handlePlay = (index) => {
        videoRefs.current.forEach((video, i) => {
            if (i !== index && video) {
                video.pause();
            }
        });
    }

    const texts = [
        { text: 'Accident Vehicles', color: 'blue' },
        { text: 'Crane ', color: 'red' },
        { text: 'Mechanic', color: 'green' },
        { text: 'Workshop', color: 'orange' },
        { text: 'Advocate', color: 'lightblue' },

    ];

    const [displayText, setDisplayText] = useState('');
    const [index, setIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);
    const [currentColor, setCurrentColor] = useState(texts[0].color);

    useEffect(() => {
        const handleTyping = () => {
            const current = texts[index];
            const currentText = current.text;
            if (deleting) {
                setDisplayText((prev) => prev.slice(0, -1));
                if (displayText === '') {
                    setDeleting(false);
                    setIndex((prev) => (prev + 1) % texts.length);
                    setCurrentColor(texts[(index + 1) % texts.length].color);
                }
            } else {
                setDisplayText((prev) => currentText.slice(0, charIndex + 1));
                if (charIndex === currentText.length - 1) {
                    setDeleting(true);
                }
            }
            setCharIndex((prev) => (deleting ? prev - 1 : prev + 1));
        };

        const timer = setInterval(handleTyping, deleting ? 100 : 150);

        return () => clearInterval(timer);
    }, [displayText, index, charIndex, deleting]);

    const elemRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 } // Adjust as needed
        );

        const elem = elemRef.current;
        if (elem) {
            observer.observe(elem);
        }

        return () => {
            if (elem) {
                observer.unobserve(elem);
            }
        };
    }, []);

    const secondRightRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 } // Adjust as needed
        );

        const elem = secondRightRef.current;
        if (elem) {
            observer.observe(elem);
        }

        return () => {
            if (elem) {
                observer.unobserve(elem);
            }
        };
    }, []);

    const thirdRightRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 } // Adjust as needed
        );

        const elem = thirdRightRef.current;
        if (elem) {
            observer.observe(elem);
        }

        return () => {
            if (elem) {
                observer.unobserve(elem);
            }
        };
    }, []);

    const leftRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 } // Adjust as needed
        );

        const elem = leftRef.current;
        if (elem) observer.observe(elem);

        return () => {
            if (elem) observer.unobserve(elem);
        };
    }, [])

    const fromTop1 = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 } // Adjust as needed
        );

        const elem = fromTop1.current;
        if (elem) {
            observer.observe(elem);
        }

        return () => {
            if (elem) {
                observer.unobserve(elem);
            }
        };
    }, []);


    const leftSecondRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 } // Adjust as needed
        );

        const elem = leftSecondRef.current;
        if (elem) observer.observe(elem);

        return () => {
            if (elem) observer.unobserve(elem);
        };
    }, [])

    const scrollToSection = () => {
        const element = document.getElementById('target-section');
        element.scrollIntoView({ behavior: 'smooth' });
    };
    const scrollToTop = () => {
        console.log("Scrolling to the top...");
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
        document.body.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const [isClicked, setIsClicked] = useState(false);
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


    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setIsClicked(!isClicked);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
            setIsClicked(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const goBlog = () => {
        console.log('Navigating to Blogs');
        navigate('/Blogs')
    }

    return (
        <div>
            <Header />
            <div>
                <div>
                    <RotatingBoard />
                </div>
                <div className="home-elem-19">
                    <Helmet>
                        <title>Accident Trucks Customer Service - Claimpro</title>
                        <meta name="description" content="Home Page for BVC ClaimPro Assist and for vehicle accidents. Keep track of Vendors, Customers actions taken." />
                        <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                        <link rel='canonical' href={`https://claimpro.in/`} />

                    </Helmet>

                    <div className="home-elem-20" style={{ paddingTop: "20px" }}>
                        <div className="home-elem-21">
                            <span className="home-elem-25">
                                <h1>Professional Assistance for <span style={{ color: currentColor }}>{displayText}</span></h1>
                            </span>
                            <span className="home-elem-26">
                                <p>BVC ClaimPro Assist provides easy access to cranes, advocates, workshops, and immediate vehicle repairs for all your commercial vehicles during accidents.</p>
                            </span>
                            <span className="home-elem-26">
                                <p>BVC ClaimPro Assist is providing services for you. Come and join your business with us and be relaxed.</p>
                            </span>
                            <div className="home-elem-27">
                                <button className="home-elem-29" onClick={navigateToContactUs}>
                                    <p>Connect With Us</p>
                                </button>
                            </div>
                        </div>
                        <div className="home-elem-30">
                            <div className="home-elem-31">
                                <div className="home-elem-32">
                                    <span className="home-elem-33">
                                        <p>24 H</p>
                                    </span>
                                    <span className="home-elem-34">
                                        <p>Service</p>
                                    </span>
                                </div>
                            </div>
                            <div className="home-elem-35">
                                <span ref={elemRef} className="home-elem-36">
                                    <img src={trucks2} />
                                </span>
                                <span ref={elemRef} className="home-elem-37">
                                    <img src={trucks1} />
                                </span>
                            </div>
                            <div className="home-elem-38">
                                <span className="home-elem-39">
                                    <p style={{ fontSize: "15px", fontWeight: "bold" }}>1000+ Happy Clients</p>
                                </span>
                                <div className="home-elem-40">
                                    {/* <i className="fas fa-quote-left home-elem-41"></i> */}
                                    <span className="home-elem-42">
                                        <p>Outstanding service at difficult times.</p>
                                    </span>
                                    <div className="home-elem-44">
                                        {/* <i className="fas fa-quote-right home-elem-43"></i> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="home-elem-45">
                        <div className="home-elem-46">
                            <span className="home-elem-47">
                                <p>Ensuring smooth business continuity post accidents </p>
                            </span>
                            <div className="home-elem-48">
                                <span className="home-elem-49">
                                    <p>We strive to minimize downtime and losses by providing quick and proficient assistance for commercial vehicles during accidents. </p>
                                </span>
                                <div className="home-elem-50">
                                    <div className="home-elem-51">
                                        <span className="home-elem-52">
                                            <p style={{ fontSize: "15px", fontWeight: "bold", color: "yellow", textAlign: "center" }}> 1000+ </p>
                                            <p style={{ fontSize: "15px", fontWeight: "bold" }}> Claims Settled </p>
                                        </span>
                                    </div>
                                    <div className="home-elem-58">
                                        <span className="home-elem-57">
                                            <p style={{ fontSize: "15px", fontWeight: "bold", color: "orange", textAlign: "center" }}> 1000+ </p>
                                            <p style={{ fontSize: "15px", fontWeight: "bold" }}>On-spot Repairs </p>
                                        </span>
                                        <span className="home-elem-56">
                                            <p><br /></p>
                                        </span>
                                    </div>
                                    <div className="home-elem-55">
                                        <span className="home-elem-54">
                                            <p style={{ fontSize: "15px", fontWeight: "bold", color: "lightblue", textAlign: "center" }}> 500+ </p>
                                            <p style={{ fontSize: "15px", fontWeight: "bold" }}>Workshop</p>
                                        </span>
                                        <span className="home-elem-53">
                                            <p><br /></p>
                                        </span>
                                    </div>
                                    <div className="home-elem-55">
                                        <span className="home-elem-54">
                                            <p style={{ fontSize: "15px", fontWeight: "bold", color: "lightgreen", textAlign: "center" }}> 1500+ </p>
                                            <p style={{ fontSize: "15px", fontWeight: "bold" }}>Crane / Hydra </p>
                                        </span>
                                        <span className="home-elem-53">
                                            <p><br /></p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div ref={leftRef} className="home-elem-59">
                        <div className='home-elem-60' style={{ height: "300px", width: "300px", marginTop: "30px", background: 'none' }}>
                            <span className="home-elem-66">
                                <img src={advocatefirstpage} alt="Accident" />
                            </span>
                        </div>
                        <div className="home-elem-62">
                            <span className="home-elem-63">
                                <p>Professional Advocate Assistance for getting your accident vehicle out from the Police Custody </p>
                            </span>
                            <span className="home-elem-64">
                                <p>At BVC ClaimPro Assist, we offer professional advocate assistance to help you navigate the complexities of getting your accident vehicle released from police custody. Our experienced legal team is ensuring all legal protocols are followed efficiently. We understand the urgency and stress involved in such situations, which is why we act swiftly to expedite the release process.</p>
                            </span>
                            {/* <button className="home-elem-65">
                        <a href="#home-elem-80" className="link" target="_self">
                            <p>Know More </p>
                        </a>
                    </button> */}
                        </div>
                    </div>
                    <div ref={secondRightRef} className="home-elem-79">
                        <div className="home-elem-78">
                            <span className="home-elem-75">
                                <p>Swift and Reliable On-spot Vehicle Repairs</p>
                            </span>
                            <span className="home-elem-76">
                                <p>BVC ClaimPro Assist offers swift and reliable on-spot vehicle repairs to minimize downtime and get you back on the road quickly. Our team of mobile technicians is equipped with the tools and expertise to handle a variety of minor repairs right at the accident scene or your location. From tire changes and battery replacements to minor mechanical adjustments, we provide efficient solutions to keep you moving.</p>
                            </span>
                            {/* <button className="home-elem-77">
                    <a href="#home-elem-80" className="link" target="_self">
                        <p>Find Out More</p>
                    </a>
                </button> */}
                        </div>
                        <div className="home-elem-60" style={{ height: "300px", width: "300px", marginTop: "30px", background: 'none' }}>
                            <span className="home-elem-66">
                                <img src={onsiterepair} alt="Vehicle Repair" />
                            </span>
                        </div>
                    </div>
                    <div ref={leftSecondRef} className="home-elem-59">
                        <div className='home-elem-60' style={{ height: "300px", width: "300px", marginTop: "30px", background: 'none', paddingTop: "10px" }}>
                            <span className="home-elem-66">
                                <img src={cranefrontpage} alt="Cranes" />
                            </span>
                        </div>
                        <div className="home-elem-62">
                            <span className="home-elem-63">
                                <p>Cranes for Safe Vehicle Extraction </p>
                            </span>
                            <span className="home-elem-64">
                                <p>With experienced operators and robust cranes, we ensure your damaged vehicle is safely transported to workshops. Our team is available 24/7, ready to respond promptly to any accident scene. We prioritize safety and efficiency, using the latest equipment to handle vehicles of all sizes and types. Our cranes are regularly maintained to ensure optimal performance and reliability. </p>
                            </span>
                            {/* <button className="home-elem-70">
                        <a href="#home-elem-80" className="link" target="_self">
                            <p>Learn More </p>
                        </a>
                    </button> */}
                        </div>
                    </div>
                    <div ref={thirdRightRef} className="home-elem-79">
                        <div className="home-elem-78">
                            <span className="home-elem-75">
                                <p>Expert Heavy Vehicle Repairs and Maintenance</p>
                            </span>
                            <span className="home-elem-76">
                                <p>At BVC ClaimPro Assist, we specialize in expert heavy vehicle repairs and maintenance. Our team of certified mechanics is equipped to handle a wide range of issues, ensuring your vehicle is restored to peak condition. We use advanced diagnostic tools and high-quality parts to deliver reliable repairs that stand the test of time. Whether it's engine overhauls, transmission repairs, or routine maintenance, our skilled technicians provide thorough and efficient service.</p>
                            </span>

                            {/* <button className="home-elem-77">
                        <a href="#home-elem-80" className="link" target="_self">
                            <p>Find Out More </p>
                        </a>
                    </button> */}
                        </div>
                        <div className="home-elem-60" style={{ height: "300px", width: "300px", marginTop: "30px", background: 'none' }}>
                            <span className="home-elem-66">
                                <img src={workshopfirstpage} alt="Vehicle Repair" />
                            </span>
                        </div>
                    </div>

                    {/* <div className="home-elem-112">
                <div className="home-elem-113">
                    <span className="home-elem-111 home-elem-111">
                        <p>Real experiences from real people.</p>
                    </span>
                    <span className="home-elem-110 home-elem-110">
                        <p>What Our Clients Say</p>
                    </span>
                    <span className="home-elem-111 home-elem-111">
                        <p>Real experiences from real people.</p>
                    </span>
                    <span className="home-elem-110 home-elem-110">
                        <p>What Our Clients Say</p>
                    </span>
                </div>
                <div className="home-elem-109">
                    <div className="home-elem-125">
                        <div className="home-elem-114">
                            <div className="home-elem-115">
                                <span className="home-elem-108">
                                    <p>Turning Crisis Into Convenience</p>
                                </span>
                                <div className="home-elem-116">
                                    <i className="fas fa-star home-elem-117"></i>
                                    <i className="fas fa-star home-elem-121"></i>
                                    <i className="fas fa-star home-elem-120"></i>
                                    <i className="fas fa-star home-elem-119"></i>
                                    <i className="fas fa-star home-elem-118"></i>
                                </div>
                                <span className="home-elem-122">
                                    <p>CPA became my crisis manager during my vehicle's accident.</p>
                                </span>
                                <span className="home-elem-123">
                                    <p>The efficient team arranged everything from tow to paperwork.</p>
                                </span>
                            </div>
                            <i className="fas fa-quote-right home-elem-124"></i>
                        </div>
                        <div className="home-elem-149">
                            <div className="home-elem-147">
                                <span className="home-elem-138">
                                    <p>Professional, Prompt and Reliable service</p>
                                </span>
                                <div className="home-elem-144">
                                    <i className="fas fa-star home-elem-139"></i>
                                    <i className="fas fa-star home-elem-143"></i>
                                    <i className="fas fa-star home-elem-142"></i>
                                    <i className="fas fa-star home-elem-141"></i>
                                    <i className="fas fa-star home-elem-140"></i>
                                </div>
                                <span className="home-elem-145">
                                    <p>Helped me solve the complex process of claim smoothly.</p>
                                </span>
                                <span className="home-elem-146">
                                    <p>On-spot Repair was a lifesaver.</p>
                                </span>
                            </div>
                            <i className="fas fa-quote-right home-elem-148"></i>
                        </div>
                        <div className="home-elem-137">
                            <div className="home-elem-135">
                                <span className="home-elem-126">
                                    <p>Although a misfortunate incident, experienced best service!</p>
                                </span>
                                <div className="home-elem-132">
                                    <i className="fas fa-star home-elem-127"></i>
                                    <i className="fas fa-star home-elem-131"></i>
                                    <i className="fas fa-star home-elem-130"></i>
                                    <i className="fas fa-star home-elem-129"></i>
                                    <i className="fas fa-star home-elem-128"></i>
                                </div>
                                <span className="home-elem-133">
                                    <p>Never expected vehicle repair could be so hassle-free.</p>
                                </span>
                                <span className="home-elem-134">
                                    <p>RECOMMENDED!</p>
                                </span>
                            </div>
                            <i className="fas fa-quote-right home-elem-136"></i>
                        </div>
                    </div>
                </div>
            </div> */}
                    <div className="home-elem-156" style={{ marginBottom: "0px" }}>
                        <div id="target-section" className="home-elem-157">
                            <span className="home-elem-154">
                                <p>Dive into Our Blog Section</p>
                            </span>

                        </div>
                        <div className="home-elem-153">
                            <div className="home-elem-152">
                                <span className="home-elem-158">
                                    <img src="https://res.cloudinary.com/dbyioi2qq/image/upload/v1705836233/efswn0i8czrgyqovcrtf.jpg" alt="Blog Image 1" />
                                </span>
                                <span className="home-elem-150">
                                    <p>How we manage the entire accident scene professionally?</p>
                                </span>
                                <span className="home-elem-151">
                                    <p>Get a detailed insight on how BVC ClaimPro Assist arranges the accident scene professionally from advocates to cranes.</p>
                                </span>
                            </div>
                            <div className="home-elem-166">
                                <span className="home-elem-165">
                                    <img src="https://res.cloudinary.com/dbyioi2qq/image/upload/v1705836234/gnfu37qw7tttlblzeuiz.jpg" alt="Blog Image 2" />
                                </span>
                                <span className="home-elem-163">
                                    <p>De-coding the legalities around claim settlement</p>
                                </span>
                                <span className="home-elem-164">
                                    <p>Learn about the intricacies involved in claim settlement as our professional advocates decode the legalities around it.</p>
                                </span>
                            </div>
                            <div className="home-elem-162">
                                <span className="home-elem-161">
                                    <img src="https://res.cloudinary.com/dbyioi2qq/image/upload/v1705836234/qkkwko9ppnatmhmwtb0c.jpg" alt="Blog Image 3" />
                                </span>
                                <span className="home-elem-159">
                                    <p>Effective Steps to On-spot Vehicle Repair</p>
                                </span>
                                <span className="home-elem-160">
                                    <p>Understand the quick and effective steps followed by our experienced technicians for on-the-spot repairs.</p>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="home-elem-80">
                        <span className="home-elem-82">
                            <p>Customized Services Tailored for Your Needs </p>
                        </span>
                        <span className="home-elem-83">
                            <p>From legal assistance to vehicle repairs, we offer bespoke services to fit your specific requirements. Stay updated with the latest news and helpful tips related to commercial vehicle accidents and their management.</p>
                        </span>
                        <div ref={fromTop1} className="home-elem-81">
                            <div className="home-elem-84">
                                <i className="fas fa-bahai home-elem-85"></i>
                                <span className="home-elem-86" style={{ display: "flex", alignItems: "center", gap: '10px' }}>
                                    <GavelIcon />
                                    <p style={{ alignItems: "center" }}>Legal </p>
                                </span>
                                <span className="home-elem-87">
                                    <p>Advocate support is provided for claim settlements. </p>
                                </span>
                            </div>
                            <div className="home-elem-95">
                                <i className="far fa-heart home-elem-92"></i>
                                <span className="home-elem-93" style={{ display: "flex", alignItems: "center", gap: '10px' }}>
                                    <PrecisionManufacturingIcon />
                                    <p>Cranes </p>
                                </span>
                                <span className="home-elem-94">
                                    <p>Efficient vehicle extraction at the accident spot. </p>
                                </span>
                            </div>
                            <div className="home-elem-91">
                                <i className="fas fa-thumbs-up home-elem-88"></i>
                                <span className="home-elem-89" style={{ display: "flex", alignItems: "center", gap: '10px' }}>
                                    <ConstructionIcon />
                                    <p>Onspot Repair </p>
                                </span>
                                <span className="home-elem-90">
                                    <p>Immediate minor fixes for your vehicle. </p>
                                </span>
                            </div>
                            <div className="home-elem-95">
                                <i className="fas fa-award home-elem-92"></i>
                                <span className="home-elem-93" style={{ display: "flex", alignItems: "center", gap: '10px' }}>
                                    <LocalShippingIcon />
                                    <p>Transport </p>
                                </span>
                                <span className="home-elem-94">
                                    <p>Safe and secure vehicle transportation is provided. </p>
                                </span>
                            </div>
                            <div className="home-elem-103">
                                <i className="fas fa-bolt home-elem-100"></i>
                                <span className="home-elem-101" style={{ display: "flex", alignItems: "center", gap: '10px' }}>
                                    <img src={registerComplaints} className="small-image" alt="Vendor Types" />
                                    <p>Claims </p>
                                </span>
                                <span className="home-elem-102">
                                    <p>Guidance for smooth claim settlement process. </p>
                                </span>
                            </div>
                            <div className="home-elem-95">
                                <i className="fas fa-check home-elem-92"></i>
                                <span className="home-elem-93" style={{ display: "flex", alignItems: "center", gap: '10px' }}>
                                    <CarRepairIcon />
                                    <p>Workshops </p>
                                </span>
                                <span className="home-elem-94">
                                    <p>Major repairs are conducted at workshops. </p>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="home-elem-156" style={{ paddingTop: '0px' }}>
                        {/* <span>
                    <p style={{ marginTop: "60px", fontWeight: "bold", fontSize: "24px", textAlign: "left", padding: 0 }}>Services Provided By BVC ClaimPro Assist</p>
                </span> */}
                        <div className="home-elem-153">
                            <div className="home-elem-152">
                                <span className="home-elem-158">
                                    <video
                                        controls
                                        ref={(el) => (videoRefs.current[0] = el)}
                                        onPlay={() => handlePlay(0)}
                                    >
                                        <source src="https://claimproassist-2.s3.ap-south-1.amazonaws.com/images/firstvideotiranga.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </span>
                                <span className="home-elem-150">
                                    <p>Efficient Accident Management</p>
                                </span>
                                <span className="home-elem-151">
                                    <p> Our team ensures the safe and professional handling of vehicles involved in accidents, From small cars to heavy-duty trucks, our cranes are equipped to manage all types of vehicles, ensuring they are securely transported to the designated location.</p>
                                </span>
                            </div>
                            <div className="home-elem-166">
                                <span className="home-elem-165">
                                    <video
                                        controls
                                        ref={(el) => (videoRefs.current[1] = el)}
                                        onPlay={() => handlePlay(1)}
                                    >
                                        <source src="https://claimproassist-2.s3.ap-south-1.amazonaws.com/images/newvid.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </span>
                                <span className="home-elem-163">
                                    <p>Expert Advocate Services</p>
                                </span>
                                <span className="home-elem-164">
                                    <p>Our advocate services at BVC ClaimPro Assist offer legal support right from the accident scene. We provide immediate legal counsel to ensure that all necessary legal procedures are followed, protecting your rights and facilitating a smooth claims process.</p>
                                </span>
                            </div>
                            <div className="home-elem-162">
                                <span className="home-elem-161">
                                    <video
                                        controls
                                        ref={(el) => (videoRefs.current[2] = el)}
                                        onPlay={() => handlePlay(2)}
                                    >
                                        <source src="https://claimproassist-2.s3.ap-south-1.amazonaws.com/WhatsApp+Video+2024-07-11+at+20.17.05_b864227a.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </span>
                                <span className="home-elem-159">
                                    <p>Peace of Mind</p>
                                </span>
                                <span className="home-elem-160">
                                    <p>Every aspect of accident management is handled with professionalism and care, we are committed to providing seamless and efficient solutions. Our goal is to ensure your safety, convenience, and peace of mind throughout the entire process.</p>
                                </span>
                            </div>
                        </div>

                    </div>

                    <div className="home-elem-167" >
                        <span className="home-elem-168">
                            <p>Why not choose the BVC ClaimPro Assist?</p>
                        </span>
                        <span className="home-elem-169">
                            <p>Join our extended family and experience hassle-free, professional assistance during unwelcomed vehicle accidents.</p>
                        </span>
                        <button className="home-elem-171" onClick={navigateToContactUs}>
                            <p>Join Now</p>
                        </button>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home;
