import "./Featured.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useEffect, useState } from "react";
import axios from 'axios';
import backendUrl from '../../environment';
import rupeesymbol from '../../Assets/rupeesymbol.png'
import MiscellaneousServicesOutlinedIcon from '@mui/icons-material/MiscellaneousServicesOutlined';
const Featured = () => {


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
  const [todayEarning, setTodayEarning] = useState(0);
  const [last7Days, setLast7Days] = useState(0);
  const [lastMonth, setLastMonth] = useState(0);
  const [lastYear, setLastYear] = useState(0);

  // console.log("completeDailyEarning", completeDailyEarning)
  // console.log("completeWeeklyEarning", completeWeeklyEarning)
  // console.log("completeMonthlyEarning", completeMonthlyEarning)



  // console.log("getFilteredDailyData", getFilteredDailyData)
  // console.log("getFilteredWeeklyData", getFilteredWeeklyData)
  // console.log("getFilteredMonthlyData", getFilteredMonthlyData)


  let getFilteredTempDailyData, getFilteredTempWeeklyData, getFilteredTempMonthlyData
  // useEffect(() => {
  //   const getFilteredData = () => {
  //     console.log("data is here");
  //     getFilteredTempDailyData = []
  //     getFilteredTempWeeklyData = []
  //     getFilteredTempMonthlyData = []

  //     const now = new Date();  // Current date and time
  //     const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
  //     const yesterday = new Date(now.getTime() - oneDay); // Yesterday's date and time
  //     const weekBefore = new Date(now.getTime() - (oneDay * 7));
  //     const monthBefore = new Date(now.getTime() - (oneDay * 30));


  //     const formatDate = (date) => {

  //       const year = date.getFullYear();
  //       const month = String(date.getMonth() + 1).padStart(2, '0');
  //       const day = String(date.getDate()).padStart(2, '0');
  //       return `${year}-${month}-${day}`;
  //     };

  //     const todayDate = formatDate(now);
  //     const yesterdayDate = formatDate(yesterday);
  //     const weekBeforeDate = formatDate(weekBefore)
  //     const monthBeforeDate = formatDate(monthBefore)

  //     console.log("todayDate", todayDate)
  //     console.log("yesterdayDate", yesterdayDate)


  //     for (let i = 0; i < data.length; i++) {
  //       for (let j = 0; j < data[i].vendorDetails.length; j++) {
  //         console.log("data[i].vendorDetails[j]", data[i].vendorDetails[j].paidOn)
  //         if(data[i].vendorDetails[j].paidOn != null){
  //         let getTime = data[i].vendorDetails[j].paidOn.split('|');
  //         let assignedDate = getTime[0];
  //         let assignedTime = getTime[1];
  //         let assignedDateTime = new Date(`${assignedDate} ${assignedTime}`);

  //         if (assignedDate === todayDate || assignedDate === yesterdayDate) {
  //           const timeDifference = now - assignedDateTime;
  //           if (timeDifference <= oneDay) {
  //             console.log("Match found within last 24 hours:", data[i]);
  //             if (data[i].vendorDetails.acceptedByAdmin == 'reject') continue;
  //             if (data[i].vendorDetails.vendorDecision == 'reject') continue;

  //             getFilteredTempDailyData.push(data[i])
  //           }
  //         }

  //         if (assignedDateTime >= weekBefore && assignedDateTime <= now) {
  //           console.log("Match found within last 7 days:", data[i]);
  //           if (data[i].vendorDetails.acceptedByAdmin == 'reject') continue;
  //           if (data[i].vendorDetails.vendorDecision == 'reject') continue;

  //           getFilteredTempWeeklyData.push(data[i])

  //         }


  //         if (assignedDateTime >= monthBefore && assignedDateTime <= now) {
  //           console.log("Match found within last 30 days:", data[i]);
  //           if (data[i].vendorDetails.acceptedByAdmin == 'reject') continue;
  //           if (data[i].vendorDetails.vendorDecision == 'reject') continue;

  //           getFilteredTempMonthlyData.push(data[i])
  //         }
  //       }
  //       }
  //     }
  //     setGetFilteredDailyData(getFilteredTempDailyData)
  //     setGetFilteredWeeklyData(getFilteredTempWeeklyData)
  //     setGetFilteredMonthlyData(getFilteredTempMonthlyData)

  //   };
  //   getFilteredData()
  // }, [data])



  useEffect(() => {
    if (data.length > 0) {
      const today = new Date();
      const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const startOf7DaysAgo = new Date(today);
      startOf7DaysAgo.setDate(today.getDate() - 7);
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const startOfYear = new Date(today.getFullYear(), 0, 1);

      let todayEarningSum = 0;
      let last7DaysSum = 0;
      let lastMonthSum = 0;
      let lastYearSum = 0;

      data.forEach((entry) => {
        const confirmDoneTime = new Date(entry.confirmDoneWorkingTime.replace('|', ' '));
        const charge = parseFloat(entry.charges);

        if (confirmDoneTime >= startOfToday) {
          todayEarningSum += charge;
        }
        if (confirmDoneTime >= startOf7DaysAgo) {
          last7DaysSum += charge;
        }
        if (confirmDoneTime >= startOfMonth) {
          lastMonthSum += charge;
        }
        if (confirmDoneTime >= startOfYear) {
          lastYearSum += charge;
        }
      });

      setTodayEarning(todayEarningSum);
      setLast7Days(last7DaysSum);
      setLastMonth(lastMonthSum);
      setLastYear(lastYearSum);
    }
  }, [data]);

  useEffect(() => {

    const getParticularData = () => {

      //for daily

      let totalDailyEarnings = 0, totalDailyCommision = 0;
      getFilteredDailyData.forEach((dataItem) => {
        if (dataItem.vendorDetails && dataItem.vendorDetails.length > 0) {
          dataItem.vendorDetails.forEach((vendorDetail) => {
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

      let totalWeeklyEarnings = 0, totalWeeklyCommision = 0;
      getFilteredWeeklyData.forEach((dataItem) => {
        if (dataItem.vendorDetails && dataItem.vendorDetails.length > 0) {
          dataItem.vendorDetails.forEach((vendorDetail) => {
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

      let totalMonthlyEarnings = 0, totalMonthlyCommision = 0;

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
    const response = await axios.get(`${backendUrl}/api/getVendorWholeDetails/${userId}/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
    setData(response.data.data);
  };
  return (
    <div className="featured" style={{ maxWidth: "400px", minWidth: '300px' }}>
      <div className="top" style={{ marginBottom: "20px" }}>

      </div>
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-around" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ fontSize: "12px", marginBottom: "12px", color: 'blue', display: 'flex', alignItems: 'center' }}><img src={rupeesymbol} style={{ height: "20px", width: '20px' }} />Today Earning's</p>
          <p className="amount" style={{ textAlign: 'center', fontSize: "12px", marginBottom: "12px", color: 'green', fontWeight: "bold" }}>₹{todayEarning}</p>
        </div>
        |
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ fontSize: "12px", marginBottom: "12px", color: 'blue', display: 'flex', alignItems: 'center' }}><MiscellaneousServicesOutlinedIcon style={{ height: "20px", width: '20px' }} />No of services</p>

          <p className="amount" style={{ textAlign: 'center', fontSize: "12px", marginBottom: "12px", color: 'green', fontWeight: "bold" }}>{data.length}</p>
        </div>

      </div>
      <div className="bottom">


        <p className="desc" style={{ color: "green" }}>
          *   Previous transactions processing. Last payments may not be included.
        </p>
        <br />
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Weekly</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">₹{last7Days}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Monthly</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">₹{lastMonth}</div>
            </div>
          </div>
        <div className="item">
          <div className="itemTitle">Yearly</div>
          <div className="itemResult positive">
            <KeyboardArrowUpOutlinedIcon fontSize="small" />
            <div className="resultAmount">₹{lastYear}</div>
          </div>
        </div>
        </div>

      
      </div>
    </div>
  );
};

export default Featured;