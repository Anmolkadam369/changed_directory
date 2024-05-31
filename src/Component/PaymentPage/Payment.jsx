import './Payment.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import backendUrl from '../../environment';
import onlinePaymentImage from "../../Assets/onlinePaymentImage.png"
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';


function Payment() {
  const { token } = useParams();
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
      name: book.name,
      description: "Test Transaction",
      img: book.img,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = `${backendUrl}/api/verify`;
          const { data } = await axios.post(verifyUrl, response);
          console.log("verifyData", data);
        } catch (error) {
          console.log(error)
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
      const orderUrl = `${backendUrl}/api/orders`;
      const { data } = await axios.post(orderUrl, {
        amount: book.price
      });
      console.log("orderData", data);
      initPayment(data.data);
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
      <Helmet>
        <title>Payment For Agreement - Claimpro</title>
        <meta name="description" content="Payment Information For Agreement For BVC Claimpro Assist" />
        <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
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
      {isTokenValid === true && (
        <div className="payment">
          <div className='book_container'>
            <img src={onlinePaymentImage} alt="book_img" className='book_img' />
            <div className="book_details">
              <h2 className='book_name'>{book.name}</h2>
              <p className='book_description'>{book.description}</p>
              <p className='book_price'>Price: {book.price}</p>
              <button onClick={handlePayment} className='buy_btn'>Buy Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;