import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import loginimage from "../../../Assets/login/login.svg";
import item1 from "../../../Assets/login/item1.svg";
import item3 from "../../../Assets/login/item3.svg";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { tokenState, userIdState, typeState } from "../../../Auth/Atoms.jsx";
import "./LoginPage.css";
import { Alert, Checkbox } from "@mui/material";
// '../../environment';
import trucks1 from "../../../Assets/trucks1.jpg";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import claimproassist from "../../../Assets/claimproassistwithoutName.jpg";
import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";
import { login } from "./authSlice";
import Footer from "../../Home/Footer";
import encrypt from "../../../Services/Encryption/Encyption.js";
// import Loader from '../../../Component/Loader.jsx'

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [alertInfo, setAlertInfo] = useState({
        show: false,
        message: "",
        severity: "info",
    });
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [token, setToken] = useRecoilState(tokenState);
    const [userId, setUserId] = useRecoilState(userIdState);
    const [typeOf, setTypeOf] = useRecoilState(typeState);
    const [showPassword, setShowPassword] = useState(false);
    const [fontSize, setFontSize] = useState("35px");
    const [emailError, setEmailError] = useState("");
    let [passwordError, setPasswordError] = useState("");

    const publicVapidKey =
        "BI0sWPKFjmxnkWYcwjylL7qmo9svTNzEyuEG8-xyswDkQ_FKbONR1yQ6CAUZ9EsryyJiQATfDUZnfloTn8z9DS0";

    const dispatch = useDispatch();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    useEffect(() => {
        const savedEmail = localStorage.getItem("rememberedEmail");
        const savedPassword = localStorage.getItem("rememberedPassword");
        const rememberMeFlag = localStorage.getItem("rememberMe") === "true";

        if (savedEmail && rememberMeFlag) {
            setEmail(savedEmail);
            // setOtp(savedPassword);
            setRememberMe(rememberMeFlag);
        }
    }, []);

    const handlePhoneChange = (e) => {
        const newPhone = e.target.value;
        setPhone(newPhone);
        // if (!emailPattern.test(newPhone)) {
        //     setEmailError('Invalid email address');
        // } else {
        //     setEmailError('');
        // }
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
    };

    const togglePasswordVisibility = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowPassword(!showPassword);
    };

    const urlBase64ToUint8Array = (base64String) => {
        const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, "+")
            .replace(/_/g, "/");
        const rawData = window.atob(base64);
        return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
    };

    const sendLoginNotification = async (getUserId, getToken) => {
        try {
            console.log("Registering service worker...");
            const registration = await navigator.serviceWorker.register(
                "/service-worker.js"
            );
            console.log("Service worker registered:", registration);

            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
            });
            console.log("Push Manager subscription:", subscription);

            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/subscription/${getUserId}`,
                subscription,
                { headers: { Authorization: `Bearer ${getToken}` } }
            );
        } catch (error) {
            console.error("Error sending login notification:", error);
        }
    };

    const [loginData, setLoginData] = useState({});
    const [showLoginBtn, setShowLoginBtn] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const getOtp = async (e) => {

        e.preventDefault();

        if (phone === "") {
            setAlertInfo({
                show: true,
                message: "Please Fill Form Properly",
                severity: "error",
            });
            return;
        }

        setIsLoading(true)

        try {
            const encryptedPhone = await encrypt(phone);
            console.log("phone", encryptedPhone);

            // return

            let response;

            try {
                response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/api/generateOtpAndSend`,
                    {
                        phoneNumber: encryptedPhone.encryptedData,
                        phoneNumberIv: encryptedPhone.iv,
                    }
                );

                console.log('Get OTP Response: ');
                console.log(response);

                const encryptedOtp = await encrypt(response.data.otp);

                let obj = {
                    phoneNumber: encryptedPhone.encryptedData,
                    phoneNumberIv: encryptedPhone.iv,
                    otp: encryptedOtp.encryptedData,
                    otpIv: encryptedOtp.iv,
                }

                setIsLoading(false)
                setLoginData(obj)
                setShowLoginBtn(false)
                console.log(showLoginBtn);

            } catch (error) {
                console.log("Error occurred: ", error);
                showLoginBtn(false)
            }


        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred";
            setAlertInfo({ show: true, message: errorMessage, severity: "error" });
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        console.log(showLoginBtn);

        // return

        try {

            console.log("phone", loginData);

            // return
            setIsLoading(true)

            let response;
            try {
                response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/api/login`,
                    {
                        phoneNumber: loginData.phoneNumber,
                        phoneNumberIv: loginData.phoneNumberIv,
                        otp: loginData.otp,
                        otpIv: loginData.otpIv,
                    }
                );

                setIsLoading(false)

                console.log('final: ');
                console.log(response);

            } catch (error) {
                console.log("Error occurred: ", error);
            }

            if (response.status === 200) {
                console.log("some", response.data);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId", response.data.userId);
                localStorage.setItem("loginId", response.data.loginId);
                localStorage.setItem("loginTime", Date.now());
                document.cookie = `token=${response.data.token}; path=/; max-age=${48 * 60 * 60
                    }; secure; samesite=strict`;

                if (response.data?.data.department) {
                    localStorage.setItem("department", response.data.data.department);
                }
                setToken(response.data.token);
                setUserId(response.data.userId);
                setTypeOf(
                    response.data.data.department ? response.data.data.department : ""
                );
                // dispatch(login({ userId, token }));
                console.log("I AM TOKEN MASTER222222");

                // Save in cookies (accessible from the backend)

                if (rememberMe) {
                    localStorage.setItem("rememberedEmail", email);
                    localStorage.setItem("rememberedPassword", otp);
                    localStorage.setItem("rememberMe", true);
                } else {
                    localStorage.removeItem("rememberedaEmail");
                    localStorage.removeItem("rememberedPassword");
                    localStorage.removeItem("rememberMe");
                }

                setAlertInfo({
                    show: true,
                    messageAdvocate: response.data.message,
                    severity: "success",
                });
                sendLoginNotification(response.data.userId, response.data.token);
                console.log("RESPONSEONDSTS", response.data.data.userType);
                if (
                    response.data.data?.userType === "admin" ||
                    response.data.data.department?.trim() === "Management"
                ) {
                    localStorage.setItem("userRole", "Management");
                    navigate("../admin-dashboard-vendor-customer");
                } else if (response.data.data.department?.trim() === "IT") {
                    console.log("trim department", response.data.data.department);
                    localStorage.setItem("userRole", "IT");
                    navigate("../admin-dashboard-vendor-customer");
                } else if (response.data.data.vendorType === "advocate") {
                    localStorage.setItem("userRole", "advocate");
                    navigate("../advocateDashboard");
                } else if (response.data.data.vendorType === "mechanic") {
                    localStorage.setItem("userRole", "mechanic");
                    navigate("../MechanicDashboard");
                } else if (response.data.data.vendorType === "crane") {
                    localStorage.setItem("userRole", "crane");
                    navigate("../crane-user-dashboard");
                } else if (response.data.data.vendorType === "recoveryVan") {
                    localStorage.setItem("userRole", "recoveryVan");
                    navigate("../crane-user-dashboard");
                } else if (response.data.data.vendorType === "workshop") {
                    localStorage.setItem("userRole", "workshop");
                    navigate("../WorkshopDashboard");
                } else if (response.data.data.department === "Administration") {
                    localStorage.setItem("userRole", "Administration");
                    navigate("../Admin");
                } else if (response.data.data.department === "Sales") {
                    localStorage.setItem("userRole", "sales");
                    navigate("../Salesteam");
                } else if (response.data.data.customerDriverCode) {
                    console.log("userRole", "customerDriver");
                    localStorage.setItem("userRole", "customerDriver");
                    navigate("../register-new-accidentvehicle");
                } else if (response.data.data.vendorDriverCode) {
                    console.log("userRole", "vendorDriver");
                    localStorage.setItem("userRole", "vendorDriver");
                    localStorage.setItem("userType", response.data.data.VendorType);
                    navigate("../crane-driver-home");
                } else {
                    localStorage.setItem("userRole", "customer");
                    localStorage.setItem("fromLogin", true);
                    navigate("../user-landing-page");
                }
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred";
            setAlertInfo({ show: true, message: errorMessage, severity: "error" });
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 360) {
                setFontSize("20px");
            } else {
                setFontSize("30px");
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);


    return (
        <>
            {/* {loading && <Loader/> } */}
            <div className="md:px-0 px-[20px] bg-white">
                <div className="flex items-start justify-center md:flex-row flex-col gap-[68px] md:pr-[80px] pr-0">
                    <div className="max-w-[862px] w-full  md:block hidden">
                        <img src={loginimage} alt="" />
                    </div>
                    <div className="max-w-[430px] pt-[30px] w-full">
                        <h6 className="font-[500] font-satoshi text-[30px] text-[#000000] pb-[26px] m-0">
                            Log in
                        </h6>
                        <p className="font-[400] font-satoshi text-[#515151] text-[16px] mb-0">
                            If you don’t have an account register
                        </p>
                        <p className="font-[400] font-satoshi text-[#515151] text-[16px] mb-0 pb-[52px] mt-2">
                            You can
                            <Link to="/signUp" className="no-underline">
                                <span className="font-[600] text-[#21A6E9] mt-2">
                                    {" "}
                                    Register here !
                                </span>
                            </Link>
                        </p>
                        <div className="flex flex-col gap-[42px]">
                            <div>
                                <label
                                    htmlFor=""
                                    className="font-[500] font-satoshi text-[13px] text-[#000000] mb-0 pb-[13px]"
                                >
                                    Mobile Number
                                </label>
                                <div className="flex items-center gap-[10px] pb-[9px] border-b-[2px] border-solid border-[#000000] h-[40px] box-border">
                                    <div className="w-[20px] h-[20px] text-black">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            fill="currentColor"
                                            className="bi bi-telephone"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                                        </svg>
                                    </div>

                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        required
                                        onChange={handlePhoneChange}
                                        value={phone}
                                        className="font-[400] outline-none w-full font-satoshi text-[16px] text-[#515151] h-[24px] leading-[24px] p-0 m-0"
                                        placeholder="Enter Mobile No."
                                    />
                                </div>

                                {emailError && (
                                    <div
                                        style={{
                                            color: "red",
                                            marginTop: "5px",
                                            marginLeft: "20px",
                                        }}
                                    >
                                        {emailError}
                                    </div>
                                )}
                            </div>
                            <div hidden={showLoginBtn}>
                                <label
                                    htmlFor=""
                                    className="font-[500] font-satoshi text-[13px] text-[#000000] mb-0 pb-[13px]"
                                >
                                    OTP
                                </label>
                                <div className="flex items-center gap-[10px] pb-[9px] border-b-[2px] border-solid border-[#000000] h-[40px] box-border">
                                    <img src={item3} alt="" className="w-[20px] h-[20px]" />
                                    <input
                                        className="font-[400] outline-none w-full font-satoshi text-[16px] text-[#515151]"
                                        placeholder="Enter OTP"
                                        id="otp"
                                        type={showPassword ? "text" : "password"}
                                        value={otp}
                                        onChange={handleOtpChange}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleSubmit(e);
                                            }
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={togglePasswordVisibility}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </div>
                                {passwordError && (
                                    <div
                                        style={{
                                            color: "red",
                                            marginTop: "5px",
                                            marginLeft: "20px",
                                        }}
                                    >
                                        {passwordError}
                                    </div>
                                )}

                                <div className="flex items-center justify-between mt-3">
                                    <div className="flex items-center gap-[16px]">
                                        <input
                                            type="checkbox"
                                            onChange={handleRememberMeChange}
                                            checked={rememberMe}
                                            name="rememberMe"
                                            id="rememberMe"
                                        />
                                        <p className="font-[400] font-satoshi text-[12px] text-[#000000] m-0">
                                            Rememebr me
                                        </p>
                                    </div>
                                    <p className="m-0 font-satoshi font-[400] text-[12px] text-[#000000]">
                                        Forgot Password ?
                                    </p>
                                </div>
                            </div>

                            <button
                                hidden={!showLoginBtn}
                                onClick={getOtp}
                                className="bg-[#21A6E9] rounded-[32px] py-[14px] font-[500] font-satoshi text-[17px] text-[#FFFFFF]"
                            >

                                {isLoading && (
                                    <span
                                        class="spinner-border spinner-border-sm me-1"></span>
                                )}

                                Get OTP
                            </button>

                            <button
                                hidden={showLoginBtn}
                                onClick={handleSubmit}
                                className="bg-[#21A6E9] rounded-[32px] py-[14px] font-[500] font-satoshi text-[17px] text-[#FFFFFF]"
                            >
                                {isLoading && (
                                    <span
                                        class="spinner-border spinner-border-sm me-1"></span>
                                )}

                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
