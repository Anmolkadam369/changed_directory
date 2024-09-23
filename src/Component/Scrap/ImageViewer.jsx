import React, { useState } from "react";
import './ImageViewer.css';
import { useNavigate } from 'react-router-dom';
import { useScrollTrigger } from "@mui/material";
import scrapMain from '../../Assets/scrapmain.jpg';
import scrap2 from '../../Assets/scrap2.jpeg';
import scrap3 from '../../Assets/scrap3.jpeg';
import scrap4 from '../../Assets/scrap4.webp';
import scrap5 from '../../Assets/scrap5.jpeg';


const ImageViewer = () => {
    const navigate = useNavigate();
    const [showMore, setShowMore] = useState(false);
    return (
        <section style={{ background: '#eee' }}>
            <div className="container py-5">
                <div className="row justify-content-center mb-3">
                    <div className="col-md-12 col-xl-10">
                        <div className="card shadow-0 border rounded-3">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                                        <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                            <img src={scrapMain}
                                                className="w-100" />
                                            <a href="#!">
                                                <div className="hover-overlay">
                                                    <div className="mask" style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}></div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-xl-6">
                                        <h5>Mahendra Super Working Workshop </h5>
                                        <div className="d-flex flex-row">
                                            <div className="text-danger mb-1 me-2">
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                            </div>
                                            <span>Gurgoan</span>
                                        </div>
                                        <div className="mt-1 mb-0 text-muted small" style={{ display: "flex", alignItems: 'center', gap: '10px' }}>
                                            <span className="text-primary"> • </span>
                                            <span>Gauranteed Parts</span>
                                            <span className="text-primary"> • </span>
                                            <span>Reliable</span>
                                            <span className="text-primary"> • </span>
                                            <span>Trusted Partner<br /></span>
                                        </div>
                                        <div className="mb-2 text-muted small" style={{ display: "flex", alignItems: 'center', gap: '10px' }}>
                                            <span className="text-primary"> • </span>
                                            <span>Best Deal</span>
                                            <span className="text-primary"> • </span>
                                            <span>On Time Delivery</span>
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
                                            <p className=" mb-4 mb-md-0 mt-3" style={{fontSize:"16px"}}>
                                                Affordable and reliable truck components ready for reuse and
                                                Durable used parts sourced from trusted suppliers also
                                                Expertly inspected and certified for optimal performance.
                                            </p>)}
                                    </div>
                                    <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                        <div className="d-flex flex-row align-items-center mb-1">
                                            <h4 className="mb-1 me-1">₹ 30000.00/ per quintal</h4>
                                        </div>
                                            <span style={{color:"blue"}}>10 Quintal</span>
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
                <div className="row justify-content-center mb-3">
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
                                        <h5>Hare Ram Workshop </h5>
                                        <div className="d-flex flex-row">
                                            <div className="text-danger mb-1 me-2">
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                            </div>
                                            <span>Delhi</span>
                                        </div>
                                        <div className="mt-1 mb-0 text-muted small" style={{ display: "flex", alignItems: 'center', gap: '10px' }}>
                                            <span className="text-primary"> • </span>
                                            <span>Reliable</span>
                                            <span className="text-primary"> • </span>
                                            <span>Gauranteed Parts</span>
                                            <span className="text-primary"> • </span>
                                            <span>Best Deal</span>
                                        </div>
                                        <div className="mb-2 text-muted small" style={{ display: "flex", alignItems: 'center', gap: '10px' }}>
                                            <span className="text-primary"> • </span>
                                            <span>Trusted Partner<br /></span>
                                            <span className="text-primary"> • </span>
                                            <span>On Time Delivery</span>
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
                                            <p className=" mb-4 mb-md-0 mt-3" style={{fontSize:"16px"}}>
                                                Affordable and reliable truck components ready for reuse and
                                                Durable used parts sourced from trusted suppliers also
                                                Expertly inspected and certified for optimal performance.
                                            </p>)}
                                    </div>
                                    <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                        <div className="d-flex flex-row align-items-center mb-1">
                                            <h4 className="mb-1 me-1">₹ 25000.00/ per quintal</h4>
                                        </div>
                                            <span style={{color:"blue"}}>15 Quintal</span>
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
                <div className="row justify-content-center mb-3">
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
                                        <h5>Lovely Workshop </h5>
                                        <div className="d-flex flex-row">
                                            <div className="text-danger mb-1 me-2">
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                            </div>
                                            <span>Gurgoan</span>
                                        </div>
                                        <div className="mt-1 mb-0 text-muted small" style={{ display: "flex", alignItems: 'center', gap: '10px' }}>
                                            <span className="text-primary"> • </span>
                                            <span>Best Deal</span>
                                            <span className="text-primary"> • </span>
                                            <span>Reliable</span>
                                            <span className="text-primary"> • </span>
                                            <span>On Time Delivery</span>

                                        </div>
                                        <div className="mb-2 text-muted small" style={{ display: "flex", alignItems: 'center', gap: '10px' }}>
                                        <span className="text-primary"> • </span>
                                        <span>Trusted Partner<br /></span>
                                        <span className="text-primary"> • </span>
                                        <span>Gauranteed Parts</span>

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
                                            <p className=" mb-4 mb-md-0 mt-3" style={{fontSize:"16px"}}>
                                                Affordable and reliable truck components ready for reuse and
                                                Durable used parts sourced from trusted suppliers also
                                                Expertly inspected and certified for optimal performance.
                                            </p>)}
                                    </div>
                                    <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                        <div className="d-flex flex-row align-items-center mb-1">
                                            <h4 className="mb-1 me-1">₹ 32000.00/ per quintal</h4>
                                        </div>
                                            <span style={{color:"blue"}}>30 Quintal</span>
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
        </section>
    )
}
export default ImageViewer;