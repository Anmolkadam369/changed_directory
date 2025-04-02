import React, { useState } from 'react';
import './ImageDetails.css'
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';

import scrapMain from '../../../Assets/scrapmain.jpg';
import scrap2 from '../../../Assets/scrap2.jpeg';
import scrap3 from '../../../Assets/scrap3.jpeg';
import scrap4 from '../../../Assets/scrap4.webp';
import scrap5 from '../../../Assets/scrap5.jpeg';
import Header from '../Header';
import Footer from '../Footer';
import cart from '../../../Assets/cart.png'
import shoppingbag from '../../../Assets/shopping-bag.png'
import heart from '../../../Assets/heart.png'



const ImageDetails = () => {
    const images = [scrapMain, scrap2, scrap3, scrap4, scrap5]
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
    return (
        <div>
            <Header />
            <div>
                {/* <div className="p-3 text-center bg-white border-bottom">
                    <div className="container">
                        <div className="row gy-3">
                            <div className="col-lg-2 col-sm-4 col-4">
                                <a href="https://mdbootstrap.com/" target="_blank" className="float-start">
                                    <img src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png" height="35" />
                                </a>
                            </div>
    
                            <div className="order-lg-last col-lg-5 col-sm-8 col-8">
                                <div className="d-flex float-end">
                                    <a href="https://github.com/mdbootstrap/bootstrap-material-design" className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center" target="_blank"> <i className="fas fa-user m-1 me-md-2"></i><p className="d-none d-md-block mb-0">Sign in</p> </a>
                                    <a href="https://github.com/mdbootstrap/bootstrap-material-design" className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center" target="_blank"> <i className="fas fa-heart m-1 me-md-2"></i><p className="d-none d-md-block mb-0">Wishlist</p> </a>
                                    <a href="https://github.com/mdbootstrap/bootstrap-material-design" className="border rounded py-1 px-3 nav-link d-flex align-items-center" target="_blank"> <i className="fas fa-shopping-cart m-1 me-md-2"></i><p className="d-none d-md-block mb-0">My cart</p> </a>
                                </div>
                            </div>
    
                            <div className="col-lg-5 col-md-12 col-12">
                                <div className="input-group float-center">
                                    <div className="form-outline">
                                        <input type="search" id="form1" className="form-control" />
                                        <label className="form-label" for="form1">Search</label>
                                    </div>
                                    <button type="button" className="btn btn-primary shadow-0">
                                        <i className="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div className="bg-primary">
                    <div className="container py-4">
                        <nav className="d-flex">
                            <h6 className="mb-0">
                                <a href="" className="text-white-50">Home</a>
                                <span className="text-white-50 mx-2"> </span>
                                <a href="" className="text-white-50">Library</a>
                                <span className="text-white-50 mx-2"> </span>
                                <a href="" className="text-white"><u>Data</u></a>
                            </h6>
                        </nav>
                    </div>
                </div> */}

                <section className="py-5">
                    <div className="container">
                        <div className="row gx-5" style={{ background: "transparent" }}>
                            <aside className="col-lg-6">
                                <div className="position-relative">
                                    <div className="border rounded-4 mb-3 d-flex justify-content-center" style={{ width: "100%", height: "70vh", overflow: "hidden" }}>
                                        <a data-fslightbox="mygalley" className="rounded-4" target="_blank" data-type="image" href={images[currentIndex]}>
                                            <img style={{ width: "100%", height: "100%", margin: "auto", borderRadius: '10px' }} src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} />
                                        </a>
                                    </div>


                                    <button
                                        className="btn btn-secondary position-absolute"
                                        style={{ left: '10px', top: '50%', transform: 'translateY(-50%)' }}
                                        onClick={handlePrevious}
                                        disabled={currentIndex === 0}
                                    >
                                        <ArrowBack />
                                        {/* <FontAwesomeIcon icon={faChevronLeft} /> */}
                                    </button>
                                    <button
                                        className="btn btn-secondary position-absolute"
                                        style={{ right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                                        onClick={handleNext}
                                        disabled={currentIndex === images.length - 1}
                                    >
                                        <ArrowForward />
                                        {/* <FontAwesomeIcon icon={faChevronRight} /> */}
                                    </button>
                                </div>

                                {/* <div className="d-flex justify-content-center mb-3">
                                <a
                                    data-fslightbox="mygalley"
                                    className="border mx-1 rounded-2 item-thumb"
                                    target="_blank"
                                    data-type="image"
                                    href={scrap2}
                                >
                                    <img
                                        width="60"
                                        height="60"
                                        className="rounded-2"
                                        src={scrap2}
                                    />
                                </a>
                                <a
                                    data-fslightbox="mygalley"
                                    className="border mx-1 rounded-2 item-thumb"
                                    target="_blank"
                                    data-type="image"
                                    href="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big2.webp"
                                >
                                    <img
                                        width="60"
                                        height="60"
                                        className="rounded-2"
                                        src="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big2.webp"
                                    />
                                </a>
                                <a
                                    data-fslightbox="mygalley"
                                    className="border mx-1 rounded-2 item-thumb"
                                    target="_blank"
                                    data-type="image"
                                    href="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big3.webp"
                                >
                                    <img
                                        width="60"
                                        height="60"
                                        className="rounded-2"
                                        src="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big3.webp"
                                    />
                                </a>
                                <a
                                    data-fslightbox="mygalley"
                                    className="border mx-1 rounded-2 item-thumb"
                                    target="_blank"
                                    data-type="image"
                                    href="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big4.webp"
                                >
                                    <img
                                        width="60"
                                        height="60"
                                        className="rounded-2"
                                        src="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big4.webp"
                                    />
                                </a>
                                <a
                                    data-fslightbox="mygalley"
                                    className="border mx-1 rounded-2 item-thumb"
                                    target="_blank"
                                    data-type="image"
                                    href="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big.webp"
                                >
                                    <img
                                        width="60"
                                        height="60"
                                        className="rounded-2"
                                        src="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big.webp"
                                    />
                                </a>
                            </div> */}

                            </aside>
                            <main className="col-lg-6">
                                <div className="ps-lg-3">
                                    <h4 style={{ fontSize: "16px" }} className="title text-dark fw-bold">
                                        MAHENDRA SUPER WORKING WORKSHOP  <br />

                                    </h4>
                                    <div className="d-flex flex-row my-3">
                                        <div className="text-warning mb-1 me-2">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fas fa-star-half"></i>
                                            <span className="ms-1">
                                                Rating
                                                4.5
                                            </span>
                                        </div>
                                        {/* <span className="text-muted"><i className="fas fa-shopping-basket fa-sm mx-1"></i>154 orders</span> */}
                                        <span className="text-success ms-2">Available</span>
                                    </div>

                                    <div className="mb-3">
                                        <span className="h4 text-muted fw-bold">₹ 30000.00 /per quintal</span>
                                    </div>

                                    <p>
                                        Affordable and reliable truck components ready for reuse and
                                        Durable used parts sourced from trusted suppliers also
                                        Expertly inspected and certified for optimal performance.
                                    </p>

                                    <div className="row" style={{ margin: "20px" }}>
                                        <dt className="col-4 fw-bold">Workshop:</dt>
                                        <dd className="col-8">Mahendra super working workshop</dd>

                                        <dt className="col-4 fw-bold">Weight:</dt>
                                        <dd className="col-8">10 quintal</dd>

                                        <dt className="col-4 fw-bold">Material:</dt>
                                        <dd className="col-8">Parts of truks, cars and other repaired vehicles</dd>

                                    </div>

                                    <hr />

                                    <div className="row mb-4">
                                        {/* <div className="col-md-4 col-6">
                                        <label className="mb-2">Size</label>
                                        <select className="form-select border border-secondary" style={{ height: "35px" }}>
                                            <option>Small</option>
                                            <option>Medium</option>
                                            <option>Large</option>
                                        </select>
                                    </div> */}

                                        <div className="col-md-4 col-6 mb-3">
                                            <label className="mb-2 d-block">Quantity in Kg</label>
                                            <div className="input-group">
                                                {/* <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon1">
                                            +
                                        </button> */}
                                                <input type="text" className="form-control text-center border border-secondary" placeholder="100" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                                {/* <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon2">
                                            -
                                        </button> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <a href="#" className="btn btn-warning shadow-0" style={{ display: 'inline-flex', alignItems: 'center', marginRight: "10px" }}>
                                            <img style={{ width: '20px', marginRight: '8px' }} src={shoppingbag} alt="Shopping Bag" />
                                            Buy now
                                        </a>

                                        <a href="#" className="btn btn-primary shadow-0" style={{ display: 'inline-flex', alignItems: 'center', marginRight: "10px" }}>
                                            <img style={{ width: '20px', marginRight: '8px' }} src={cart} alt="Shopping Bag" />
                                            Add to Cart
                                        </a>

                                        <a href="#" className="btn btn-primary shadow-0 py-2 icon-hover px-3" style={{ display: 'inline-flex', alignItems: 'center', marginRight: "10px" }}>
                                            <img style={{ width: '20px', marginRight: '8px' }} src={heart} alt="Shopping Bag" />
                                            Save
                                        </a>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </section>

                <section className="bg-light border-top py-4">
                    <div className="container">
                        <div className="row gx-4">
                            <div className="col-lg-8 mb-4">
                                <div className="border rounded-2 px-3 py-2 bg-white">
                                    <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                                        <li className="nav-item d-flex" role="presentation">
                                            <a className="nav-link d-flex align-items-center justify-content-center w-100 active" id="ex1-tab-1" data-mdb-toggle="pill" href="#ex1-pills-1" role="tab" aria-controls="ex1-pills-1" aria-selected="true">Specification</a>
                                        </li>
                                        {/* <li className="nav-item d-flex" role="presentation">
                                        <a className="nav-link d-flex align-items-center justify-content-center w-100" id="ex1-tab-2" data-mdb-toggle="pill" href="#ex1-pills-2" role="tab" aria-controls="ex1-pills-2" aria-selected="false">Warranty info</a>
                                    </li>
                                    <li className="nav-item d-flex" role="presentation">
                                        <a className="nav-link d-flex align-items-center justify-content-center w-100" id="ex1-tab-3" data-mdb-toggle="pill" href="#ex1-pills-3" role="tab" aria-controls="ex1-pills-3" aria-selected="false">Shipping info</a>
                                    </li> */}
                                        <li className="nav-item d-flex" role="presentation">
                                            <a className="nav-link d-flex align-items-center justify-content-center w-100" id="ex1-tab-4" data-mdb-toggle="pill" href="#ex1-pills-4" role="tab" aria-controls="ex1-pills-4" aria-selected="true">Seller profile</a>
                                        </li>
                                    </ul>

                                    <div className="tab-content" id="ex1-content">
                                        <div className="tab-pane fade show active" id="ex1-pills-1" role="tabpanel" aria-labelledby="ex1-tab-1">
                                            <p>
                                                Welcome to Mahendra Super Working Workshop, your go-to destination for high-quality scrap parts! Located at 123 Main Street, Anytown, we specialize in selling scrap from trucks, cars, and other vehicles. Our extensive inventory includes a wide range of used parts, ensuring you find exactly what you need for your repairs or projects.


                                            </p>
                                            {/* <div className="row mb-2" style={{marginTop:"20px"}}>
                                            <div className="col-12 col-md-6" >
                                                <ul className="list-unstyled mb-0">
                                                    <li><i className="fas fa-check text-success me-2"></i>Some great feature name here</li>
                                                    <li><i className="fas fa-check text-success me-2"></i>Lorem ipsum dolor sit amet, consectetur</li>
                                                    <li><i className="fas fa-check text-success me-2"></i>Duis aute irure dolor in reprehenderit</li>
                                                    <li><i className="fas fa-check text-success me-2"></i>Optical heart sensor</li>
                                                </ul>
                                            </div>
                                            <div className="col-12 col-md-6 mb-0">
                                                <ul className="list-unstyled">
                                                    <li><i className="fas fa-check text-success me-2"></i>Easy fast and ver good</li>
                                                    <li><i className="fas fa-check text-success me-2"></i>Some great feature name here</li>
                                                    <li><i className="fas fa-check text-success me-2"></i>Modern style and design</li>
                                                </ul>
                                            </div>
                                        </div> */}
                                            <table className="table border mt-3 mb-2">
                                                <tr>
                                                    <th className="py-2">Name:</th>
                                                    <td className="py-2">Mahendra super working workshop</td>
                                                </tr>
                                                <tr>
                                                    <th className="py-2">Weight:</th>
                                                    <td className="py-2">10 quintal</td>
                                                </tr>
                                                <tr>
                                                    <th className="py-2">Material : </th>
                                                    <td className="py-2">Parts of truks, cars and other repaired vehicles</td>
                                                </tr>

                                            </table>
                                        </div>
                                        <div className="tab-pane fade mb-2" id="ex1-pills-2" role="tabpanel" aria-labelledby="ex1-tab-2">
                                            Tab content or sample information now <br />
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                            officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                        </div>
                                        <div className="tab-pane fade mb-2" id="ex1-pills-3" role="tabpanel" aria-labelledby="ex1-tab-3">
                                            Another tab content or sample information now <br />
                                            Dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                            mollit anim id est laborum.
                                        </div>
                                        <div className="tab-pane fade mb-2" id="ex1-pills-4" role="tabpanel" aria-labelledby="ex1-tab-4">
                                            Some other tab content or sample information now <br />
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                            officia deserunt mollit anim id est laborum.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="px-0 border rounded-2 shadow-0">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Similar Material</h5>
                                            <div className="d-flex mb-3">
                                                <a href="#" className="me-3">
                                                    <img src={scrap2} style={{ minWidth: "96px", height: "96px" }} className="img-md img-thumbnail" />
                                                </a>
                                                <div className="info">
                                                    <a href="#" className="nav-link mb-1">
                                                        RAMCHANDRA WORKSHOP
                                                    </a>
                                                    <strong style={{ fontSize: "10px" }} className="text-dark">Weight : 12 quintal</strong> <br />
                                                    <strong style={{ fontSize: "10px" }} className="text-dark"> Price : 30000.00 /per quintal</strong>
                                                </div>
                                            </div>

                                            <div className="d-flex mb-3">
                                                <a href="#" className="me-3">
                                                    <img src={scrap3} style={{ minWidth: "96px", height: "96px" }} className="img-md img-thumbnail" />
                                                </a>
                                                <div className="info">
                                                    <a href="#" className="nav-link mb-1">
                                                        KRISHNA WORKSHOP
                                                    </a>
                                                    <strong style={{ fontSize: "10px" }} className="text-dark">Weight : 22 quintal</strong> <br />
                                                    <strong style={{ fontSize: "10px" }} className="text-dark"> Price : 25000.00 /per quintal</strong>
                                                </div>
                                            </div>

                                            <div className="d-flex mb-3">
                                                <a href="#" className="me-3">
                                                    <img
                                                        src={scrap4}
                                                        style={{ minWidth: '96px', height: '96px' }}
                                                        classNameName="img-md img-thumbnail"
                                                    />

                                                </a>
                                                <div className="info">
                                                    <a href="#" className="nav-link mb-1"> HARE RAM WORKSHOP </a>
                                                    <strong style={{ fontSize: "10px" }} className="text-dark">Weight : 15 quintal</strong> <br />
                                                    <strong style={{ fontSize: "10px" }} className="text-dark"> Price : 25000.00 /per quintal</strong>
                                                </div>
                                            </div>

                                            <div className="d-flex">
                                                <a href="#" className="me-3">
                                                    <img src={scrap5} style={{ minWidth: '96px', height: '96px' }} className="img-md img-thumbnail" />
                                                </a>
                                                <div className="info">
                                                    <a href="#" className="nav-link mb-1"> LOVELY WORKSHOP </a>
                                                    <strong style={{ fontSize: "10px" }} className="text-dark">Weight : 30 quintal</strong> <br />
                                                    <strong style={{ fontSize: "10px" }} className="text-dark"> Price : 32000.00 /per quintal</strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <footer className="text-center text-lg-start text-muted bg-primary mt-3">
                <section className="">
                    <div className="container text-center text-md-start pt-4 pb-4">
                        <div className="row mt-3">
                            <div className="col-12 col-lg-3 col-sm-12 mb-2">
                                <a href="https://mdbootstrap.com/" target="_blank" className="text-white h2">
                                    MDB
                                </a>
                                <p className="mt-1 text-white">
                                    © 2023 Copyright: MDBootstrap.com
                                </p>
                            </div>

                            <div className="col-6 col-sm-4 col-lg-2">
                                <h6 className="text-uppercase text-white fw-bold mb-2">
                                    Store
                                </h6>
                                <ul className="list-unstyled mb-4">
                                    <li><a className="text-white-50" href="#">About us</a></li>
                                    <li><a className="text-white-50" href="#">Find store</a></li>
                                    <li><a className="text-white-50" href="#">Categories</a></li>
                                    <li><a className="text-white-50" href="#">Blogs</a></li>
                                </ul>
                            </div>

                            <div className="col-6 col-sm-4 col-lg-2">
                                <h6 className="text-uppercase text-white fw-bold mb-2">
                                    Information
                                </h6>
                                <ul className="list-unstyled mb-4">
                                    <li><a className="text-white-50" href="#">Help center</a></li>
                                    <li><a className="text-white-50" href="#">Money refund</a></li>
                                    <li><a className="text-white-50" href="#">Shipping info</a></li>
                                    <li><a className="text-white-50" href="#">Refunds</a></li>
                                </ul>
                            </div>

                            <div className="col-6 col-sm-4 col-lg-2">
                                <h6 className="text-uppercase text-white fw-bold mb-2">
                                    Support
                                </h6>
                                <ul className="list-unstyled mb-4">
                                    <li><a className="text-white-50" href="#">Help center</a></li>
                                    <li><a className="text-white-50" href="#">Documents</a></li>
                                    <li><a className="text-white-50" href="#">Account restore</a></li>
                                    <li><a className="text-white-50" href="#">My orders</a></li>
                                </ul>
                            </div>

                            <div className="col-12 col-sm-12 col-lg-3">
                                <h6 className="text-uppercase text-white fw-bold mb-2">Newsletter</h6>
                                <p className="text-white">Stay in touch with latest updates about our products and offers</p>
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control border" placeholder="Email" aria-label="Email" aria-describedby="button-addon2" />
                                    <button className="btn btn-light border shadow-0" type="button" id="button-addon2" data-mdb-ripple-color="dark">
                                        Join
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="">
                    <div className="container">
                        <div className="d-flex justify-content-between py-4 border-top">
                            <div>
                                <i className="fab fa-lg fa-cc-visa text-white"></i>
                                <i className="fab fa-lg fa-cc-amex text-white"></i>
                                <i className="fab fa-lg fa-cc-mastercard text-white"></i>
                                <i className="fab fa-lg fa-cc-paypal text-white"></i>
                            </div>

                            <div className="dropdown dropup">
                                <a className="dropdown-toggle text-white" href="#" id="Dropdown" role="button" data-mdb-toggle="dropdown" aria-expanded="false"> <i className="flag-united-kingdom flag m-0 me-1"></i>English </a>

                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="Dropdown">
                                    <li>
                                        <a className="dropdown-item" href="#"><i className="flag-united-kingdom flag"></i>English <i className="fa fa-check text-success ms-2"></i></a>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <a className="dropdown-item" href="#"><i className="flag-poland flag"></i>Polski</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#"><i className="flag-china flag"></i>中文</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#"><i className="flag-japan flag"></i>日本語</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#"><i className="flag-germany flag"></i>Deutsch</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#"><i className="flag-france flag"></i>Français</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#"><i className="flag-spain flag"></i>Español</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#"><i className="flag-russia flag"></i>Русский</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#"><i className="flag-portugal flag"></i>Português</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer> */}
            </div>
            <Footer />
        </div>
    );
};

export default ImageDetails;
