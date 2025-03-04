import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './VendorViewRating.css'
import axios from 'axios';
// '../../environment';
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const RatingBreakdown = ({ customerRating }) => {
  const ratingCounts = {
    "90-100": customerRating.filter(
      (feedback) => feedback.feedbackRatingCrane >= 90 && feedback.feedbackRatingCrane <= 100
    ).length,
    "75-90": customerRating.filter(
      (feedback) => feedback.feedbackRatingCrane >= 75 && feedback.feedbackRatingCrane < 90
    ).length,
    "50-75": customerRating.filter(
      (feedback) => feedback.feedbackRatingCrane >= 50 && feedback.feedbackRatingCrane < 75
    ).length,
    "25-50": customerRating.filter(
      (feedback) => feedback.feedbackRatingCrane >= 25 && feedback.feedbackRatingCrane < 50
    ).length,
    "0-25": customerRating.filter(
      (feedback) => feedback.feedbackRatingCrane >= 0 && feedback.feedbackRatingCrane < 25
    ).length,
  };

  return (
    <div style={{ fontSize: "11px" }}>
      <h4 className="mt-3" style={{ color: "chocolate" , marginBottom:"10px"}}>Rating breakdown</h4>
      {Object.entries(ratingCounts).map(([range, count], index) => (
        <div key={index} className="d-flex align-items-center mb-2">
          <div style={{ width: '35px', fontWeight:"bold" }}>{range}</div>
          <div className="progress flex-grow-1 mx-2" style={{ height: '15px' }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: `${count * 20}%`,
                backgroundColor: 
                  range === "90-100" ? "#5cb85c" : 
                  range === "75-90" ? "#337ab7" : 
                  range === "50-75" ? "#5bc0de" : 
                  range === "25-50" ? "#f0ad4e" : 
                  "#d9534f",
              }}
            >
              {count}
            </div>
          </div>
          {/* <div>{count}</div> */}
        </div>
      ))}
    </div>
  );
};

const VendorViewRating = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [customerRating, setCustomerRating] = useState([]);
  const [average, setAverage] = useState(0);

  useEffect(() => {
    if (customerRating.length !== 0) {
      let avg = customerRating.reduce((acc, item) => acc + parseInt(item.feedbackRatingCrane), 0);   
      setAverage(avg / customerRating.length);
    }
  }, [customerRating]);

  useEffect(() => {
    FetchedRatingCases();
  }, []);

  const FetchedRatingCases = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/customersRating/${userId}`);
      setCustomerRating(response.data.data);
    } catch (error) {
      console.error("Failed to fetch assigned cases:", error);
    }
  };

  return (
    <div style={{ width: "300px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.5)", padding: "20px", background: 'antiquewhite' }}>
      <h4 style={{ color: 'violet', fontSize: "10px" }}>Average Rating</h4>
      <h2 className="bold padding-bottom-7" style={{marginTop:"20px"}}>
  {average} <small>/ 100 {average > 90 ? "😃" : (average > 75 && average <= 90) ? "😊" : (average > 50 && average <= 75) ? "👍" : (average > 25 && average <= 50) ? "😒" : "😞"}</small>
</h2>

      <RatingBreakdown customerRating={customerRating} />
      <p style={{
          fontSize: '11px',
          marginTop: "15px",
          background: "rgb(162 212 255)",
          padding: "10px",
          border: '1px solid blue',
          textAlign: 'center',
          borderRadius: '30px',
          fontWeight: "bold",
          color: "black",
          display: 'flex',
          alignItems: 'center',
          justifyContent: "center",
          position: "relative",
          cursor: "pointer",
          width: '250px'
        }}>
          <KeyboardDoubleArrowRightIcon style={{
            position: "absolute",
            left: '10px'
          }} />
          Get More...
        </p>
    </div>
  );
};

export default VendorViewRating;

