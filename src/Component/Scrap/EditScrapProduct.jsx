import React, { useRef, useEffect, useState, useDebugValue } from "react";
import { Alert } from '@mui/material';
import axios from "axios";
import backendUrl from "../../environment";
import shoppingbag from '../../Assets/shopping-bag.png'
import addProduct from '../../Assets/add-product.png'
import scrapaddbyseller from '../../Assets/shoppinggirl.jpg'
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import ViewProduct from "./ViewProduct";
import { IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import DownloadingOutlinedIcon from '@mui/icons-material/DownloadingOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Modal from 'react-modal';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



const generateOfficePreviewLink = (fileUrl) => {
    return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`;
};

const generateGooglePreviewLink = (fileUrl) => {
    return `https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`;
};

const handlePreviewClick = (e, fileUrl) => {
    e.stopPropagation();
    const fileExtension = fileUrl.split('.').pop().toLowerCase();
    let previewLink;
    if (fileExtension === 'pdf') {
        previewLink = generateGooglePreviewLink(fileUrl);
    } else if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(fileExtension)) {
        previewLink = generateOfficePreviewLink(fileUrl);
    } else {
        alert('Preview not available for this file type.');
        return;
    }
    window.open(previewLink, '_blank');
};



const EditScrapProduct = ({ code, onUpdate }) => {
    console.log("codehere", code)
    const today = new Date().toISOString().split('T')[0];
    const [data, setData] = useState({})
    console.log("Dating", data)
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

    const [IsReadOnly, setIsReadOnly] = useState(true)

    const [isscrapImage1ModalOpen, setIsscrapImage1ModalOpen] = useState(false);
    const openscrapImage1Modal = () => {
        setIsscrapImage1ModalOpen(true);
    };
    const closescrapImage1Modal = () => {
        setIsscrapImage1ModalOpen(false);
    };

    const [isscrapImage2ModalOpen, setIsscrapImage2ModalOpen] = useState(false);
    const openscrapImage2Modal = () => {
        setIsscrapImage2ModalOpen(true);
    };
    const closescrapImage2Modal = () => {
        setIsscrapImage2ModalOpen(false);
    };
    const [isscrapImage3ModalOpen, setIsscrapImage3ModalOpen] = useState(false);
    const openscrapImage3Modal = () => {
        setIsscrapImage3ModalOpen(true);
    };
    const closescrapImage3Modal = () => {
        setIsscrapImage3ModalOpen(false);
    };
    const [isscrapImage4ModalOpen, setIsscrapImag4ModalOpen] = useState(false);
    const openscrapImage4Modal = () => {
        setIsscrapImag4ModalOpen(true);
    };
    const closescrapImage4Modal = () => {
        setIsscrapImag4ModalOpen(false);
    };

    useEffect(() => {
        getDataById();
    }, [])


    const getDataById = async () => {
        const response = await axios.get(`${backendUrl}/api/scrapProductByIdUser/${userId}/${code}`);
        const fetchedData = response.data.data;
        console.log("fetchedData", fetchedData)
        setData(fetchedData[0]);
        // setCurrentItems(formattedData);
    };

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

    useEffect(() => {
        if (data) {
            setFormData(prevFormData => ({
                ...prevFormData,
                titleName: data.titleName,
                availableQty: data.availableQty,
                prices: data.prices,
                material: data.material,
                description: data.description,
                scrapImage1: data.scrapImage1,
                scrapImage2: data.scrapImage2,
                scrapImage3: data.scrapImage3,
                scrapImage4: data.scrapImage4
            }));
        }
        console.log("dataingdsf")
    }, [data])

    console.log("DREEFSSDFSDFSDF")
    console.log("data.titleName", data.titleName)
    console.log("formData1234567890", formData)

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
                url: `${backendUrl}/api/scrapProductEdit/${userId}/${data.scrapCode}`,
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

    const handleBack = () => {
        onUpdate();
    }

    return (
        <div>
            <section style={{ background: "white", display: "flex", justifyContent: "center", alignItems: "center",marginBottom:"20px"}}>
                <div className="col-12" style={{ background: "" }}>
                    <div style={{ display: "flex", marginRight: '10px', marginBottom: '10px' }}>
                        <Button startIcon={<ArrowBackIcon />} style={{ background: "none", color: "#077ede" }} onClick={handleBack} />
                    </div>
                    <div className="card mx-auto" style={{ background: "#d6d1e5",minWidth:"300px", alignItems: "center", width: "50%" }}>
                        <div className="card-title text-center mt-3">
                            <h3 className="bigtitle" style={{ textDecoration: "underline" }}>
                                Edit Scrap Product <img style={{ width: '50px' }} src={addProduct} alt="product" />
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
                                            readOnly={IsReadOnly}
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
                                            readOnly={IsReadOnly}
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
                                            readOnly={IsReadOnly}
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
                                            readOnly={IsReadOnly}
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
                                            readOnly={IsReadOnly}
                                            placeholder="Enter Description"
                                        />
                                    </div>
                                </div>

                                <div className="form-row mb-3">
                                    <div className="col">
                                        <label className="form-field">
                                            Scrap Image 1:
                                            {IsReadOnly ? (
                                                formData.scrapImage1 && formData.scrapImage1 !== "not uploaded" ? (
                                                    formData.scrapImage1.endsWith(".jpg") ||
                                                        formData.scrapImage1.endsWith(".jpeg") ||
                                                        formData.scrapImage1.endsWith(".webp") ||
                                                        formData.scrapImage1.endsWith(".jfif") ||
                                                        formData.scrapImage1.endsWith(".png") ||
                                                        formData.scrapImage1.endsWith(".gif") ||
                                                        formData.scrapImage1.endsWith(".bmp") ||
                                                        formData.scrapImage1.endsWith(".tiff") ||
                                                        formData.scrapImage1.endsWith(".svg") ? (
                                                        <>
                                                            <img
                                                                src={formData.scrapImage1}
                                                                alt="PAN Card"
                                                                style={{
                                                                    maxWidth: '100px',
                                                                    display: 'block',
                                                                    cursor: 'pointer',
                                                                    border: 'solid black 2px',
                                                                    padding: '3px',
                                                                    marginTop: '6px'
                                                                }}
                                                                onClick={openscrapImage1Modal}
                                                            />
                                                            <Modal isOpen={isscrapImage1ModalOpen} onRequestClose={closescrapImage1Modal} contentLabel="PAN Card Modal">
                                                                <div className="modal-header">
                                                                    <IconButton href={formData.scrapImage1} download color="primary">
                                                                        <DownloadIcon />
                                                                    </IconButton>
                                                                    <IconButton onClick={closescrapImage1Modal} color="secondary">
                                                                        <CloseIcon />
                                                                    </IconButton>
                                                                </div>
                                                                <div className="modal-image-container">
                                                                    <img src={formData.scrapImage1} alt="PAN Card" style={{ width: '100%' }} />
                                                                </div>
                                                            </Modal>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p>
                                                                <a
                                                                    href={formData.scrapImage1}
                                                                    className="docx-link"
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        color: 'green'
                                                                    }}
                                                                    download
                                                                >
                                                                    <DownloadingOutlinedIcon /> Download
                                                                </a>
                                                                <button
                                                                    type="button"
                                                                    onClick={(e) => handlePreviewClick(e, formData.scrapImage1)}
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        border: 'none',
                                                                        background: 'white',
                                                                        color: '#560303',
                                                                        fontSize: '13px',
                                                                        boxShadow: 'none'
                                                                    }}
                                                                >
                                                                    <RemoveRedEyeOutlinedIcon /> Preview
                                                                </button>
                                                            </p>
                                                        </>
                                                    )
                                                ) : (
                                                    <p className='notUploaded'>Not Uploaded</p>
                                                )
                                            ) : (
                                                <input
                                                    type="file"
                                                    name="scrapImage1"
                                                    onChange={handleChange}
                                                    readOnly={IsReadOnly}
                                                    accept="image/*"
                                                    ref={scrapImage1Ref}
                                                    required
                                                    className="form-control"
                                                />
                                            )}
                                        </label>
                                    </div>
                                    <div className="col">
                                        <label className="form-field">
                                            Scrap Image 2:
                                            {IsReadOnly ? (
                                                formData.scrapImage2 && formData.scrapImage2 !== "not uploaded" ? (
                                                    formData.scrapImage2.endsWith(".jpg") ||
                                                        formData.scrapImage2.endsWith(".jpeg") ||
                                                        formData.scrapImage2.endsWith(".webp") ||
                                                        formData.scrapImage2.endsWith(".jfif") ||
                                                        formData.scrapImage2.endsWith(".png") ||
                                                        formData.scrapImage2.endsWith(".gif") ||
                                                        formData.scrapImage2.endsWith(".bmp") ||
                                                        formData.scrapImage2.endsWith(".tiff") ||
                                                        formData.scrapImage2.endsWith(".svg") ? (
                                                        <>
                                                            <img
                                                                src={formData.scrapImage2}
                                                                alt="PAN Card"
                                                                style={{
                                                                    maxWidth: '100px',
                                                                    display: 'block',
                                                                    cursor: 'pointer',
                                                                    border: 'solid black 2px',
                                                                    padding: '3px',
                                                                    marginTop: '6px'
                                                                }}
                                                                onClick={openscrapImage2Modal}
                                                            />
                                                            <Modal isOpen={isscrapImage2ModalOpen} onRequestClose={closescrapImage2Modal} contentLabel="PAN Card Modal">
                                                                <div className="modal-header">
                                                                    <IconButton href={formData.scrapImage2} download color="primary">
                                                                        <DownloadIcon />
                                                                    </IconButton>
                                                                    <IconButton onClick={closescrapImage2Modal} color="secondary">
                                                                        <CloseIcon />
                                                                    </IconButton>
                                                                </div>
                                                                <div className="modal-image-container">
                                                                    <img src={formData.scrapImage2} alt="PAN Card" style={{ width: '100%' }} />
                                                                </div>
                                                            </Modal>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p>
                                                                <a
                                                                    href={formData.scrapImage2}
                                                                    className="docx-link"
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        color: 'green'
                                                                    }}
                                                                    download
                                                                >
                                                                    <DownloadingOutlinedIcon /> Download
                                                                </a>
                                                                <button
                                                                    type="button"
                                                                    onClick={(e) => handlePreviewClick(e, formData.scrapImage2)}
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        border: 'none',
                                                                        background: 'white',
                                                                        color: '#560303',
                                                                        fontSize: '13px',
                                                                        boxShadow: 'none'
                                                                    }}
                                                                >
                                                                    <RemoveRedEyeOutlinedIcon /> Preview
                                                                </button>
                                                            </p>
                                                        </>
                                                    )
                                                ) : (
                                                    <p className='notUploaded'>Not Uploaded</p>
                                                )
                                            ) : (
                                                <input
                                                    type="file"
                                                    name="scrapImage2"
                                                    onChange={handleChange}
                                                    readOnly={IsReadOnly}
                                                    accept="image/*"
                                                    ref={scrapImage2Ref}
                                                    required
                                                    className="form-control"
                                                />
                                            )}
                                        </label>
                                    </div>
                                </div>

                                <div className="form-row mb-3">
                                    <div className="col">
                                        <label className="form-field">
                                            Scrap Image 3:
                                            {IsReadOnly ? (
                                                formData.scrapImage3 && formData.scrapImage3 !== "not uploaded" ? (
                                                    formData.scrapImage3.endsWith(".jpg") ||
                                                        formData.scrapImage3.endsWith(".jpeg") ||
                                                        formData.scrapImage3.endsWith(".webp") ||
                                                        formData.scrapImage3.endsWith(".jfif") ||
                                                        formData.scrapImage3.endsWith(".png") ||
                                                        formData.scrapImage3.endsWith(".gif") ||
                                                        formData.scrapImage3.endsWith(".bmp") ||
                                                        formData.scrapImage3.endsWith(".tiff") ||
                                                        formData.scrapImage3.endsWith(".svg") ? (
                                                        <>
                                                            <img
                                                                src={formData.scrapImage3}
                                                                alt="PAN Card"
                                                                style={{
                                                                    maxWidth: '100px',
                                                                    display: 'block',
                                                                    cursor: 'pointer',
                                                                    border: 'solid black 2px',
                                                                    padding: '3px',
                                                                    marginTop: '6px'
                                                                }}
                                                                onClick={openscrapImage3Modal}
                                                            />
                                                            <Modal isOpen={isscrapImage3ModalOpen} onRequestClose={closescrapImage3Modal} contentLabel="PAN Card Modal">
                                                                <div className="modal-header">
                                                                    <IconButton href={formData.scrapImage3} download color="primary">
                                                                        <DownloadIcon />
                                                                    </IconButton>
                                                                    <IconButton onClick={closescrapImage3Modal} color="secondary">
                                                                        <CloseIcon />
                                                                    </IconButton>
                                                                </div>
                                                                <div className="modal-image-container">
                                                                    <img src={formData.scrapImage3} alt="PAN Card" style={{ width: '100%' }} />
                                                                </div>
                                                            </Modal>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p>
                                                                <a
                                                                    href={formData.scrapImage3}
                                                                    className="docx-link"
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        color: 'green'
                                                                    }}
                                                                    download
                                                                >
                                                                    <DownloadingOutlinedIcon /> Download
                                                                </a>
                                                                <button
                                                                    type="button"
                                                                    onClick={(e) => handlePreviewClick(e, formData.scrapImage3)}
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        border: 'none',
                                                                        background: 'white',
                                                                        color: '#560303',
                                                                        fontSize: '13px',
                                                                        boxShadow: 'none'
                                                                    }}
                                                                >
                                                                    <RemoveRedEyeOutlinedIcon /> Preview
                                                                </button>
                                                            </p>
                                                        </>
                                                    )
                                                ) : (
                                                    <p className='notUploaded'>Not Uploaded</p>
                                                )
                                            ) : (
                                                <input
                                                    type="file"
                                                    name="scrapImage3"
                                                    onChange={handleChange}
                                                    readOnly={IsReadOnly}
                                                    accept="image/*"
                                                    ref={scrapImage3Ref}
                                                    required
                                                    className="form-control"
                                                />
                                            )}
                                        </label>
                                    </div>
                                    <div className="col">
                                        <label className="form-field">
                                            Scrap Image 4:
                                            {IsReadOnly ? (
                                                formData.scrapImage4 && formData.scrapImage4 !== "not uploaded" ? (
                                                    formData.scrapImage4.endsWith(".jpg") ||
                                                        formData.scrapImage4.endsWith(".jpeg") ||
                                                        formData.scrapImage4.endsWith(".webp") ||
                                                        formData.scrapImage4.endsWith(".jfif") ||
                                                        formData.scrapImage4.endsWith(".png") ||
                                                        formData.scrapImage4.endsWith(".gif") ||
                                                        formData.scrapImage4.endsWith(".bmp") ||
                                                        formData.scrapImage4.endsWith(".tiff") ||
                                                        formData.scrapImage4.endsWith(".svg") ? (
                                                        <>
                                                            <img
                                                                src={formData.scrapImage4}
                                                                alt="PAN Card"
                                                                style={{
                                                                    maxWidth: '100px',
                                                                    display: 'block',
                                                                    cursor: 'pointer',
                                                                    border: 'solid black 2px',
                                                                    padding: '3px',
                                                                    marginTop: '6px'
                                                                }}
                                                                onClick={openscrapImage4Modal}
                                                            />
                                                            <Modal isOpen={isscrapImage4ModalOpen} onRequestClose={closescrapImage4Modal} contentLabel="PAN Card Modal">
                                                                <div className="modal-header">
                                                                    <IconButton href={formData.scrapImage4} download color="primary">
                                                                        <DownloadIcon />
                                                                    </IconButton>
                                                                    <IconButton onClick={closescrapImage4Modal} color="secondary">
                                                                        <CloseIcon />
                                                                    </IconButton>
                                                                </div>
                                                                <div className="modal-image-container">
                                                                    <img src={formData.scrapImage4} alt="PAN Card" style={{ width: '100%' }} />
                                                                </div>
                                                            </Modal>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p>
                                                                <a
                                                                    href={formData.scrapImage4}
                                                                    className="docx-link"
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        color: 'green'
                                                                    }}
                                                                    download
                                                                >
                                                                    <DownloadingOutlinedIcon /> Download
                                                                </a>
                                                                <button
                                                                    type="button"
                                                                    onClick={(e) => handlePreviewClick(e, formData.scrapImage4)}
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        border: 'none',
                                                                        background: 'white',
                                                                        color: '#560303',
                                                                        fontSize: '13px',
                                                                        boxShadow: 'none'
                                                                    }}
                                                                >
                                                                    <RemoveRedEyeOutlinedIcon /> Preview
                                                                </button>
                                                            </p>
                                                        </>
                                                    )
                                                ) : (
                                                    <p className='notUploaded'>Not Uploaded</p>
                                                )
                                            ) : (
                                                <input
                                                    type="file"
                                                    name="scrapImage3"
                                                    onChange={handleChange}
                                                    readOnly={IsReadOnly}
                                                    accept="image/*"
                                                    ref={scrapImage3Ref}
                                                    required
                                                    className="form-control"
                                                />
                                            )}
                                        </label>
                                    </div>
                                </div>

                                {alertInfo.show && (
                                    <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                                        {typeof alertInfo.message === 'string' ? alertInfo.message : JSON.stringify(alertInfo.message)}
                                    </Alert>
                                )}

                                {IsReadOnly && (<button
                                    className="btn btn-dark mt-5 mx-auto d-block"
                                    // type="submit"
                                    onClick={() => setIsReadOnly(false)}
                                >
                                    Edit Product
                                </button>)}

                                {!IsReadOnly && (<button
                                    className="btn btn-dark mt-5 mx-auto d-block"
                                    // type="submit"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>)}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default EditScrapProduct;