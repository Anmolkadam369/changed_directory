// import React, { useState, useEffect } from 'react';
// import './VendorMasterForm.css'
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { FaHome, FaCoffee, FaUser, FaEnvelope } from 'react-icons/fa';
// import {useNavigate, useLocation} from 'react-router-dom';
// import { useRecoilValue } from 'recoil';
// import { tokenState, userIdState } from '../Auth/Atoms';

// // import { faCoffee, faHome, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
// const VendorMasterViewOnly = () => {
//   const location = useLocation();
//   const { id } = location.state || {};
//   console.log("Received IDssss:", id);
//   const navigate = useNavigate();
//   const today = new Date().toISOString().split('T')[0];
//   const token = useRecoilValue(tokenState);
//   const userId = useRecoilValue(userIdState);
//   const [comingData, setComingData]=useState([]); 

//   useEffect(() => {
//     console.log("token", token, userId);
//     if (token === "" || userId === "") {
//       navigate("/");
//     }
//     getDataById(id);
//   }, [token, userId, navigate, id]); // Removed comingData from dependencies
  
//   useEffect(() => {
//     if (comingData) {
//       setFormData(prevFormData => ({
//         ...prevFormData,
//         vendorCode:comingData.vendorCode || "",
//         vendorName:comingData.vendorName || "",
//         vendorType:comingData.vendorType || "",
//         address:comingData.address || "",
//         vendorCity: comingData.vendorCity || "",
//         pincode: comingData.pincode || "",
//         vendorPhone: comingData.vendorPhone || "",
//         email: comingData.email || "",
//         contactPerson : comingData.contactPerson || "",
//         contactPersonNum : comingData.contactPersonNum || "",
//         contactPersonNum2 : comingData.contactPersonNum2 || "",
//         cusLocation : comingData.cusLocation || "",
//         panNo : comingData.panNo || "",
//         // panCard : comingData.panCard || "",
//         adharNo : comingData.adharNo || "",
//         // adharCard : comingData.adharCard || "",
//         // agreement : comingData.agreement || "",
//         rate : comingData.rate || "",
//       }));
//     }
//   }, [comingData]); // Separate useEffect for handling comingData updates
  

//   const [formData, setFormData] = useState({
//     systemDate: today,
//     vendorCode: 'SYSTEM GENERATED',
//     vendorName: '',
//     vendorType: "",
//     address: '',
//     vendorCity:"",
//     pincode: '',
//     vendorPhone: '',
//     email: '',
//     contactPerson: '',
//     contactPersonNum: "",
//     contactPersonNum2: '',
//     cusLocation:'',
//     panNo:"",
//     panCard:"",
//     adharNo:'',
//     adharCard:"",
//     agreement:"",
//     rate:""
//   });

//   const getDataById= async (id)=>{
//     const response = await axios.get(`http://localhost:3001/api/getVendor/${id}`);
//     console.log("daa",response.data.data)
//     console.log("response", response.data.data[0]);   
//     setComingData(response.data.data[0])
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'pincode' || name === 'vendorPhone' || name === "contactPersonNum" || name === "contactPersonNum2") {
//       const re = /^[0-9\b]+$/;
//       if (value === '' || re.test(value)) {
//         if ((name === 'pincode' && value.length <= 6) || (name === 'vendorPhone' && value.length <= 10) || (name === 'contactPersonNum' && value.length <= 10) || (name === 'contactPersonNum2' && value.length <= 10)) {
//           setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//           }));
//         }
//       }
//     }

//     else {
//       setFormData(prevState => ({
//         ...prevState,
//         [name]: value
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Form data submitted:', formData);
//     const response = await axios.put(`http://localhost:3001/api/venderUpdate/${id}/${userId}`,  formData);
//     console.log("response", response.data);
//   };
//   return (
//     <div style={{ display: 'flex' }}>
      
//     <form onSubmit={handleSubmit} className="vendor-master-form">
//     <div style={{  flex: 1, backgroundColor: 'lightGreen',  textAlign: 'center', padding: '20px', margin: '20px auto', width: '100%'}}> 
//     <h3 >Vendor Master Edit</h3> 
//       </div>
//       <div className='form-row'>
//       <label className="form-field" style={{width:'20px'}}>
//           System Date:
//           <input
//             type="date"
//             name="systemDate"
//             value={formData.systemDate}
//             onChange={handleChange}
//             readOnly
//             style={{ width: '250px'}}
//           />
//         </label>
//       </div>


//       <div className="form-row">
//         <label className="form-field">
//           Customer Location:
//           <input
//             type="text"
//             name="cusLocation"
//             value={formData.cusLocation}
//             onChange={handleChange}
//           />
//         </label>
//         <label className="form-field">
//           Vendor Code: {/* This might not be editable if it's system generated */}
//           <input
//             type="text"
//             name="vendorCode"
//             value={formData.vendorCode}
//             readOnly
//           />
//         </label>
//         <label className="form-field">
//           Vendor Name:
//           <input
//             type="text"
//             name="vendorName"
//             value={formData.vendorName}
//             onChange={handleChange}
//             required
//           />
//         </label>
//       </div>

//       <div className='form-row'>
//         <label className="form-field">
//           Vendor Type:
//           <select name="vendorType" value={formData.vendorType} onChange={handleChange} required>
//             <option value="">Select</option>
//             <option value="advocate">Advocate</option>
//             <option value="crane">Crane</option>
//             <option value="crane">Machnic</option>
//             <option value="workshop">Workshop</option>


//           </select>
//         </label>
//         <label className="form-field">
//           Address  :
//           <textarea name="address" value={formData.address} onChange={handleChange} required />
//         </label>
//         <label className="form-field">
//           Vendor City  :
//           <input type='text' name="vendorCity" value={formData.vendorCity} onChange={handleChange} required />
//         </label>
//       </div>

//       <div className='form-row'>
//         <label className="form-field">
//           Pincode:
//           <input
//             type='tel'
//             name="pincode"
//             value={formData.pincode}
//             onChange={handleChange}
//             required
//             pattern="\d{6}"
//             title="Pincode must be 6 digits"
//           />
//         </label>
//         <label className="form-field">
//           Vendor Phone No:
//           <input
//             type='tel'
//             name="vendorPhone"
//             value={formData.vendorPhone}
//             onChange={handleChange}
//             required
//             pattern="\d{10}"
//             title="Phone number must be 10 digits"
//           />
//         </label>
//         <label className="form-field">
//           E-Mail:
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
//             title="Please enter a valid email address."
//           />
//         </label>
//       </div>

//       <div className='form-row'>
//         <label className="form-field">
//         Contact Person:
//           <input
//             type='text'
//             name="contactPerson"
//             value={formData.contactPerson}
//             onChange={handleChange}
//             required />
//         </label>

//         <label className="form-field">
//           Contact Person Number :
//           <input
//             type='text'
//             name="contactPersonNum"
//             value={formData.contactPersonNum}
//             onChange={handleChange}
//             required />
//         </label>
//         <label className="form-field">
//           Contact Person Number 2 :
//           <input
//             type='text'
//             name="contactPersonNum2"
//             value={formData.contactPersonNum2}
//             onChange={handleChange}
//             required />
//         </label>
//       </div>

//       <div className='form-row'>
//         <label className="form-field">
//         PAN Number:
//           <input
//             type='text'
//             name="panNo"
//             value={formData.panNo}
//             onChange={handleChange}
//             required />
//         </label>

//         <label className="form-field">
//           PAN Card :
//           <input
//             type='file'
//             name="panCard"
//             value={formData.panCard}
//             onChange={handleChange}
//             accept=".pdf,image/*" 
//             required />
//         </label>
//         <label className="form-field">
//           Adhar Number :
//           <input
//             type='text'
//             name="adharNo"
//             value={formData.adharNo}
//             onChange={handleChange}
//             required />
//         </label>
//       </div>

//       <div className='form-row'>
//         <label className="form-field">
//         Adhar Card:
//           <input
//             type='file'
//             name="adharCard"
//             value={formData.adharCard}
//             onChange={handleChange}
//             accept=".pdf,image/*" 
//             required />
//         </label>

//         <label className="form-field">
//         Agreement :
//           <input
//             type='file'
//             name="agreement"
//             value={formData.agreement}
//             onChange={handleChange}
//             accept=".pdf,image/*" 
//             required />
//         </label>
//         <label className="form-field">
//           Rate/KM :
//           <input
//             type='text'
//             name="rate"
//             value={formData.rate}
//             onChange={handleChange}
//             required />
//         </label>
//       </div>

//       <div className='form-row'>
//         <label className="form-field">
//         GST Number:
//           <input
//             type='text'
//             name="GSTNo"
//             value={formData.GSTNo}
//             onChange={handleChange}
//             required />
//         </label>

//         <label className="form-field">
//         GSTIN :
//           <input
//             type='file'
//             name="GST"
//             value={formData.GST}
//             onChange={handleChange}
//             accept=".pdf,image/*" 
//             required />
//         </label>
//       </div>

//       <div style={{ textAlign: 'center'}}>
//   <button type="submit" style={{                     fontSize: "14px",
                    // padding: "5px 20px",
                    // border: "3px solid lightblue",
                    // borderRadius: "4px",
                    // cursor: "pointer",
                    // backgroundColor: "transparent",
                    // color: "green",}}>
//     Submit
//   </button>
// </div>
//     </form>
//     </div>
//   );
// };

// export default VendorMasterViewOnly;



// import React, { useState , useEffect} from 'react';
// // import './CustomerMaster.css'
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { FaHome, FaCoffee, FaUser, FaEnvelope } from 'react-icons/fa';
// import {useNavigate ,useLocation} from 'react-router-dom';
// import { useRecoilValue } from 'recoil';
// import { tokenState, userIdState } from '../Auth/Atoms';

// const CustomerMasterEdit = () => {
//     const location = useLocation();
//     const { id } = location.state || {};
//     console.log("Received IDssssssssssssssssssssss:", id);
//   const navigate = useNavigate();
//   const token = useRecoilValue(tokenState);
//   const userId = useRecoilValue(userIdState);
//   const [comingData, setComingData]=useState([]); 


//   useEffect(() => {
//       console.log("token", token, userId);
//       if (token === "" || userId === "") {
//         navigate("/");
//       }
//       getDataById(id);
//     }, [token, userId, navigate, id]);

//     useEffect(() => {
//         if (comingData) {
//           setFormData(prevFormData => ({
//             ...prevFormData,
//             // systemDate:comingData.systemDate || "",
//             CustomerCode:comingData.CustomerCode || "",
//             CustomerName:comingData.CustomerName || "",
//             CustomerType:comingData.CustomerType || "",
//             address:comingData.address || "",
//             CustomerCity: comingData.CustomerCity || "",
//             pincode: comingData.pincode || "",
//             CustomerPhone: comingData.CustomerPhone || "",
//             email: comingData.email || "",
//             contactPerson : comingData.contactPerson || "",
//             contactPersonNum : comingData.contactPersonNum || "",
//             contactPersonNum2 : comingData.contactPersonNum2 || "",
//             cusLocation : comingData.cusLocation || "",
//             panNo : comingData.panNo || "",
//             // panCard : comingData.panCard || "",
//             adharNo : comingData.adharNo || "",
//             // adharCard : comingData.adharCard || "",
//             // agreement : comingData.agreement || "",
//             rate : comingData.rate || "",
//             fleetSize:comingData.fleetSize || "",
//             plan : comingData.plan || "",
//             vehicleNo : comingData.vehicleNo || "",
//             chassisNo : comingData.chassisNo || "",
//             engineNo : comingData.engineNo || "",
//             make : comingData.make || "",
//             model : comingData.model || "",
//             year : comingData.year || "",
//             type : comingData.type || "",
//             application : comingData.application || "",
//             GVW : comingData.GVW || "",
//             ULW : comingData.ULW || "",
//             InsuranceName : comingData.InsuranceName || "",
//           }));
//         }
//       }, [comingData]); // Separate useEffect for handling comingData updates
      

//   const today = new Date().toISOString().split('T')[0];
//   const [isRetail, setIsRetail]=useState(false);
//   const [isFleetOwner, setIsFleetOwner]=useState(false);


//   const [formData, setFormData] = useState({
//     systemDate: today,
//     CustomerCode: 'SYSTEM GENERATED',
//     CustomerName: '',
//     CustomerType: '',
//     address: '',
//     CustomerCity: '',
//     pincode: '',
//     CustomerPhone: '',
//     email: '',
//     contactPerson: '',
//     contactPersonNum: "",
//     contactPersonNum2: '',
//     cusLocation:'',
//     panNo:"",
//     panCard:"",
//     adharNo:'',
//     adharCard:"",
//     agreement:"",
//     rate:"",
//     fleetSize:"",
//     plan:'',
//     vehicleNo:"", chassisNo:"", engineNo:"", make:"", model:"",
//      year:"", type:"", application:"", GVW:"", ULW:"",
//       InsuranceName:"" 
//   });


//   const getDataById= async (id)=>{
//     const response = await axios.get(`http://localhost:3001/api/getCustomer/${id}`);
//     console.log("daa",response.data.data)
//     console.log("response", response.data.data[0]);   
//     setComingData(response.data.data[0])
//   }



//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (['pincode', 'CustomerPhone', 'contactPersonNum', 'contactPersonNum2'].includes(name)) {
//       const re = /^[0-9\b]+$/;
//       if (value === '' || re.test(value)) {
//         const maxLength = name === 'pincode' ? 6 : 10;
//         if (value.length <= maxLength) {
//           setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//           }));
//         }
//       }
//     } else {
//       setFormData(prevState => ({
//         ...prevState,
//         [name]: value
//       }));

//       if(name === "CustomerType") {
//         if(value === "retail") {
//           setIsRetail(true);
//           setIsFleetOwner(false);
//         } else if (value === "fleetOwner") {
//           setIsFleetOwner(true);
//           setIsRetail(false);
//         }
//       }
//     }
//   };

//   const handleClick=()=>{
//     navigate("../CustomerApporoved")
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Form data submitted:', formData);
//     const response = await axios.put(`http://localhost:3001/api/customerUpdate/${id}/${userId}` , formData);
//     console.log("response", response.data);

//   };
//   return (
//     <div style={{ display: 'flex' }}>
      
//     <form onSubmit={handleSubmit} className="Customer-master-form">
//     <div style={{  flex: 1, backgroundColor: 'lightGreen',  textAlign: 'center', padding: '20px', margin: '20px auto', width: '100%'}}> 
//     <h3 >Customer Master</h3> 
//       </div>
//       <div className='form-row'>
//       <label className="form-field" style={{width:'20px'}}>
//           System Date:
//           <input
//             type="date"
//             name="systemDate"
//             value={formData.systemDate}
//             onChange={handleChange}
//             readOnly
//             style={{ width: '250px'}}
//           />
//         </label>
//       </div>

//       <div className="form-row">
//         <label className="form-field">
//           Customer Location:
//           <input
//             type="text"
//             name="cusLocation"
//             value={formData.cusLocation}
//             onChange={handleChange}
//           />
//         </label>
//         <label className="form-field">
//           Customer Code: {/* This might not be editable if it's system generated */}
//           <input
//             type="text"
//             name="CustomerCode"
//             value={formData.CustomerCode}
//             readOnly
//           />
//         </label>
//         <label className="form-field">
//           Customer Name:
//           <input
//             type="text"
//             name="CustomerName"
//             value={formData.CustomerName}
//             onChange={handleChange}
//             required
//           />
//         </label>
//       </div>

//       <div className='form-row'>
//       <label className="form-field">
//         Customer Type:
//         <select name="CustomerType" value={formData.CustomerType} onChange={handleChange} required >
//           <option value="">Select</option>
//           <option value="retail">Retail</option>
//           <option value="fleetOwner">Fleet Owner</option>
//         </select>
//       </label>
//         <label className="form-field">
//           Address  :
//           <textarea name="address" value={formData.address} onChange={handleChange} required />
//         </label>
//         <label className="form-field">
//           Customer City  :
//           <input type='text' name="CustomerCity" value={formData.CustomerCity} onChange={handleChange} required />
//         </label>
//       </div>

//       <div className='form-row'>
//         <label className="form-field">
//           Pincode:
//           <input
//             type='tel'
//             name="pincode"
//             value={formData.pincode}
//             onChange={handleChange}
//             required
//             pattern="\d{6}"
//             title="Pincode must be 6 digits"
//           />
//         </label>
//         <label className="form-field">
//           Customer Phone No:
//           <input
//             type='tel'
//             name="CustomerPhone"
//             value={formData.CustomerPhone}
//             onChange={handleChange}
//             required
//             pattern="\d{10}"
//             title="Phone number must be 10 digits"
//           />
//         </label>
//         <label className="form-field">
//           E-Mail:
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
//             title="Please enter a valid email address."
//           />
//         </label>
//       </div>

//       <div className='form-row'>
//         <label className="form-field">
//         Contact Person:
//           <input
//             type='text'
//             name="contactPerson"
//             value={formData.contactPerson}
//             onChange={handleChange}
//             required />
//         </label>

//         <label className="form-field">
//           Contact Person Number :
//           <input
//             type='text'
//             name="contactPersonNum"
//             value={formData.contactPersonNum}
//             onChange={handleChange}
//             required />
//         </label>
//         <label className="form-field">
//           Contact Person Number 2 :
//           <input
//             type='text'
//             name="contactPersonNum2"
//             value={formData.contactPersonNum2}
//             onChange={handleChange}
//             required />
//         </label>
//       </div>

//       <div className='form-row'>
//         <label className="form-field">
//         PAN Number:
//           <input
//             type='text'
//             name="panNo"
//             value={formData.panNo}
//             onChange={handleChange}
//             required />
//         </label>

//         <label className="form-field">
//           PAN Card :
//           <input
//             type='file'
//             name="panCard"
//             value={formData.panCard}
//             onChange={handleChange}
//             accept=".pdf,image/*" 
//             required />
//         </label>
//         <label className="form-field">
//           Adhar Number :
//           <input
//             type='text'
//             name="adharNo"
//             value={formData.adharNo}
//             onChange={handleChange}
//             required />
//         </label>
//       </div>

//       <div className='form-row'>
//         <label className="form-field">
//         Adhar Card:
//           <input
//             type='file'
//             name="adharCard"
//             value={formData.adharCard}
//             onChange={handleChange}
//             accept=".pdf,image/*" 
//             required />
//         </label>

//         <label className="form-field">
//         Agreement :
//           <input
//             type='file'
//             name="agreement"
//             value={formData.agreement}
//             onChange={handleChange}
//             accept=".pdf,image/*" 
//             required />
//         </label>
//         <label className="form-field">
//           Rate/KM :
//           <input
//             type='text'
//             name="rate"
//             value={formData.rate}
//             onChange={handleChange}
//             required />
//         </label>
//       </div>

//       <div className='form-row'>
//         <label className="form-field">
//         GST Number:
//           <input
//             type='text'
//             name="GSTNo"
//             value={formData.GSTNo}
//             onChange={handleChange}
//             required />
//         </label>

//         <label className="form-field">
//         GSTIN :
//           <input
//             type='file'
//             name="GST"
//             value={formData.GST}
//             onChange={handleChange}
//             accept=".pdf,image/*" 
//             required />
//         </label>
//        {isFleetOwner && <div>
//         <label className="form-field">
//         Plan:
//           <input
//             type='text'
//             name="plan"
//             value={formData.plan}
//             onChange={handleChange}
//             required />
//         </label>
//         <label className="form-field">
//         Fleet Size :
//           <input
//             type='file'
//             name="fleetSize"
//             value={formData.fleetSize}
//             onChange={handleChange}
//             required />
//         </label>
//         </div>}
//       </div>


// {isRetail &&
//     <div>
//       <div className='form-row'>
//       <label className="form-field">
//         Vehical Number:
//           <input
//             type='text'
//             name="vehicleNo"
//             value={formData.vehicleNo}
//             onChange={handleChange}
//             required />
//         </label>

//         <label className="form-field">
//         Chassis Number:
//           <input
//             type='text'
//             name="chassisNo"
//             value={formData.chassisNo}
//             onChange={handleChange}
//             required />
//         </label>

//         <label className="form-field">
//         Engine Number:
//           <input
//             type='text'
//             name="engineNo"
//             value={formData.engineNo}
//             onChange={handleChange}
//             required />
//         </label>

//       </div>

//       <div className='form-row'>
//       <label className="form-field">
//         Make:
//           <input
//             type='text'
//             name="make"
//             value={formData.make}
//             onChange={handleChange}
//             required />
//         </label>

//         <label className="form-field">
//         Model:
//           <input
//             type='text'
//             name="model"
//             value={formData.model}
//             onChange={handleChange}
//             required />
//         </label>

//         <label className="form-field">
//         Year:
//           <input
//             type='text'
//             name="year"
//             value={formData.year}
//             onChange={handleChange}
//             required />
//         </label>

//       </div>

//       <div className='form-row'>
//       <label className="form-field">
//         Type:
//           <input
//             type='text'
//             name="type"
//             value={formData.type}
//             onChange={handleChange}
//             required />
//         </label>

//         <label className="form-field">
//         Application:
//           <input
//             type='text'
//             name="application"
//             value={formData.application}
//             onChange={handleChange}
//             required />
//         </label>

//         <label className="form-field">
//         GVW:
//           <input
//             type='text'
//             name="GVW"
//             value={formData.GVW}
//             onChange={handleChange}
//             required />
//         </label>

//       </div>

//       <div className='form-row'>
//       <label className="form-field">
//         ULW:
//           <input
//             type='text'
//             name="ULW"
//             value={formData.ULW}
//             onChange={handleChange}
//             required />
//         </label>

//         <label className="form-field">
//         InsuranceName:
//           <input
//             type='text'
//             name="InsuranceName"
//             value={formData.InsuranceName}
//             onChange={handleChange}
//             required />
//         </label>

//       </div>
//     </div>
// }


//       <div style={{ textAlign: 'center'}}>
//   <button type="submit" style={{                     fontSize: "14px",
                    // padding: "5px 20px",
                    // border: "3px solid lightblue",
                    // borderRadius: "4px",
                    // cursor: "pointer",
                    // backgroundColor: "transparent",
                    // color: "green",}}>
//     Submit
//   </button>
// </div>
//     </form>
//     </div>
//   );
// };

// export default CustomerMasterEdit;









import React, { useState, useEffect } from 'react';
// import styles from './VehicleClaimRegistration.css'; // Ensure this path is correct
import { useNavigate, useLocation } from 'react-router-dom'
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import axios from 'axios';
import { loadStates, loadCities } from '../StateAPI';

const config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries/IN',
    ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
};

const VehicleClaimEdit = () => {

    const location = useLocation();
    const { id } = location.state || {};
    console.log("Received IDssss:", id);
    const [comingData, setComingData]=useState([]); 

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [isLoadingStates, setIsLoadingStates] = useState(true);
    const [isLoadingCities, setIsLoadingCities] = useState(true);

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        loadStates();
        getDataById(id);
        console.log("token", token, userId);
        // if (token === "" || userId === "") {
        //     navigate("/");
        // }
    }, [token, userId, navigate]);

    const formatDateForInput = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toISOString().split('T')[0];
    };
    

    useEffect(() => {
        if (comingData) {
            setAccidentData(prevFormData => ({
                ...prevFormData,
                dateTime: formatDateForInput(comingData.dateTime),
                // systemGenerated: formatDateForInput(comingData.systemGener   ated),
                railwayTime: formatDateForInput(comingData.railwayTime),
                state: comingData.state || "",
                district: comingData.district || "",
                accidentDate: formatDateForInput(comingData.accidentDate),
                reason: comingData.reason || "",
                insuredBy: comingData.insuredBy || "",
                intimatedDate: formatDateForInput(comingData.intimatedDate),
                policyNo: comingData.policyNo || "",
                driverName: comingData.driverName || "",
                DLNo: comingData.DLNo || "",
                DLNoValidity: formatDateForInput(comingData.DLNoValidity),  
                DOB: formatDateForInput(comingData.DOB),
                policeStation: comingData.policeStation || "",
                FIRNo: comingData.FIRNo || "",
                firDate: formatDateForInput(comingData.firDate),
                advocateName: comingData.advocateName || "",
                advocateNo: comingData.advocateNo || "",
                courtName: comingData.courtName || "",
                surveyorName: comingData.surveyorName || "",
                surveyorNo: comingData.surveyorNo || "",
                dateOfSurvey: formatDateForInput(comingData.dateOfSurvey),
                remarksSurveyor: comingData.remarksSurveyor || "",
                materialSurveyorName: comingData.materialSurveyorName || "",
                materialSurveyorNo: comingData.materialSurveyorNo || "",
                dateOfMaterialSurvey: formatDateForInput(comingData.dateOfMaterialSurvey),
                remarksMaterialSurvey: comingData.remarksMaterialSurvey || "",
                finalSurveyorName: comingData.finalSurveyorName || "",
                FinalSurveyorNo: comingData.FinalSurveyorNo || "",
                dateOfFinalSurvey: formatDateForInput(comingData.dateOfFinalSurvey),
                remarksFinalSurvey: comingData.remarksFinalSurvey || "",
                investigatorName: comingData.investigatorName || "",
                investigatorNo: comingData.investigatorNo || "",
                investigationDate: formatDateForInput(comingData.investigationDate),
                investigatorRemarks: comingData.investigatorRemarks || "",
                representativeName: comingData.representativeName || "",
                representativeNo: comingData.representativeNo || "",
                dateRepairedOnSpot: formatDateForInput(comingData.dateRepairedOnSpot),
                transshippedVehicleNo: comingData.transshippedVehicleNo || "",
                transshippedDate: formatDateForInput(comingData.transshippedDate),
                reportedFinalDestination: comingData.reportedFinalDestination || "",
                reportedFinalDestinationDate: formatDateForInput(comingData.reportedFinalDestinationDate),
                deadLineDate: formatDateForInput(comingData.deadLineDate),
                readyDate: formatDateForInput(comingData.readyDate),
                reInspectionDate: formatDateForInput(comingData.reInspectionDate),
                finallyReleasedDate: formatDateForInput(comingData.finallyReleasedDate),
                totalDaysFromAccident: comingData.totalDaysFromAccident || "",
                daysInWorkShop: comingData.daysInWorkShop || "",
                deadlineTAT: comingData.deadlineTAT || "",
                docketName: comingData.docketName || "",
                docketDate: formatDateForInput(comingData.docketDate),
                origin: comingData.origin || "",
                destination: comingData.destination || "",
                consignor: comingData.consignor || "",
                consignee: comingData.consignee || "",
                invoiceNo: comingData.invoiceNo || "",
                invoiceDate: formatDateForInput(comingData.invoiceDate),
                material: comingData.material || "",
                package: comingData.package || "",
                weight: comingData.weight || ""
            }));
        }
    }, [comingData]);
    

    const [accidentData, setAccidentData] = useState({
        dateTime: '',
        systemGenerated: '',
        railwayTime: '',
        state: '',
        district: '',
        accidentDate: '',  //date
        reason: '',
        insuredBy: '',
        intimatedDate: '', //date
        intimationUpload: '',
        policyNo: "",
        driverName: "",
        DLNo: "",
        DLNoValidity: "",
        DOB: "",  //date
        policeStation: "",
        FIRNo: "",
        firDate: "", //date
        firUpload: "",
        advocateName: "",
        advocateNo: "",
        courtName: "",
        releaseUpload: "",
        surveyorName: "",
        surveyorNo: "",
        dateOfSurvey: "",
        remarksSurveyor: "",
        materialSurveyorName: "",
        materialSurveyorNo: "",
        dateOfMaterialSurvey: "",
        remarksMaterialSurvey: "",
        finalSurveyorName: "",
        FinalSurveyorNo: "",
        dateOfFinalSurvey: "",
        remarksFinalSurvey: "",
        investigatorName: "",
        investigatorNo: "",
        investigationDate: "", //date
        investigatorRemarks: "",

        representativeName: "",
        representativeNo: "",
        reportUpload: "",
        dateRepairedOnSpot: "",
        transshippedVehicleNo: "",
        transshippedDate: "",//date
        reportedFinalDestination: "",
        reportedFinalDestinationDate: "",

        deadLineDate: '',//date
        readyDate: "",//date
        reInspectionDate: "",//date
        finallyReleasedDate: "",//date

        totalDaysFromAccident: "",
        daysInWorkShop: "",
        deadlineTAT: "",

        docketName: "",
        docketDate: "",//date
        origin: "",
        destination: "",
        consignor: "",
        consignee: "",
        invoiceNo: "",
        invoiceDate: "",//date
        material: "",
        package: "",
        weight: "",
    });

    const loadStates = () => {
        setIsLoadingStates(true);
        fetch(`${config.cUrl}/states`, {
            headers: { "X-CSCAPI-KEY": config.ckey }
        })
            .then(response => response.json())
            .then(data => {
                setStates(data);
                setIsLoadingStates(false);
            })
            .catch(error => {
                console.error('Error loading states:', error);
                setIsLoadingStates(false);
            });
    };

    const loadCities = (stateCode) => {
        setIsLoadingCities(true);
        fetch(`${config.cUrl}/states/${stateCode}/cities`, {
            headers: { "X-CSCAPI-KEY": config.ckey }
        })
            .then(response => response.json())
            .then(data => {
                setCities(data);
                setIsLoadingCities(false);
            })
            .catch(error => {
                console.error('Error loading cities:', error);
                setIsLoadingCities(false);
            });
    };

    const getDataById= async (id)=>{
        const response = await axios.get(`http://localhost:3001/api/getVehicle/${id}`);
        console.log("daa",response.data.data)
        // console.log("response", response.data.data[0]);   
        setComingData(response.data.data[0])
      }

      console.log('Form data submitted:', token,"some",userId);
    const handleSubmit = async (e) => {
      console.log('Form data submitted inside:', token,"some",userId);
        e.preventDefault();
        const response = await axios.put(`http://localhost:3001/api/updateVehicleClaim/${id}/${userId}`, JSON.stringify(accidentData),{
            headers: {
                'authorization': token,
                'Content-Type': 'application/json'
              }
        });
       console.log("response here")
        console.log("response", response.data.message);
        
    };

    const handleChange = (e) => {

        const { name, value } = e.target;
        if (name === 'advocateNo') {
            const re = /^[0-9\b]+$/;
            console.log("value", value)
            if (value === '' || re.test(value)) {
                if (name === 'advocateNo' && value.length <= 10) {
                    setAccidentData({ ...accidentData, [e.target.name]: e.target.value });;
                }
            }
        }
        // setSelectedState(e.target.value);
        console.log("STATE", value)
        if (name == 'state') loadCities(value);
        setAccidentData({ ...accidentData, [e.target.name]: e.target.value });
    };

    return (
        <div className='container'>
            <div style={{
                textAlign: 'center',
                backgroundColor: '#4CAF50', // Choose your color
                color: 'white', // Choose text color
                padding: '20px 0', // Vertical padding and no horizontal padding
                marginBottom: '30px', // Space below the header
            }}>
                <h1>VEHICLE CLAIM REGISTRATION (UPDATING)</h1>
                <hr style={{
                    border: '0',
                    height: '2px', // Thickness of the hr
                    backgroundColor: '#fff', // Same as the text color for consistency
                    maxWidth: '50%', // Width of the hr
                    margin: '0 auto', // Center the hr
                }} />
            </div>

            <h2 className='heading-box'>Accident Details</h2>
            <form>

                <div className="form-row">
                    <label className="form-field">
                        Date & Time:
                        <input
                            className='inputField'
                            type="text"
                            name="dateTime"
                            value={accidentData.dateTime}
                            onChange={handleChange}

                        />
                    </label>
                    <label className="form-field">
                        System Generated - Vehicle No.:
                        <input
                            className='inputField'
                            type="text"
                            name="systemGenerated"
                            value={accidentData.systemGenerated}
                            onChange={handleChange}

                        />
                    </label>
                    <label className="form-field">
                        Time (Railway):
                        <input
                            className='inputField'
                            type="text"
                            name="railwayTime"
                            value={accidentData.railwayTime}
                            onChange={handleChange}

                        />
                    </label>
                    <label className="form-field">
                        Accident Place - State:
                        <select
                            className='inputField'
                            name="state"
                            onChange={handleChange}
                            disabled={isLoadingStates}
                            value={accidentData.state}>
                            <option value="">Select State</option>
                            {states.map(state => (
                                <option key={state.iso2} value={state.iso2}>{state.name}</option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="form-row">
                    <label className="form-field">
                        Accident Place - City:
                        <select
                            className='inputField'
                            name="district"
                            value={accidentData.district}
                            onChange={handleChange}
                            disabled={isLoadingCities || !accidentData.state}
                        >
                            <option value="">Select City</option>
                            {!cities.error && cities.map(city => (
                                <option key={city.iso2} value={city.iso2}>{city.name}</option>
                            ))}
                        </select>
                    </label>

                    <label className="form-field">
                        Accident Date:
                        <input
                            className='inputField'
                            type="text"
                            name="accidentDate"
                            value={accidentData.accidentDate}
                            onChange={handleChange}

                        />
                    </label>
                    <label className="form-field">
                        Reason of Accident:
                        <textarea
                            className='inputField'
                            name="reason"
                            value={accidentData.reason}
                            onChange={handleChange}

                        />
                    </label>
                </div>
                <hr />
                <h2 className='heading-box'>Insurance Details</h2>

                <div className="form-row">
                    <label className="form-field">
                        Insured By:
                        <input
                            className='inputField'
                            name="insuredBy"
                            value={accidentData.insuredBy}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Intimated Date:
                        <input
                            type='date'
                            className='inputField'
                            name="intimatedDate"
                            value={accidentData.intimatedDate}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Intimation Upload:
                        <input
                            type='file'
                            className='inputField'
                            name="intimationUpload"
                            value={accidentData.intimationUpload}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Policy Number:
                        <input
                            className='inputField'
                            name="policyNo"
                            value={accidentData.policyNo}
                            onChange={handleChange}

                        />
                    </label>
                </div>
                <hr />
                <h2 className='heading-box'>Driver Details</h2>
                <div className="form-row">
                    <label className="form-field">
                        Driver Name:
                        <input
                            className='inputField'
                            name="driverName"
                            value={accidentData.driverName}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        D/L No:
                        <input
                            className='inputField'
                            name="DLNo"
                            value={accidentData.DLNo}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        D/L Number Validity:
                        <input
                            type='date'
                            className='inputField'
                            name="DLNoValidity"
                            value={accidentData.DLNoValidity}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Date Of Birth:
                        <input
                            className='inputField'
                            name="DOB"
                            value={accidentData.DOB}
                            onChange={handleChange}

                        />
                    </label>
                </div>
                <hr />
                <h2 className='heading-box'>Police Reports</h2>
                <div className="form-row">
                    <label className="form-field">
                        Police Station:
                        <input
                            className='inputField'
                            name="policeStation"
                            value={accidentData.policeStation}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        FIR No:
                        <input
                            className='inputField'
                            name="FIRNo"
                            value={accidentData.FIRNo}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        FIR Date:
                        <input
                            type="date"
                            className='inputField'
                            name="firDate"
                            value={accidentData.firDate}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        FIR Upload:
                        <input
                            type='file'
                            className='inputField'
                            name="firUpload"
                            value={accidentData.firUpload}
                            onChange={handleChange}

                        />
                    </label>
                </div>

                <div className="form-row">
                    <label className="form-field">
                        Advocate Name:
                        <input
                            className='inputField'
                            name="advocateName"
                            value={accidentData.advocateName}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Advocate Contact No:
                        <input
                            type='tel'
                            className='inputField'
                            name="advocateNo"
                            value={accidentData.advocateNo}
                            onChange={handleChange}

                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Court Name:
                        <input
                            className='inputField'
                            name="courtName"
                            value={accidentData.courtName}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Release Order Upload:
                        <input
                            type='file'
                            className='inputField'
                            name="releaseUpload"
                            value={accidentData.releaseUpload}
                            onChange={handleChange}

                        />
                    </label>
                </div>
                <hr />
                <h2 className='heading-box'>Surveyor Details</h2>
                <div className="form-row">
                    <label className="form-field">
                        Spot Surveyor Name:
                        <input
                            className='inputField'
                            name="surveyorName"
                            value={accidentData.surveyorName}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Contact No:
                        <input
                            type='tel'
                            className='inputField'
                            name="surveyorNo"
                            value={accidentData.surveyorNo}
                            onChange={handleChange}

                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Date:
                        <input
                            type='date'
                            className='inputField'
                            name="dateOfSurvey"
                            value={accidentData.dateOfSurvey}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Remarks:
                        <textarea
                            className='inputField'
                            name="remarksSurveyor"
                            value={accidentData.remarksSurveyor}
                            onChange={handleChange}

                        />
                    </label>
                </div>

                <div className="form-row">
                    <label className="form-field">
                        Material Surveyor Name:
                        <input
                            className='inputField'
                            name="materialSurveyorName"
                            value={accidentData.materialSurveyorName}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Contact No:
                        <input
                            type='tel'
                            className='inputField'
                            name="materialSurveyorNo"
                            value={accidentData.materialSurveyorNo}
                            onChange={handleChange}

                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Date:
                        <input
                            type='date'
                            className='inputField'
                            name="dateOfMaterialSurvey"
                            value={accidentData.dateOfMaterialSurvey}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Remarks:
                        <textarea
                            className='inputField'
                            name="remarksMaterialSurvey"
                            value={accidentData.remarksMaterialSurvey}
                            onChange={handleChange}

                        />
                    </label>
                </div>

                <div className="form-row">
                    <label className="form-field">
                        Final Surveyor Name:
                        <input
                            className='inputField'
                            name="finalSurveyorName"
                            value={accidentData.finalSurveyorName}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Contact No:
                        <input
                            type='tel'
                            className='inputField'
                            name="FinalSurveyorNo"
                            value={accidentData.FinalSurveyorNo}
                            onChange={handleChange}

                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Date:
                        <input
                            type='date'
                            className='inputField'
                            name="dateOfFinalSurvey"
                            value={accidentData.dateOfFinalSurvey}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Remarks:
                        <textarea
                            className='inputField'
                            name="remarksFinalSurvey"
                            value={accidentData.remarksFinalSurvey}
                            onChange={handleChange}

                        />
                    </label>
                </div>

                <div className="form-row">
                    <label className="form-field">
                        Investigator Name:
                        <input
                            className='inputField'
                            name="investigatorName"
                            value={accidentData.investigatorName}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Investigator Contact No:
                        <input
                            type='tel'
                            className='inputField'
                            name="investigatorNo"
                            value={accidentData.investigatorNo}
                            onChange={handleChange}

                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Date:
                        <input
                            type='date'
                            className='inputField'
                            name="investigationDate"
                            value={accidentData.investigationDate}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Remarks:
                        <textarea
                            className='inputField'
                            name="investigatorRemarks"
                            value={accidentData.investigatorRemarks}
                            onChange={handleChange}

                        />
                    </label>
                </div>
                <hr />
                <h2 className='heading-box'>Action Details</h2>
                <div className="form-row">
                    <label className="form-field">
                        Company Representative Name:
                        <input
                            className='inputField'
                            name="representativeName"
                            value={accidentData.representativeName}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Contact No:
                        <input
                            type='tel'
                            className='inputField'
                            name="representativeNo"
                            value={accidentData.representativeNo}
                            onChange={handleChange}

                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Representative Report Upload:
                        <input
                            type='file'
                            className='inputField'
                            name="reportUpload"
                            value={accidentData.reportUpload}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Vehicle Repaired On Spot Date:
                        <input
                            type='date'
                            className='inputField'
                            name="dateRepairedOnSpot"
                            value={accidentData.dateRepairedOnSpot}
                            onChange={handleChange}

                        />
                    </label>
                </div>

                <div className="form-row">
                    <label className="form-field">
                        Material Transshiped in Vehicle No:
                        <input
                            className='inputField'
                            name="transshippedVehicleNo"
                            value={accidentData.transshippedVehicleNo}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Vehicle Transshiped Date:
                        <input
                            type='date'
                            className='inputField'
                            name="transshippedDate"
                            value={accidentData.transshippedDate}
                            onChange={handleChange}

                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Vehicle Reported on Final Destination:
                        <input
                            className='inputField'
                            name="reportedFinalDestination"
                            value={accidentData.reportedFinalDestination}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Vehicle Reported on Final Destination:
                        <input
                            type='date'
                            className='inputField'
                            name="reportedFinalDestinationDate"
                            value={accidentData.reportedFinalDestinationDate}
                            onChange={handleChange}

                        />
                    </label>
                </div>
                <h2 className='heading-box'>Operational Details</h2>
                <div className="form-row">
                    <label className="form-field">
                        Deadline Date:
                        <input
                            type="date"
                            className='inputField'
                            name="deadLineDate"
                            value={accidentData.deadLineDate}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Actual Ready Date:
                        <input
                            type='date'
                            className='inputField'
                            name="readyDate"
                            value={accidentData.readyDate}
                            onChange={handleChange}

                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Re-Inspection Date:
                        <input
                            type="date"
                            className='inputField'
                            name="reInspectionDate"
                            value={accidentData.reInspectionDate}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Vehicle Finally Released:
                        <input
                            type='date'
                            className='inputField'
                            name="finallyReleasedDate"
                            value={accidentData.finallyReleasedDate}
                            onChange={handleChange}

                        />
                    </label>
                </div>

                <h2 className='heading-box'>Analyses</h2>

                <div className="form-row">
                    <label className="form-field">
                        Total Days From Accident:
                        <input
                            className='inputField'
                            name="totalDaysFromAccident"
                            value={accidentData.totalDaysFromAccident}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Total Days In WorkShop:
                        <input
                            className='inputField'
                            name="daysInWorkShop"
                            value={accidentData.daysInWorkShop}
                            onChange={handleChange}

                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Deadline TAT:
                        <input
                            className='inputField'
                            name="deadlineTAT"
                            value={accidentData.deadlineTAT}
                            onChange={handleChange}

                        />
                    </label>


                </div>

                <h2 className='heading-box'>Docket Information</h2>
                <div className="form-row">
                    <label className="form-field">
                        Docket Name:
                        <input
                            className='inputField'
                            name="docketName"
                            value={accidentData.docketName}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Docket Date:
                        <input
                            className='inputField'
                            name="docketDate"
                            value={accidentData.docketDate}
                            onChange={handleChange}

                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Origin:
                        <input
                            className='inputField'
                            name="origin"
                            value={accidentData.origin}
                            onChange={handleChange}

                        />
                    </label>
                    <label className="form-field">
                        Destination:
                        <input
                            className='inputField'
                            name="destination"
                            value={accidentData.destination}
                            onChange={handleChange}

                        />

                    </label>


                </div>

                <div className="form-row">
                    <label className="form-field">
                        Consignor Name:
                        <input
                            className='inputField'
                            name="consignor"
                            value={accidentData.consignor}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Consignee Name:
                        <input
                            className='inputField'
                            name="consignee"
                            value={accidentData.consignee}
                            onChange={handleChange}

                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Invoice Number:
                        <input
                            className='inputField'
                            name="invoiceNo"
                            value={accidentData.invoiceNo}
                            onChange={handleChange}

                        />
                    </label>
                    <label className="form-field">
                        Invoice Date:
                        <input
                            type='date'
                            className='inputField'
                            name="invoiceDate"
                            value={accidentData.invoiceDate}
                            onChange={handleChange}

                        />

                    </label>


                </div>

                <div className="form-row">
                    <label className="form-field">
                        Material:
                        <input
                            className='inputField'
                            name="material"
                            value={accidentData.material}
                            onChange={handleChange}

                        />
                    </label>

                    <label className="form-field">
                        Package:
                        <input
                            className='inputField'
                            name="package"
                            value={accidentData.package}
                            onChange={handleChange}

                            pattern="\d{10}"
                            title="Phone number must be 10 digits"
                        />
                    </label>

                    <label className="form-field">
                        Weight:
                        <input
                            className='inputField'
                            name="weight"
                            value={accidentData.weight}
                            onChange={handleChange}

                        />
                    </label>
                    <label className="form-field">
                        Invoice Date:
                        <input
                            type='date'
                            className='inputField'
                            name="invoiceDate"
                            value={accidentData.invoiceDate}
                            onChange={handleChange}

                        />

                    </label>


                </div>

                {/* <h2 className='heading-box'>Task Details</h2> */}


                <div className="form-row">
                    <button type="submit" className='button' onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default VehicleClaimEdit;
