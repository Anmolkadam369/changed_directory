import React, { useRef, useState } from "react";
import { Alert } from '@mui/material';
import axios from "axios";
import backendUrl from "../../environment";
import shoppingbag from '../../Assets/shopping-bag.png'
import addProduct from '../../Assets/add-product.png'
import scrapaddbyseller from '../../Assets/shoppinggirl.jpg'
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import ViewProduct from "./ViewProduct";
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProductRegister = ({ onUpdate }) => {
    const today = new Date().toISOString().split('T')[0];
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const [viewProducts, setViewProducts] = useState(false)
    const [addProducts, setAddProducts] = useState(true)

    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const scrapImage1Ref = useRef(null);
    const scrapImage2Ref = useRef(null);
    const scrapImage3Ref = useRef(null);
    const scrapImage4Ref = useRef(null);

    const [formData, setFormData] = useState({
        systemDate: today,
        scrapCode: "SYSTEM GENERATED",
        titleName: '',
        availableQty: "",
        prices: "",
        material: "",
        description: "",
        scrapImage1: "",
        scrapImage2: "",
        scrapImage3: "",
        scrapImage4: ""
    })

    const handleChange = (e) => {
        const { name, type, files, value } = e.target;
        if (type === 'file') {
            if (files[0] && files[0].size > 2097152) {
                setAlertInfo({ show: true, message: "File size should be less than 2 MB!", severity: 'error' });
                const refs = {
                    scrapImage1: scrapImage1Ref,
                    scrapImage2: scrapImage2Ref,
                    scrapImage3: scrapImage3Ref,
                    scrapImage4: scrapImage4Ref
                };

                if (refs[name] && refs[name].current) {
                    refs[name].current.value = "";
                }

                setFormData(prevState => ({
                    ...prevState,
                    [name]: null // Reset the file state
                }));
                return;
            }
            setFormData(prevState => ({
                ...prevState,
                [name]: files[0]
            }));
        }
        else if (["prices", "availableQty"].includes(name)) {
            const validValue = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').slice(0, 9);
            setFormData({
                ...formData,
                [name]: validValue,
            });
        }
        else {
            const capitalizedValue = value
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');

            setFormData(prevState => ({
                ...prevState,
                [name]: capitalizedValue
            }));
        }
    };

    const validateForm = () => {
        for (const [key, value] of Object.entries(formData)) {
            if ((key !== "scrapImage2" && key !== "scrapImage3" && key !== "scrapImage4") && value === '') {
                return `Field '${key}' is required.`;
            }
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let sendData = {};
        console.log("formdata", formData)
        const validationMessage = validateForm();
        if (validationMessage) {
            setAlertInfo({ show: true, message: validationMessage, severity: 'error' });
            setIsLoading(false);
            return;
        }
        const formDataObj = new FormData();
        for (const key in formData) {
            if (formData[key]) {
                if (formData[key] instanceof File) {
                    formDataObj.append(key, formData[key], formData[key].name);
                } else {
                    formDataObj.append(key, formData[key]);
                }
            }
        }
        for (const key in sendData) {
            if (sendData[key]) formDataObj.append(key, sendData[key]);
        }

        for (let pair of formDataObj.entries()) {
            console.log(pair[0] + ":" + pair[1])
        }


        try {
            const response = await axios({
                method: 'POST',
                url: `${backendUrl}/api/scrapProductAdd/${userId}`,
                data: formDataObj,
                headers: {
                    'Authorization': token
                }
            });
            setIsLoading(false);
            setAlertInfo({ show: true, message: response.data.message, severity: 'success' });

            setFormData({});
            sendData = {};
            setTimeout(() => {
                onUpdate();
              }, 2000);


        } catch (error) {
            setIsLoading(false);
            const errorMessage = error.response?.data?.message || 'An error occurred';
            if (errorMessage === "jwt expired") {
                setAlertInfo({ show: true, message: "Your session has expired. Redirecting to login...", severity: 'error' });
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            } else {
                setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
            }
        }

        // Handle form submission logic here
    };

    const resetValue = () => {
        setViewProducts(false)
        setAddProducts(false)
    }

    const handleBack = () => {
        onUpdate();
    }

    return (
        <>
            {/* <Header /> */}
            {addProducts && (

                <section style={{ background: "white" }}>
                    <div style={{ display: "flex", marginRight: '10px', marginBottom: '10px' }}>
                        <Button startIcon={<ArrowBackIcon />} style={{ background: "none", color: "#077ede" }} onClick={handleBack} />
                    </div>
                    <div className="position-relative">
                        <button
                            className="btn btn-warning position-absolute"
                            style={{ top: '10px', right: '20px', justifyContent: 'flex-end' }}
                            onClick={() => {
                                resetValue();
                                setViewProducts(true);
                            }}
                        >
                            View Products
                        </button>
                    </div>
                    <div className="container-fluid width-increase" style={{ marginRight: "10px" }}>
                        <div className="row">
                            <div className="col-lg-10 col-md-8 ml-auto">
                                <div className="row align-items-center pt-md-5 mt-md-5 mb-5">
                                    <div className="d-flex w-100">

                                        {/* Left Side - Card with Form */}
                                        <div className="promo-banner col-12 text-center">

                                            <img
                                                src={scrapaddbyseller}// Replace with your random image
                                                alt="Random Scrap"
                                                style={{ width: '300px', height: 'auto', marginTop: "100px" }}
                                            />
                                        </div>


                                        <div className="col-12" style={{ background: "white" }}>
                                            <div className="card" style={{ background: "#d6d1e5" ,marginTop:"20px", minWidth:"250px"}}>
                                                <div className="card-title text-center mt-3">
                                                    <h3 className="bigtitle" style={{ textDecoration: "underline" }}>
                                                        Add Scrap Product <img style={{ width: '50px' }} src={addProduct} alt="product" />
                                                    </h3>
                                                </div>

                                                <div className="card-body">
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="form-row mb-3">
                                                            <div className="col">
                                                                <label htmlFor="titleName">Title Name:</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="titleName"
                                                                    name='titleName'
                                                                    value={formData.titleName}
                                                                    onChange={handleChange}
                                                                    placeholder="Enter Title Of Product"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="form-row mb-3">
                                                            <div className="col">
                                                                <label htmlFor="availableQty">Available Quantity in KG:</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="availableQty"
                                                                    name='availableQty'
                                                                    value={formData.availableQty}
                                                                    onChange={handleChange}
                                                                    placeholder="Enter Available Quantity"
                                                                />
                                                            </div>
                                                            <div className="col">
                                                                <label htmlFor="prices">Prices (Per KG):</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="prices"
                                                                    name='prices'
                                                                    value={formData.prices}
                                                                    onChange={handleChange}
                                                                    placeholder="Enter Price per KG"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="form-row mb-3">
                                                            <div className="col">
                                                                <label htmlFor="material">Material:</label>
                                                                <textarea
                                                                    className="form-control"
                                                                    id="material"
                                                                    name='material'
                                                                    value={formData.material}
                                                                    onChange={handleChange}
                                                                    placeholder="Enter Material"
                                                                />
                                                            </div>
                                                            <div className="col">
                                                                <label htmlFor="description">Description:</label>
                                                                <textarea
                                                                    className="form-control"
                                                                    id="description"
                                                                    name='description'
                                                                    value={formData.description}
                                                                    onChange={handleChange}
                                                                    placeholder="Enter Description"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="form-row mb-3">
                                                            <div className="col">
                                                                <label htmlFor="scrapImage1">Image Of Scrap:</label>
                                                                <input
                                                                    type="file"
                                                                    className="form-control"
                                                                    id="scrapImage1"
                                                                    name="scrapImage1"
                                                                    accept="image/*"
                                                                    ref={scrapImage1Ref}
                                                                    onChange={handleChange}
                                                                    capture="environment"
                                                                />
                                                            </div>
                                                            <div className="col">
                                                                <label htmlFor="scrapImage2">&nbsp;</label>
                                                                <input
                                                                    type="file"
                                                                    className="form-control mt-2"
                                                                    id="scrapImage2"
                                                                    name="scrapImage2"
                                                                    accept="image/*"
                                                                    ref={scrapImage2Ref}
                                                                    onChange={handleChange}
                                                                    capture="environment"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="form-row mb-3">
                                                            <div className="col">
                                                                <input
                                                                    type="file"
                                                                    className="form-control"
                                                                    id="scrapImage3"
                                                                    name="scrapImage3"
                                                                    ref={scrapImage3Ref}
                                                                    onChange={handleChange}
                                                                    accept="image/*"
                                                                    capture="environment"
                                                                />
                                                            </div>
                                                            <div className="col">
                                                                <input
                                                                    type="file"
                                                                    className="form-control"
                                                                    id="scrapImage4"
                                                                    name="scrapImage4"
                                                                    ref={scrapImage4Ref}
                                                                    onChange={handleChange}
                                                                    accept="image/*"
                                                                    capture="environment"
                                                                />
                                                            </div>
                                                        </div>

                                                        {alertInfo.show && (
                                                            <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                                                                {typeof alertInfo.message === 'string' ? alertInfo.message : JSON.stringify(alertInfo.message)}
                                                            </Alert>
                                                        )}

                                                        <button
                                                            className="btn btn-dark mt-5 mx-auto d-block"
                                                            type="submit"
                                                        >
                                                            Add Product
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Side - Image outside of the card */}


                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>)}

            {viewProducts && (
                <ViewProduct />
            )}
            {/* <Footer /> */}
        </>
    );
};

export default ProductRegister;
