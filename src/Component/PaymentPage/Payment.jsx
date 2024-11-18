import './Payment.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import backendUrl from '../../environment';
import onlinePaymentImage from "../../Assets/onlinePaymentImage.png"
import { useParams , useLocation, useNavigate} from 'react-router-dom';
import { Helmet } from 'react-helmet-async';


function Payment() {
  const { token } = useParams();
  const location = useLocation();
  const navigate = useNavigate()
  const { state } = useLocation();
  
  const [vehicleNo, setVehicleNo] = useState('')
  const [accidentVehicleCode, setAccidentVehicleCode] = useState('')
  const [vendorCode, setVendorCode] = useState('')
  const [customerCode, setCustomerCode] = useState('')
  const [vendorType, setVendorType] = useState('')


  useEffect (()=>{
    if(state?.vehicleNo && state?.accidentVehicleCode && state?.vendorCode && state?.customerCode && state?.vendorType){
      setVehicleNo(state.vehicleNo)
      setAccidentVehicleCode(state.accidentVehicleCode)
      setVendorCode(state.vendorCode)
      setCustomerCode(state.customerCode)
      setVendorType(state.vendorType)
    }
  },[state])
  
  const [isTokenValid, setIsTokenValid] = useState(null);
  console.log("isxepirationsto", isTokenValid)
  const [book, setbook] = useState({
    name: "Processing Fees Regarding the Agreement",
    img: { onlinePaymentImage },
    price: 1000,
  });

  useEffect(() => {
    console.log("req");
    console.log(token);
    checkTokenExpired(token)
  }, [token]);

  const checkTokenExpired = async (token) => {
    try {
      const response = await axios.post(`${backendUrl}/api/checkTokenExpired/${token}`);
      setIsTokenValid(response.data.status)
    } catch (error) {
      console.log(error)
    }
  }

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_UH0rkDW0Rkm44R",
      amount: data.amount,
      currency: data.currency,
      name: `Payment For ${vehicleNo} Vehicle ${vendorType} Services`,
      description: "Test Transaction",
      img: book.img,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = `${backendUrl}/api/verify/${token}/${accidentVehicleCode}/${customerCode}/${vendorType}`;
          const { data } = await axios.post(verifyUrl, response);
          console.log("verifyData", data);
          navigate('/Crane-dashboard')
        } catch (error) {
          console.log("error", error)
        }
      },
      theme: {
        color: "#3399cc"
      },
    }
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

  const handlePayment = async () => {
    try {
      const orderUrl = `${backendUrl}/api/orders/${token}/${accidentVehicleCode}/${vendorCode}/${vendorType}`;
      const { data } = await axios.post(orderUrl);
      console.log("orderData", data);
      // is token valid  checkTokenExpired(data.token) it will check token time is done or not
      initPayment(data.data);
    } catch (error) {
      console.log(error)
    }
  }
  if(isTokenValid){
    handlePayment()
  }
  
  
  return (
    <div>
      <Helmet>
        <title>Payment For Agreement - Claimpro</title>
        <meta name="description" content="Payment Information For Agreement For BVC Claimpro Assist" />
        <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
        <link rel='canonical' href={`https://claimpro.in/Payment`} />
      </Helmet>

      {isTokenValid === null && (
        <div>
          <form className="Customer-master-form">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8f9fa', padding: '10px', marginBottom: "20px" }}>
              <h3 className="bigtitle">Waiting For Confirmation ...</h3>
            </div>
          </form>
        </div>
      )}
      {isTokenValid === false && (
        <div>
          <form className="Customer-master-form">
            <div style={{ backgroundColor: '#f8f9fa', padding: '10px', marginBottom: "20px" }}>
              <h3 className="bigtitle">Unauthorized Access</h3>
              <h3 className="bigtitle">The token provided is invalid or has expired.</h3>
            </div>
          </form>
        </div>
      )}
      {/* {isTokenValid === true && (
        <div className="payment">
          <div className='book_container'>
            <img src={onlinePaymentImage} alt="book_img" className='book_img' />
            <div className="book_details">
              <h2 className='book_name'>{book.name}</h2>
              <p className='book_description'>{book.description}</p>
              <p className='book_price'>Price: {book.price}</p>
              <button className='buy_btn'>Buy Now</button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default Payment;