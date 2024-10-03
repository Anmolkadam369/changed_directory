import React, { useState , useEffect} from "react";
import './ImageViewer.css';
import { useNavigate } from 'react-router-dom';
import { useScrollTrigger } from "@mui/material";
import scrapMain from '../../Assets/scrapmain.jpg';
import scrap2 from '../../Assets/scrap2.jpeg';
import scrap3 from '../../Assets/scrap3.jpeg';
import shoppingonline  from '../../Assets/shopping-online.png'
import recieved from '../../Assets/recieved.png'
import scrap4 from '../../Assets/scrap4.webp';
import scrap5 from '../../Assets/scrap5.jpeg';
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import scrapaddbyseller from '../../Assets/shoppinggirl.jpg'


const ImageViewer = () => {
    const navigate = useNavigate();
    const [showMore, setShowMore] = useState(false);
    const [showMore1, setShowMore1] = useState(false);

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

    useEffect(() => {
      const handleResize = () => {
        // Set the state based on the current window width
        setIsSmallScreen(window.innerWidth <= 768);
      };
  
      // Attach the resize event listener
      window.addEventListener('resize', handleResize);
  
      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    

    const toggleShowMore = () => {
        setShowMore1(!showMore1);
    };
    return (
        <div>
            <Header />
            <section style={{ background: '#d3d1d17a', position: 'relative' }}>
                <div className="container py-5">
                    <div className="row justify-content-flexstart mb-3">
                        <div className="col-md-12 col-xl-10">
                            <div className="card shadow-0 border rounded-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                                            <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                                <img src={scrapMain} className="w-100" />
                                                <a href="#!">
                                                    <div className="hover-overlay">
                                                        <div className="mask" style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}></div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-6 col-xl-6">
                                            <h5 style={{ fontWeight: "bold", fontSize: "19px" }}>Mahendra Super Working Workshop</h5>
                                            <div className="d-flex flex-row">
                                                <div className="text-danger mb-1 me-2">
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                </div>
                                                <span>Gurgoan</span>
                                            </div>
                                            <hr />
                                            <div className="text-truncate mt-1 mb-0 text-muted small" style={{ display: "flex", flexDirection: "column", alignItems: 'flex-start', gap: '10px' }}>
                                                <span style={{ color: "darkblue" }}>• Guaranteed Parts</span>
                                                <span style={{ color: "#2356a1" }}>• Reliable</span>
                                                {showMore1 && (
                                                    <>
                                                        <span style={{ color: "blue" }}>• Trusted Partner</span>
                                                        <span style={{ color: "teal" }}>• Best Deal</span>
                                                        <span>• On Time Delivery</span>
                                                    </>
                                                )}
                                                <button
                                                    onClick={toggleShowMore}
                                                    style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', padding: 0, marginTop: '10px' }}
                                                >
                                                    {showMore1 ? 'Show Less' : 'Show More'}
                                                </button>
                                            </div>
                                            <hr />
                                            {!showMore && (
                                                <p style={{ fontSize: "16px", textIndent: "20px" }} className="text-truncate mb-4 mb-md-0 mt-3">
                                                    Affordable and reliable truck components ready for reuse and Durable used parts sourced from trusted suppliers also Expertly inspected and certified for optimal performance.
                                                    <span style={{ textDecoration: "underline", color: "blue", fontSize: "12px", cursor: 'pointer' }} onClick={() => setShowMore(true)}>show more</span>
                                                </p>
                                            )}
                                            {showMore && (
                                                <p className=" mb-4 mb-md-0 mt-3" style={{ fontSize: "16px", textIndent: "20px" }}>
                                                    Affordable and reliable truck components ready for reuse and Durable used parts sourced from trusted suppliers also Expertly inspected and certified for optimal performance.
                                                </p>
                                            )}
                                        </div>
                                        <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                            <div className="d-flex flex-row align-items-center mb-1">
                                                <h4 className="mb-1 me-1">₹ 30000.00/ per quintal</h4>
                                            </div>
                                            <span style={{ color: "blue" }}>10 Quintal</span>
                                            <div className="d-flex flex-column mt-4">
                                                <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-sm" type="button" onClick={() => navigate('/ImageDetails')}>Details</button>
                                                <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-primary btn-sm mt-2" type="button">
                                                    Add to wishlist
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-flexstart mb-3">
                        <div className="col-md-12 col-xl-10">
                            <div className="card shadow-0 border rounded-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                                            <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                                <img src={scrap2}
                                                    className="w-100" />
                                                <a href="#!">
                                                    <div className="hover-overlay">
                                                        <div className="mask" style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}></div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-6 col-xl-6">
                                            <h5 style={{ fontWeight: "bold", fontSize: "19px" }}>Hare Ram Workshop </h5>
                                            <div className="d-flex flex-row">
                                                <div className="text-danger mb-1 me-2">
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                </div>
                                                <span>Delhi</span>
                                            </div>
                                            <hr />
                                            <div className="text-truncate mt-1 mb-0 text-muted small" style={{ display: "flex", flexDirection: "column", alignItems: 'flex-start', gap: '10px' }}>
                                                <span style={{ color: "darkblue" }}>• Guaranteed Parts</span>
                                                <span style={{ color: "#2356a1" }}>• Reliable</span>
                                                {showMore1 && (
                                                    <>
                                                        <span style={{ color: "blue" }}>• Trusted Partner</span>
                                                        <span style={{ color: "teal" }}>• Best Deal</span>
                                                        <span>• On Time Delivery</span>
                                                    </>
                                                )}
                                                <button
                                                    onClick={toggleShowMore}
                                                    style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', padding: 0, marginTop: '10px' }}
                                                >
                                                    {showMore1 ? 'Show Less' : 'Show More'}
                                                </button>
                                            </div>
                                           
                                            <hr />
                                            {!showMore && (<p style={{ textIndent: "20px", fontSize: "16px" }} className="text-truncate mb-4 mb-md-0 mt-3 ">
                                                Affordable and reliable truck components ready for reuse and
                                                Durable used parts sourced from trusted suppliers also
                                                Expertly inspected and certified for optimal performance.
                                                <span style={{ textDecoration: "underline", color: "blue", fontSize: "12px", cursor: 'pointer' }} onClick={() => setShowMore(true)}>show more</span>
                                            </p>
                                            )}
                                            {showMore && (
                                                <p className=" mb-4 mb-md-0 mt-3" style={{ fontSize: "16px", textIndent: "20px" }}>
                                                    Affordable and reliable truck components ready for reuse and
                                                    Durable used parts sourced from trusted suppliers also
                                                    Expertly inspected and certified for optimal performance.
                                                </p>)}
                                        </div>
                                        <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                            <div className="d-flex flex-row align-items-center mb-1">
                                                <h4 className="mb-1 me-1">₹ 25000.00/ per quintal</h4>
                                            </div>
                                            <span style={{ color: "blue" }}>15 Quintal</span>
                                            <div className="d-flex flex-column mt-4">
                                                <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-sm" type="button" onClick={() => navigate('/ImageDetails')}>Details</button>
                                                <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-primary btn-sm mt-2" type="button">
                                                    Add to wishlist
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-flexstart mb-3">
                        <div className="col-md-12 col-xl-10">
                            <div className="card shadow-0 border rounded-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                                            <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                                <img src={scrap3}
                                                    className="w-100" />
                                                <a href="#!">
                                                    <div className="hover-overlay">
                                                        <div className="mask" style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}></div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-6 col-xl-6">
                                            <h5 style={{ fontWeight: "bold", fontSize: "19px" }}>Lovely Workshop </h5>
                                            <div className="d-flex flex-row">
                                                <div className="text-danger mb-1 me-2">
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                </div>
                                                <span>Gurgoan</span>
                                            </div>
                                            <hr />
                                            <div className="text-truncate mt-1 mb-0 text-muted small" style={{ display: "flex", flexDirection: "column", alignItems: 'flex-start', gap: '10px' }}>
                                                <span style={{ color: "darkblue" }}>• Guaranteed Parts</span>
                                                <span style={{ color: "#2356a1" }}>• Reliable</span>
                                                {showMore1 && (
                                                    <>
                                                        <span style={{ color: "blue" }}>• Trusted Partner</span>
                                                        <span style={{ color: "teal" }}>• Best Deal</span>
                                                        <span>• On Time Delivery</span>
                                                    </>
                                                )}
                                                <button
                                                    onClick={toggleShowMore}
                                                    style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', padding: 0, marginTop: '10px' }}
                                                >
                                                    {showMore1 ? 'Show Less' : 'Show More'}
                                                </button>
                                            </div>
                                            <hr />
                                            {!showMore && (<p className="text-truncate mb-4 mb-md-0 mt-3 ">
                                                Affordable and reliable truck components ready for reuse and
                                                Durable used parts sourced from trusted suppliers also
                                                Expertly inspected and certified for optimal performance.
                                                <span style={{ textDecoration: "underline", color: "blue", fontSize: "12px", cursor: 'pointer' }} onClick={() => setShowMore(true)}>show more</span>
                                            </p>
                                            )}
                                            {showMore && (
                                                <p className=" mb-4 mb-md-0 mt-3" style={{ fontSize: "16px" }}>
                                                    Affordable and reliable truck components ready for reuse and
                                                    Durable used parts sourced from trusted suppliers also
                                                    Expertly inspected and certified for optimal performance.
                                                </p>)}
                                        </div>
                                        <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                            <div className="d-flex flex-row align-items-center mb-1">
                                                <h4 className="mb-1 me-1">₹ 32000.00/ per quintal</h4>
                                            </div>
                                            <span style={{ color: "blue" }}>30 Quintal</span>
                                            <div className="d-flex flex-column mt-4">
                                                <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-sm" type="button" onClick={() => navigate('/ImageDetails')}>Details</button>
                                                <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-primary btn-sm mt-2" type="button">
                                                    Add to wishlist
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            <div  className="promo-banner">
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    width: '200px',
                    padding: '15px',
                    background: '#fff',
                    border: '1px solid #ddd',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px'
                }}>
                    <img src = {shoppingonline}/>
                    <h6 style={{ fontWeight: 'bold', marginBottom: '10px', marginTop:"20px" }}>Get Products In Bulk !!!</h6>
                    <p style={{ fontSize: '14px', marginBottom: '0' }}>
                        Get an additional 10% discount on bulk orders.
                    </p>
                <img src={recieved}/>
                </div>
            </div>
            </section>
            <Footer />
        </div>
    )
}
export default ImageViewer;