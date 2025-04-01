import "./Featured.css";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useEffect, useState } from "react";
import axios from 'axios';
import rupeesymbol  from '../../Assets/rupeesymbol.png'

const CompletePayment = () => {


  const [data, setData] = useState([])
  console.log("DATA GET DATA", data)
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  let [getFilteredDailyData, setGetFilteredDailyData] = useState([])
  let [getFilteredWeeklyData, setGetFilteredWeeklyData] = useState([])
  let [getFilteredMonthlyData, setGetFilteredMonthlyData] = useState([])

  let [completeDailyEarning, setCompleteDailyEarning] = useState({})
  let [completeWeeklyEarning, setCompleteWeeklyEarning] = useState({})
  let [completeMonthlyEarning, setCompleteMonthlyEarning] = useState({})

  console.log("completeDailyEarning", completeDailyEarning)
  console.log("completeWeeklyEarning", completeWeeklyEarning)
  console.log("completeMonthlyEarning", completeMonthlyEarning)



  console.log("getFilteredDailyData", getFilteredDailyData)
  console.log("getFilteredWeeklyData", getFilteredWeeklyData)
  console.log("getFilteredMonthlyData", getFilteredMonthlyData)


  let getFilteredTempDailyData, getFilteredTempWeeklyData, getFilteredTempMonthlyData
  useEffect(() => {
    const getFilteredData = (filter) => {
      console.log("data is here");
      getFilteredTempDailyData = []
      getFilteredTempWeeklyData = []
      getFilteredTempMonthlyData = []

      const now = new Date();  // Current date and time
      const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
      const yesterday = new Date(now.getTime() - oneDay); // Yesterday's date and time
      const weekBefore = new Date(now.getTime() - (oneDay * 7));
      const monthBefore = new Date(now.getTime() - (oneDay * 30));


      const formatDate = (date) => {

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const todayDate = formatDate(now);
      const yesterdayDate = formatDate(yesterday);
      const weekBeforeDate = formatDate(weekBefore)
      const monthBeforeDate = formatDate(monthBefore)

      console.log("todayDate", todayDate)
      console.log("yesterdayDate", yesterdayDate)


      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].vendorDetails.length; j++) {
          let getTime = data[i].vendorDetails[j].paidOn.split('|');
          let assignedDate = getTime[0];
          let assignedTime = getTime[1];
          let assignedDateTime = new Date(`${assignedDate} ${assignedTime}`);

          if (assignedDate === todayDate || assignedDate === yesterdayDate) {
            const timeDifference = now - assignedDateTime;
            if (timeDifference <= oneDay) {
              console.log("Match found within last 24 hours:", data[i]);
              if (data[i].vendorDetails.acceptedByAdmin === 'reject') continue;
              if (data[i].vendorDetails.vendorDecision === 'reject') continue;

              getFilteredTempDailyData.push(data[i])
            }
          }

          if (assignedDateTime >= weekBefore && assignedDateTime <= now) {
            console.log("Match found within last 7 days:", data[i]);
            if (data[i].vendorDetails.acceptedByAdmin === 'reject') continue;
            if (data[i].vendorDetails.vendorDecision === 'reject') continue;

            getFilteredTempWeeklyData.push(data[i])

          }


          if (assignedDateTime >= monthBefore && assignedDateTime <= now) {
            console.log("Match found within last 30 days:", data[i]);
            if (data[i].vendorDetails.acceptedByAdmin === 'reject') continue;
            if (data[i].vendorDetails.vendorDecision === 'reject') continue;

            getFilteredTempMonthlyData.push(data[i])
          }
        }
      }
      setGetFilteredDailyData(getFilteredTempDailyData)
      setGetFilteredWeeklyData(getFilteredTempWeeklyData)
      setGetFilteredMonthlyData(getFilteredTempMonthlyData)

    };
    getFilteredData()
  }, [data])


  useEffect(() => {

    const getParticularData = () => {

      //for daily

      let totalDailyEarnings=0, totalDailyCommision=0;
      getFilteredDailyData.forEach((dataItem)=>{
        if(dataItem.vendorDetails && dataItem.vendorDetails.length > 0){
          dataItem.vendorDetails.forEach((vendorDetail)=>{
            totalDailyEarnings += Number(vendorDetail.advancedPayment || 0) + Number(vendorDetail.balancePayment || 0);
            totalDailyCommision += Number(vendorDetail.commisionAmount || 0);
          })
        }
      })

      setCompleteDailyEarning({
        totalEarnings: totalDailyEarnings,
        dailylength: getFilteredDailyData.length,
        totalDailyCommision: totalDailyCommision,
      })

      // For Weekly

      let totalWeeklyEarnings=0, totalWeeklyCommision=0;
      getFilteredWeeklyData.forEach((dataItem)=>{
        if(dataItem.vendorDetails && dataItem.vendorDetails.length > 0){
          dataItem.vendorDetails.forEach((vendorDetail)=>{
            totalWeeklyEarnings += Number(vendorDetail.advancedPayment || 0) + Number(vendorDetail.balancePayment || 0);
            totalWeeklyCommision += Number(vendorDetail.commisionAmount || 0);
          })
        }
      })

      setCompleteWeeklyEarning({
        totalEarnings: totalWeeklyEarnings,
        Weeklylength: getFilteredWeeklyData.length,
        totalWeeklyCommision: totalWeeklyCommision,
      })

      // for Monthly

      let totalMonthlyEarnings=0, totalMonthlyCommision=0;
      
      getFilteredMonthlyData.forEach((dataItem) => {
        if (dataItem.vendorDetails && dataItem.vendorDetails.length > 0) {
          dataItem.vendorDetails.forEach((vendorDetail) => {
            totalMonthlyEarnings += Number(vendorDetail.advancedPayment || 0) + Number(vendorDetail.balancePayment || 0);
            totalMonthlyCommision += Number(vendorDetail.commisionAmount || 0);
          });
        }
      })

      setCompleteMonthlyEarning({
        totalEarnings: totalMonthlyEarnings,
        Monthlylength: getFilteredMonthlyData.length,
        totalMonthlyCommision: totalMonthlyCommision,
      })

    }



    getParticularData()

  }, [getFilteredDailyData, getFilteredMonthlyData, getFilteredWeeklyData])





  useEffect(() => {
    getVendorWholeDetails()
  }, [userId])

  const getVendorWholeDetails = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getVendorWholeDetails/${userId}/${userId}`,{ headers: { Authorization: `Bearer ${token}` }});
    setData(response.data.data);
    console.log("VENDORDETAILSFEATURES", response.data.data)
  };

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].vendorDetails.length; j++) {
      console.log("data.vendorDetails-only", data[i].vendorDetails[j])
      console.log("data[i].vendorDetails[j].advancedPayment", data[i].vendorDetails[j].advancedPayment)
      console.log("data[i].vendorDetails[j].balancePayment", data[i].vendorDetails[j].balancePayment)
      console.log("data[i].vendorDetails[j].commisionAmount", data[i].vendorDetails[j].commisionAmount)
    }
  }
  


  return (
    <div className="featured">
      <div className="top" style={{ marginBottom: "20px" }}>
        {/* <h1 style={{ fontSize: "12px" }}>Earnings </h1> */}
        {/* <MoreVertIcon fontSize="small" /> */}
      </div>
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-around" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ fontSize: "12px", marginBottom: "12px", color: 'blue', display:'flex', alignItems:'center' }}><img src={rupeesymbol} style={{height:"20px", width:'20px'}}/>Earning's</p>
          <p className="amount" style={{ textAlign: 'center', fontSize: "12px", marginBottom: "12px", color: 'green', fontWeight: "bold" }}>₹{completeDailyEarning.totalEarnings}</p>
        </div>
        |
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ fontSize: "12px", marginBottom: "12px", color: '#0eb1b3' }}>No Of Services</p>
          <p className="amount" style={{ textAlign: 'center', fontSize: "12px", marginBottom: "12px", color: 'green', fontWeight: "bold" }}>{completeDailyEarning.dailylength}</p>
        </div>
        |
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ fontSize: "12px", marginBottom: "12px", color: '#ff8400' }}>Commision</p>
          <p className="amount" style={{ textAlign: 'center', fontSize: "12px", marginBottom: "12px", color: 'green', fontWeight: "bold" }}>₹{completeDailyEarning.totalDailyCommision}</p>
        </div>
      </div>
      <div className="bottom">
        {/* <div className="featuredChart"> */}
        {/* <CircularProgressbar value={30} text={"30%"} strokeWidth={5} /> */}
        {/* </div> */}

        <p className="desc" style={{ color: "green" }}>
          *   Previous transactions processing. Last payments may not be included.
        </p>
        <br />
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Weekly Earning's</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">₹{completeWeeklyEarning.totalEarnings}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Monthly Earning's</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">₹{completeMonthlyEarning.totalEarnings}</div>
            </div>
          </div>
        </div>

        <p style={{
          fontSize: '11px',
          marginTop: "5px",
          background: "#4b6174",
          padding: "10px",
          border: '1px solid blue',
          textAlign: 'center',
          borderRadius: '30px',
          fontWeight: "bold",
          color: "white",
          display: 'flex',
          alignItems: 'center',
          justifyContent: "center",
          position: "relative",
          cursor: "pointer",
          width: '200px'
        }}>
          <KeyboardDoubleArrowRightIcon style={{
            position: "absolute",
            left: '10px'
          }} />
          View More
        </p>
      </div>
    </div>
  );
};

export default CompletePayment;