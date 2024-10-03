import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RotatingBoard.css'
import trucksImage from '../../Assets/trucksImage (1).webp';
import trucksImage2 from '../../Assets/trucksImage3.jpg';
import trucksImage4 from '../../Assets/trucksImage6.png';
import { useNavigate } from 'react-router-dom';



const RotatingBoard = () => {
 const navigate=useNavigate();
 const navigateToSignup =()=>{
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
          </div>
          <div className="carousel-inner" >
            <div className="carousel-item active">
              <img
                src={trucksImage2} // Corrected line
                className="bd-placeholder-img"
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              />
                <rect width="100%" height="90%" fill="#777" />

              <div className="container">
                <div  className="carousel-caption text-start">
                  <p style ={{borderRadius:"10px",color:"white", fontWeight:'bold', fontSize:"23px", background:"linear-gradient(to left, transparent, dimgrey)", marginBottom:"10px"}}>Final Solution For All Your Problems !!!</p>
                  <p><a className="btn btn-lg btn-primary" style={{background:"green"}} onClick={navigateToSignup}>Sign Up</a></p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
            <img
                src={trucksImage} // Corrected line
                className="bd-placeholder-img"
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              />
                <rect width="100%" height="100%" fill="#777" />
              <div className="container">
                <div className="carousel-caption">
                  {/* <h1>Best Services Offer.</h1> */}
                  <p style ={{borderRadius:"10px",color:"black", fontWeight:'bold', fontSize:"23px", background:"linear-gradient(to left, transparent, white)", marginBottom:"10px"}}>All Services will get fulfilled </p>
                  <p><a className="btn btn-lg btn-primary" onClick={goLogin} >Come Join Us !!!</a></p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src={trucksImage4} // Corrected line
                className="bd-placeholder-img"
                width="60%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              />
                <rect width="100%" height="100%" fill="#777" />
              <div className="container">
                <div className="carousel-caption text-end">
                  {/* <h1>One more for good measure.</h1> */}
                  <p style ={{borderRadius:"10px",color:"black", fontWeight:'bold', fontSize:"23px", background:"linear-gradient(to left, transparent, white)", marginBottom:"10px"}}>Having Happy Customers Come Join In !!!</p>
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
