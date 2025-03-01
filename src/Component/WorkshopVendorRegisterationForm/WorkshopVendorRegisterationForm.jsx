import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { tokenState, userIdState } from "../Auth/Atoms";
import "../Login/LoginPage.css";
import { Alert } from "@mui/material";
import backendUrl from "../../environment";
import trucks1 from "../../Assets/logintime_truck.webp";
// import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Helmet } from "react-helmet-async";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import { Bold } from "lucide-react";

const WorkshopVendorRegistrationForm = () => {

  const navigate = useNavigate();
  const [alertInfo, setAlertInfo] = useState({ show: false, message: "", severity: "info", });

  const [fontSize, setFontSize] = useState("35px");

  const [formData, setFormData] = useState({
    vendorDetails: {
      workshopName: "",
      businessName: "",
      businessAddress: "",
      contactPerson: "",
      mobileNo: "",
      email: "",
      GSTNumber: "",
      panNumber: "",
      ownershipType: "",
    },
    workshopDetails: {
      typesOfVehicleServiced: "",
      servicesProvided: "",
      workshopArea: "",
      numberOfSkilledTechnicians: "",
      availabilityOfTowingServices: "",
      availabilityOfInsuranceCashlessTieUps: "",
      insurancePolicyNumber: "",
    },
    kycDetails: {
      GSTCertificate: "",
      pan: "",
      aadhaar: "",
      bankAccount: "",
      businessRegistrationCertificate: "",
      workshopInsurancePolicy: "",
      majorEquipmentAndToolList: "",
      previousWorkExperienceCertificate: "",
      agreementCopyOfInsuranceTieUps: "",
      workshopPhotographs: "",
    },
    paymentDetails: {
      bankName: "",
      branchName: "",
      accountNumber: "",
      IFSCCode: "",
    },
  });




  const formContainerStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    // paddingTop: '20px',
    // paddingBottom: '50px',
    paddingLeft: "30px",
    paddingRight: "30px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    // maxWidth: '600px',
    // width: '50%',
    // margin: '30px',
    // marginLeft: '50px'
  };

  const formGroupStyle = {
    marginBottom: "20px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "15px",
    fontSize: "1em",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "transparent",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#0e4823ff",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  const headerStyle = {
    fontSize,
    color: "#0e4823ff",
    textAlign: "center",
    marginBottom: "20px",
  };

  const headerContainerStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  };

  const backButtonStyle = {
    marginRight: "10px",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split(".");

    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const [submittedForm, setSubmittedForm] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    // if (!validateForm()) {
    //   setAlertInfo({ show: true, message: "Please fill all the details", severity: "error", });
    //   return;
    // }

    setSubmittedForm(true);

    console.log("Form data submitted:", formData);

    // return

    try {
      const response = await axios.post(
        `${backendUrl}/api/vendor/workshop/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", response.data);

      setAlertInfo({
        show: true,
        message: response.data.message,
        severity: "success",
      });


    } catch (error) {
      console.error("Error during form submission:", error);
      const errorMessage = error.response?.data || "An error occurred";
      setAlertInfo({ show: true, message: errorMessage, severity: "error" });
    }

  };

  const handleBack = () => {
    navigate("../");
  };

  return (
    <div>
      <Header />
      <div className="container w-50 mt-4">
        <Helmet>
          <title>WORKSHOP VENDOR REGISTRATION FORM</title>
          <meta name="description" content="Contact form for the query" />
          <meta
            name="keywords"
            content="Vehicle Accidents, accident trucks,customer form,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management"
          />
          <link rel="canonical" href={`https://claimpro.in/ContactUs`} />
        </Helmet>

        <div className="p-5" style={formContainerStyle}>
          <div style={headerContainerStyle}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
              style={backButtonStyle}
            />
            <h1 style={headerStyle}>WORKSHOP VENDOR REGISTRATION FORM</h1>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Vendor Details  */}

            <div>
              <div className="mb-4 " style={{ fontWeight: "bold" }}>
                {" "}
                Vendor Details{" "}
              </div>

              <div style={formGroupStyle}>
                <label htmlFor="vendorDetails.workshopName" style={labelStyle}>
                  Workshop Name
                </label>
                <input
                  style={{
                    ...inputStyle,
                    border: submittedForm && formData.vendorDetails.workshopName.trim() === ""
                      ? "2px solid red"
                      : "1px solid #ccc",
                  }}
                  type="text"
                  name="vendorDetails.workshopName"
                  required
                  onChange={handleChange}
                  value={formData.vendorDetails.workshopName}
                  placeholder="Workshop Name"
                />
              </div>

              <div style={formGroupStyle}>
                <label htmlFor="vendorDetails.businessName" style={labelStyle}>
                  Business Name{" "}
                </label>
                <input
                  style={{
                    ...inputStyle,
                    border: submittedForm && formData.vendorDetails.businessName.trim() === ""
                      ? "2px solid red"
                      : "1px solid #ccc",
                  }}
                  placeholder="Business Name"
                  type="text"
                  name="vendorDetails.businessName"
                  required
                  onChange={handleChange}
                  value={formData.vendorDetails.businessName}
                />
              </div>

              <div style={formGroupStyle}>
                <label htmlFor="vendorDetails.businessAddress" style={labelStyle}>
                  Business Address{" "}
                </label>
                <input
                  style={{
                    ...inputStyle,
                    border: submittedForm && formData.vendorDetails.businessAddress.trim() === ""
                      ? "2px solid red"
                      : "1px solid #ccc",
                  }}
                  placeholder="Business Address"
                  type="text"
                  name="vendorDetails.businessAddress"
                  required
                  onChange={handleChange}
                  value={formData.vendorDetails.businessAddress}
                />
              </div>

              <div style={formGroupStyle}>
                <label htmlFor="vendorDetails.contactPerson" style={labelStyle}>
                  Contact Person{" "}
                </label>
                <input
                  style={{
                    ...inputStyle,
                    border: submittedForm && formData.vendorDetails.contactPerson.trim() === ""
                      ? "2px solid red"
                      : "1px solid #ccc",
                  }}
                  placeholder="Contact Person"
                  type="text"
                  name="vendorDetails.contactPerson"
                  required
                  onChange={handleChange}
                  value={formData.vendorDetails.contactPerson}
                />
              </div>

              <div style={formGroupStyle}>
                <label htmlFor="vendorDetails.mobileNo" style={labelStyle}>
                  Mobile No
                </label>
                <input
                  style={{
                    ...inputStyle,
                    border: submittedForm && formData.vendorDetails.mobileNo.trim() === ""
                      ? "2px solid red"
                      : "1px solid #ccc",
                  }}
                  placeholder="Mobile No"
                  type="text"
                  name="vendorDetails.mobileNo"
                  required
                  onChange={handleChange}
                  value={formData.vendorDetails.mobileNo}
                />
              </div>

              <div style={formGroupStyle}>
                <label htmlFor="vendorDetails.email" style={labelStyle}>
                  Email Address{" "}
                </label>
                <input
                  style={{
                    ...inputStyle,
                    border: submittedForm && formData.vendorDetails.email.trim() === ""
                      ? "2px solid red"
                      : "1px solid #ccc",
                  }}
                  placeholder="Email Address"
                  type="email"
                  name="vendorDetails.email"
                  required
                  onChange={handleChange}
                  value={formData.vendorDetails.email}
                />
              </div>

              <div style={formGroupStyle}>
                <label htmlFor="vendorDetails.GSTNumber" style={labelStyle}>
                  GST Number{" "}
                </label>
                <input
                  style={{
                    ...inputStyle,
                    border: submittedForm && formData.vendorDetails.GSTNumber.trim() === ""
                      ? "2px solid red"
                      : "1px solid #ccc",
                  }}
                  placeholder="GST Number"
                  type="text"
                  name="vendorDetails.GSTNumber"
                  required
                  onChange={handleChange}
                  value={formData.vendorDetails.GSTNumber}
                />
              </div>

              <div style={formGroupStyle}>
                <label htmlFor="vendorDetails.panNumber" style={labelStyle}>
                  PAN Number{" "}
                </label>
                <input
                  style={{
                    ...inputStyle,
                    border: submittedForm && formData.vendorDetails.panNumber.trim() === ""
                      ? "2px solid red"
                      : "1px solid #ccc",
                  }}
                  placeholder="PAN Number"
                  type="text"
                  name="vendorDetails.panNumber"
                  required
                  onChange={handleChange}
                  value={formData.vendorDetails.panNumber}
                />
              </div>

              <div style={formGroupStyle}>
                <label htmlFor="vendorDetails.ownershipType" style={labelStyle}>
                  Type of Ownership{" "}
                </label>
                <select
                  name="vendorDetails.ownershipType"
                  value={formData.vendorDetails.ownershipType}
                  style={{
                    ...inputStyle,
                    border: submittedForm && formData.vendorDetails.ownershipType.trim() === ""
                      ? "2px solid red"
                      : "1px solid #ccc",
                  }}
                  className="form-select"
                  aria-label="Ownership Type"
                  onChange={handleChange}
                >
                  <option value="">Ownership Type</option>
                  <option value="Sole Proprietor">Sole Proprietor</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Company">Company</option>
                </select>
              </div>
            </div>

            {/* Workshop detail section */}
            <div>
              <div className="my-4 " style={{ fontWeight: "bold" }}>
                {" "}
                Workshop Details{" "}
              </div>

              <div style={formGroupStyle}>
                <label htmlFor="workshopDetails.typesOfVehicleServiced" style={labelStyle}>
                  Types of Vehicles Serviced{" "}
                </label>
                <input
                  style={{
                    ...inputStyle,
                    border: submittedForm && formData.workshopDetails.typesOfVehicleServiced.trim() === ""
                      ? "2px solid red"
                      : "1px solid #ccc",
                  }}
                  placeholder="Types of Vehicles Serviced"
                  type="text"
                  name="workshopDetails.typesOfVehicleServiced"
                  required
                  onChange={handleChange}
                  value={formData.workshopDetails.typesOfVehicleServiced}
                />
              </div>

              <div style={formGroupStyle}>
                <label htmlFor="workshopDetails.servicesProvided" style={labelStyle}>
                  Services Provided{" "}
                </label>
                <select
                  name="workshopDetails.servicesProvided"
                  value={formData.workshopDetails.servicesProvided}
                  style={{
                    ...inputStyle,
                    border: submittedForm && formData.workshopDetails.servicesProvided.trim() === ""
                      ? "2px solid red"
                      : "1px solid #ccc",
                  }}
                  className="form-select"
                  aria-label="Services Provided"
                  onChange={handleChange}
                >
                  <option value="">Select Services Provided</option>
                  <option value="Body Repair">Body Repair</option>
                  <option value="Painting">Painting</option>
                  <option value="Mechanical Repairs">Mechanical Repairs</option>
                </select>
              </div>

              <div style={formGroupStyle}>
                <label htmlFor="workshopDetails.workshopArea" style={labelStyle}>
                  Workshop Area (sq. ft.)
                </label>
                <input
                  style={{
                    ...inputStyle,
                    border: submittedForm && formData.workshopDetails.workshopArea.trim() === ""
                      ? "2px solid red"
                      : "1px solid #ccc",
                  }}
                  placeholder="Workshop Area (sq. ft.)"
                  type="text"
                  name="workshopDetails.workshopArea"
                  required
                  onChange={handleChange}
                  value={formData.workshopDetails.workshopArea}
                />
              </div>

              <div style={formGroupStyle}>
                <label htmlFor="workshopDetails.numberOfSkilledTechnicians" style={labelStyle}>
                  Number of Skilled Technicians
                </label>
                <input
                  style={{
                    ...inputStyle,
                    border: submittedForm && formData.workshopDetails.numberOfSkilledTechnicians.trim() === ""
                      ? "2px solid red"
                      : "1px solid #ccc",
                  }}
                  placeholder="Number of Skilled Technicians"
                  type="text"
                  name="workshopDetails.numberOfSkilledTechnicians"
                  required
                  onChange={handleChange}
                  value={formData.workshopDetails.numberOfSkilledTechnicians}
                />
              </div>

              <div style={formGroupStyle}>
                <label
                  htmlFor="workshopDetails.availabilityOfTowingServices"
                  style={labelStyle}
                >
                  Availability of Towing Services{" "}
                </label>
                <select
                  name="workshopDetails.availabilityOfTowingServices"
                  value={formData.workshopDetails.availabilityOfTowingServices}
                  style={{
                    ...inputStyle,
                    border: submittedForm && formData.workshopDetails.availabilityOfTowingServices.trim() === ""
                      ? "2px solid red"
                      : "1px solid #ccc",
                  }}
                  className="form-select"
                  aria-label="Availability of Towing Services"
                  onChange={handleChange}
                >
                  <option value="">Select Towing Services</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div style={formGroupStyle}>
                <label
                  htmlFor="workshopDetails.availabilityOfInsuranceCashlessTieUps"
                  style={labelStyle}
                >
                  Availability of Insurance Cashless Tie-ups{" "}
                </label>
                <select
                  name="workshopDetails.availabilityOfInsuranceCashlessTieUps"
                  value={formData.workshopDetails.availabilityOfInsuranceCashlessTieUps}
                  style={{
                    ...inputStyle,
                    border: submittedForm && formData.workshopDetails.availabilityOfInsuranceCashlessTieUps.trim() === ""
                      ? "2px solid red"
                      : "1px solid #ccc",
                  }}
                  className="form-select"
                  aria-label="Availability of Cashless Tie-ups"
                  onChange={handleChange}
                >
                  <option value="">Select Cashless Tie-ups</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div style={formGroupStyle}>
                <label htmlFor="workshopDetails.insurancePolicyNumber" style={labelStyle}>
                  Insurance Policy Number & Expiry Date
                </label>
                <input
                  style={{
                    ...inputStyle,
                    border: submittedForm && formData.workshopDetails.insurancePolicyNumber.trim() === ""
                      ? "2px solid red"
                      : "1px solid #ccc",
                  }}
                  placeholder="Insurance Policy Number & Expiry Date"
                  type="text"
                  name="workshopDetails.insurancePolicyNumber"
                  required
                  onChange={handleChange}
                  value={formData.workshopDetails.insurancePolicyNumber}
                />
              </div>
            </div>

            {/* KYC documents section */}
            <div>
              <div className="my-4 " style={{ fontWeight: "bold" }}>
                {" "}
                KYC Documents Required (Attach Copies){" "}
              </div>

              <div className="row " >
                <div className="col">
                  <label> GST Registration Certificate (if applicable)</label>
                </div>

                <div className="col-2">
                  <div className="custom-file">
                    <input
                      type="file"
                      name="kycDetails.GSTCertificate"
                      value={formData.kycDetails.GSTCertificate}
                      onChange={handleChange}
                      accept=".pdf,image/"
                      className="custom-file-input"
                      style={{
                        color: "transparent"
                      }}
                    />
                    <label
                      name="lbl_GSTCertificate"
                      className="custom-file-label"
                      htmlFor="GSTCertificate"
                    ></label>
                  </div>
                </div>
              </div>

              <div className="row " >
                <div className="col">
                  <label> Pan Card</label>
                </div>

                <div className="col-2">
                  <div className="custom-file">
                    <input
                      type="file"
                      name="kycDetails.pan"
                      value={formData.kycDetails.pan}
                      onChange={handleChange}
                      accept=".pdf,image/"
                      className="custom-file-input"
                      style={{
                        color: "transparent"
                      }}
                    />
                    <label
                      name="lbl_pan"
                      className="custom-file-label"
                      htmlFor="pan"
                    ></label>
                  </div>
                </div>
              </div>

              <div className="row " >
                <div className="col">
                  <label> Aadhaar Card of Proprietor/Authorized Person</label>
                </div>

                <div className="col-2">
                  <div className="custom-file">
                    <input
                      type="file"
                      name="kycDetails.aadhaar"
                      value={formData.kycDetails.aadhaar}
                      onChange={handleChange}
                      accept=".pdf,image/"
                      className="custom-file-input"
                      style={{
                        color: "transparent"
                      }}
                    />
                    <label
                      name="lbl_aadhaar"
                      className="custom-file-label"
                      htmlFor="aadhaar"
                    ></label>
                  </div>
                </div>
              </div>

              <div className="row " >
                <div className="col">
                  <label> Bank Account Details with Canceled Cheque</label>
                </div>

                <div className="col-2">
                  <div className="custom-file">
                    <input
                      type="file"
                      name="kycDetails.bankAccount"
                      value={formData.kycDetails.bankAccount}
                      onChange={handleChange}
                      accept=".pdf,image/"
                      className="custom-file-input"
                      style={{
                        color: "transparent"
                      }}
                    />
                    <label
                      name="lbl_bankAccount"
                      className="custom-file-label"
                      htmlFor="bankAccount"
                    ></label>
                  </div>
                </div>
              </div>

              <div className="row " >
                <div className="col">
                  <label>
                    {" "}
                    Business Registration Certificate (if applicable)
                  </label>
                </div>

                <div className="col-2">
                  <div className="custom-file">
                    <input
                      type="file"
                      name="kycDetails.businessRegistrationCertificate"
                      value={formData.kycDetails.businessRegistrationCertificate}
                      onChange={handleChange}
                      accept=".pdf,image/"
                      className="custom-file-input"
                      style={{
                        color: "transparent"
                      }}
                    />
                    <label
                      name="lbl_businessRegistrationCertificate"
                      className="custom-file-label"
                      htmlFor="businessRegistrationCertificate"
                    ></label>
                  </div>
                </div>
              </div>

              <div className="row " >
                <div className="col">
                  <label> Insurance Policy of Workshop</label>
                </div>

                <div className="col-2">
                  <div className="custom-file">
                    <input
                      type="file"
                      name="kycDetails.workshopInsurancePolicy"
                      value={formData.kycDetails.workshopInsurancePolicy}
                      onChange={handleChange}
                      accept=".pdf,image/"
                      className="custom-file-input"
                      style={{
                        color: "transparent"
                      }}
                    />
                    <label
                      name="lbl_workshopInsurancePolicy"
                      className="custom-file-label"
                      htmlFor="workshopInsurancePolicy"
                    ></label>
                  </div>
                </div>
              </div>

              <div className="row " >
                <div className="col">
                  <label> List of Major Equipment & Tools</label>
                </div>

                <div className="col-2">
                  <div className="custom-file">
                    <input
                      type="file"
                      name="kycDetails.majorEquipmentAndToolList"
                      value={formData.kycDetails.majorEquipmentAndToolList}
                      onChange={handleChange}
                      accept=".pdf,image/"
                      className="custom-file-input"
                      style={{
                        color: "transparent"
                      }}
                    />
                    <label
                      name="lbl_majorEquipmentAndToolList"
                      className="custom-file-label"
                      htmlFor="majorEquipmentAndToolList"
                    ></label>
                  </div>
                </div>
              </div>

              <div className="row " >
                <div className="col">
                  <label>
                    {" "}
                    Previous Work Experience Certificates (if applicable)
                  </label>
                </div>

                <div className="col-2">
                  <div className="custom-file">
                    <input
                      type="file"
                      name="kycDetails.previousWorkExperienceCertificate"
                      value={formData.kycDetails.previousWorkExperienceCertificate}
                      onChange={handleChange}
                      accept=".pdf,image/"
                      className="custom-file-input"
                      style={{
                        color: "transparent"
                      }}
                    />
                    <label
                      name="lbl_previousWorkExperienceCertificate"
                      className="custom-file-label"
                      htmlFor="previousWorkExperienceCertificate"
                    ></label>
                  </div>
                </div>
              </div>

              <div className="row " >
                <div className="col">
                  <label> Agreement Copy of Insurance Tie-ups (if any)</label>
                </div>

                <div className="col-2">
                  <div className="custom-file">
                    <input
                      type="file"
                      name="kycDetails.agreementCopyOfInsuranceTieUps"
                      value={formData.kycDetails.agreementCopyOfInsuranceTieUps}
                      onChange={handleChange}
                      accept=".pdf,image/"
                      className="custom-file-input"
                      style={{
                        color: "transparent"
                      }}
                    />
                    <label
                      name="lbl_agreementCopyOfInsuranceTieUps"
                      className="custom-file-label"
                      htmlFor="agreementCopyOfInsuranceTieUps"
                    ></label>
                  </div>
                </div>
              </div>

              <div className="row " >
                <div className="col">
                  <label> Workshop Photographs (Exterior & Interior)</label>
                </div>

                <div className="col-2">
                  <div className="custom-file">
                    <input
                      type="file"
                      name="kycDetails.workshopPhotographs"
                      value={formData.kycDetails.workshopPhotographs}
                      onChange={handleChange}
                      accept=".pdf,image/"
                      className="custom-file-input"
                      style={{
                        color: "transparent"
                      }}
                    />
                    <label
                      name="lbl_workshopPhotographs"
                      className="custom-file-label"
                      htmlFor="workshopPhotographs"
                    ></label>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment details */}
            <div>
              <div className="my-4 " style={{ fontWeight: "bold" }}>
                {" "}
                Payment Details{" "}
              </div>

              <div style={formGroupStyle}>
                <label htmlFor="paymentDetails.bankName" style={labelStyle}>
                  Bank Name
                </label>
                <input
                  style={{
                    ...inputStyle,
                    border: submittedForm && formData.paymentDetails.bankName.trim() === ""
                      ? "2px solid red"
                      : "1px solid #ccc",
                  }}
                  placeholder="Bank Name"
                  type="text"
                  name="paymentDetails.bankName"
                  required
                  onChange={handleChange}
                  value={formData.paymentDetails.bankName}
                />
              </div>

              <div style={formGroupStyle}>
                <label htmlFor="paymentDetails.branchName" style={labelStyle}>
                  Branch Name{" "}
                </label>
                <input
                  style={{
                    ...inputStyle,
                    border: submittedForm && formData.paymentDetails.branchName.trim() === ""
                      ? "2px solid red"
                      : "1px solid #ccc",
                  }}
                  placeholder="Branch Name"
                  type="text"
                  name="paymentDetails.branchName"
                  required
                  onChange={handleChange}
                  value={formData.paymentDetails.branchName}
                />
              </div>

              <div style={formGroupStyle}>
                <label htmlFor="paymentDetails.accountNumber" style={labelStyle}>
                  Account Number
                </label>
                <input
                  style={{
                    ...inputStyle,
                    border: submittedForm && formData.paymentDetails.accountNumber.trim() === ""
                      ? "2px solid red"
                      : "1px solid #ccc",
                  }}
                  placeholder="Account Number"
                  type="text"
                  name="paymentDetails.accountNumber"
                  required
                  onChange={handleChange}
                  value={formData.paymentDetails.accountNumber}
                />
              </div>

              <div style={formGroupStyle}>
                <label htmlFor="paymentDetails.IFSCCode" style={labelStyle}>
                  IFSC Code
                </label>
                <input
                  style={{
                    ...inputStyle,
                    border: submittedForm && formData.paymentDetails.IFSCCode.trim() === ""
                      ? "2px solid red"
                      : "1px solid #ccc",
                  }}
                  placeholder="IFSC Code"
                  type="text"
                  name="paymentDetails.IFSCCode"
                  required
                  onChange={handleChange}
                  value={formData.paymentDetails.IFSCCode}
                />
              </div>
            </div>

            {/* Declaration section */}
            <div>
              <div className="my-4 " style={{ fontWeight: "bold" }}>
                {" "}
                Declaration:{" "}
              </div>

              <div
                style={{
                  letterSpacing: "0.5px",
                  lineHeight: "1.6",
                  marginTop: "10px",
                  marginBottom: "10px",
                  // padding: "10px",
                }}
              >
                I/We hereby declare that the information provided above is true
                and correct to the best of my/our knowledge. I/We agree to
                comply with the terms and conditions set by BVC ClaimPro Assist
                LLP for providing vehicle repair services.
              </div>


              <div className="my-4 " style={{ fontWeight: "bold" }}>
                {" "}
                Authorized Signatory: Workshop Name:{" "}
              </div>

              <div className="row">
                <div className="col-2">Signature:</div>
                <div className="col"> _________________________ </div>
              </div>

              <div className="row my-3">
                <div className="col-2">Date:</div>
                <div className="col"> _________________________ </div>
              </div>
            </div>

            {alertInfo.show && (
              <Alert
                severity={alertInfo.severity}
                onClose={() => setAlertInfo({ ...alertInfo, show: false })}
              >
                {alertInfo.message}
              </Alert>
            )}

            <div className="mt-5" style={buttonContainerStyle}>
              <Button
                style={buttonStyle}
                onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  buttonHoverStyle.backgroundColor)
                }
                onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  buttonStyle.backgroundColor)
                }
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>

          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WorkshopVendorRegistrationForm;
