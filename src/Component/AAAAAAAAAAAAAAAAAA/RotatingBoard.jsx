import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RotatingBoard.css'
import trucksImage from '../../Assets/trucksImage (1).webp';
import trucksImage2 from '../../Assets/trucksImage3.avif';
import trucksImage4 from '../../Assets/trucksImage6.png';
import trucksImageblue from '../../Assets/truckimagesblue.avif';

import { useNavigate } from 'react-router-dom';



const RotatingBoard = () => {
  const navigate = useNavigate();
  const navigateToSignup = () => {
    navigate('/Registration')
  }
  const goLogin = () => {
    navigate('/LoginPage');
  };
  return (
    <div>
      {/* <header>
        <nav className="navb  ar navbar-expand-md navbar-dark fixed-top bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Carousel</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
                </li>
              </ul>
              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>
      </header> */}

      <main style={{ marginBottom: "0px" }}>
        <div id="myCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="3" aria-label="Slide 3"></button>

          </div>
          <div className="carousel-inner" style={{ height: '40rem' }} >
            <div className="carousel-item active" style={{ height: '40rem' }}>
              <img
                src={trucksImage2}
                className="bd-placeholder-img w-100"
                aria-hidden="true"
                style={{
                  maxWidth: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <rect width="100%" height="90%" fill="#777" />

              <div className="container">
                <div className="carousel-caption text-start">
                  <p
                    style={{
                      borderRadius: "10px",
                      color: "white",
                      fontWeight: 'bold',
                      fontSize: "16px",
                      background: "linear-gradient(to left, transparent, dimgrey)",
                      marginBottom: "10px",
                      padding:"10px",
                    }}
                    className="d-inline-block text-truncate"
                  >
                    Final Solution For All Your Problems !!!
                  </p>
                  <p>
                    <a
                      className="btn btn-sm btn-primary"
                      style={{ background: "green" }}
                      onClick={navigateToSignup}
                    >
                      Sign Up
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="carousel-item" style={{ height: '40rem' }}>
              <img
                src={trucksImage}
                className="bd-placeholder-img w-100"
                aria-hidden="true"
                style={{
                  maxWidth: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <rect width="100%" height="100%" fill="#777" />
              <div className="container">
                <div className="carousel-caption text-start">
                <p
                    style={{
                      borderRadius: "10px",
                      color: "white",
                      fontWeight: 'bold',
                      fontSize: "16px",
                      background: "linear-gradient(to left, transparent, dimgrey)",
                      marginBottom: "10px",
                      padding:"10px",
                    }}
                    className="d-inline-block text-truncate"
                  >All Services will get fulfilled </p>
                  <p><a
                      className="btn btn-sm btn-primary"
                      style={{ background: "green" }}
                      onClick={navigateToSignup}
                    >Come Join Us !!!</a></p>
                </div>
              </div>
            </div>
            <div className="carousel-item" style={{ height: '40rem' }}>
              <img
                src={trucksImageblue}
                className="bd-placeholder-img"
                aria-hidden="true"
                style={{
                  maxWidth: '100%',
                  height: '100%',
                  objectFit: 'none',
                }}
              />
              <rect width="100%" height="100%" fill="#777" />
              <div className="container">
                <div className="carousel-caption text-start">
                <p
                    style={{
                      borderRadius: "10px",
                      color: "lightblue",
                      fontWeight: 'bold',
                      fontSize: "16px",
                      background: "linear-gradient(to left, transparent, dimgrey)",
                      marginBottom: "10px",
                      padding:"10px",
                    }}
                    className="d-inline-block text-truncate"
                  >Start With Us !!! </p>
                  <p><a
                      className="btn btn-sm btn-primary"
                      style={{ background: "green" }}
                      onClick={navigateToSignup}
                    >Start</a></p>
                </div>
            </div>
          </div>

            <div className="carousel-item" style={{ height: '40rem' }}>
              <img
                src={trucksImage4}
                className="bd-placeholder-img"
                aria-hidden="true"
                style={{
                  maxWidth: '100%',
                  height: '100%',
                  objectFit: 'fill',
                }}
              />

              <rect width="100%" height="100%" fill="#777" />
              <div className="container">
                <div className="carousel-caption text-end">
                  <p style={{padding:"10px", borderRadius: "10px", color: "white", fontWeight: 'bold', fontSize: "16px", background: "linear-gradient(to left, transparent, white)", marginBottom: "10px" }}>Having Happy Customers Come Join In !!!</p>
                  <p><a className="btn btn-lg btn-primary" href="#"></a></p>
                </div>
              </div>
            </div>

          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev" >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden" >Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* <div className="container marketing">
          <div className="row">
            <div className="col-lg-4">
              <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false">
                <rect width="100%" height="100%" fill="#777" />
              </svg>
              <h2>Heading</h2>
              <p>Some representative placeholder content for the three columns of text below the carousel. This is the first column.</p>
              <p><a className="btn btn-secondary" href="#">View details &raquo;</a></p>
            </div>
            <div className="col-lg-4">
              <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false">
                <rect width="100%" height="100%" fill="#777" />
              </svg>
              <h2>Heading</h2>
              <p>Another exciting bit of representative placeholder content. This time, we've moved on to the second column.</p>
              <p><a className="btn btn-secondary" href="#">View details &raquo;</a></p>
            </div>
            <div className="col-lg-4">
              <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false">
                <rect width="100%" height="100%" fill="#777" />
              </svg>
              <h2>Heading</h2>
              <p>And lastly this, the third column of representative placeholder content.</p>
              <p><a className="btn btn-secondary" href="#">View details &raquo;</a></p>
            </div>
          </div>
        </div> */}

        {/* <footer className="container">
          <p className="float-end"><a href="#">Back to top</a></p>
          <p>&copy; 2017–2021 Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
        </footer> */}
      </main>
    </div>
  );
};

export default RotatingBoard;
