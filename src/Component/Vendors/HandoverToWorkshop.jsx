import React, { useState, useEffect, useRef } from 'react';
import '../VehicleClaimRegistration/VehicleClaimRegistration.css';
import { useNavigate, useLocation } from 'react-router-dom'
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { Alert } from '@mui/material';
import axios from 'axios';
import backendUrl from '../../environment';

const HandoverToWorkshop = () => {

    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};
    console.log("Received IDssss:", id);
    const token = useRecoilValue(tokenState);
    const userId = useRecoilValue(userIdState);
    const [IsReadOnly, setIsReadOnly] = useState(true);
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [comingData, setComingData] = useState([]);
    console.log("comingData", comingData)
    const [isLoadingStates, setIsLoadingStates] = useState(true);
    const [isLoadingCities, setIsLoadingCities] = useState(true);
    const today = new Date().toISOString().split('T')[0];

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        console.log("token", token, userId);
        if (token === "" || userId === "") {
            navigate("/");
        }
        console.log("id", id)
        getDataById(id);
        setHandoverData({ accidentFileNo: id });
    }, [token, userId, navigate, id]);

    const getDataById = async (id) => {
        const response = await axios.get(`${backendUrl}/api/getAccidentVehicleData/${id}`);
        console.log("daa", response.data)
        console.log("response", response.data.data[0]);
        setComingData(response.data.data[0])
    }

    const [handoverData, setHandoverData] = useState({
        accidentFileNo: id,
        dateTime: today,

        vehicleKey: "",
        vehicleKeyremark: "",

        batta: "",
        battaremark: "",

        pipe: "",
        piperemark: "",

        jack: "",
        jackremark: "",

        rod: "",
        rodremark: "",

        pana: "",
        panaremark: "",


        wheelPana: "",
        wheelPanaremark: "",

        battery: "",
        batteryremark: "",

        tripelRassa: "",
        tripelRassaremark: "",

        fuelQuantity: "",
        fuelQuantityremark: "",

        stepeny: "",
        stepenyremark: "",

        stepenyKey: "",
        stepenyKeyremark: "",

        fuelTankCap: "",
        fuelTankCapremark: "",

        tyreLiver: "",
        tyreLiverremark: "",

        POD: "",
        PODremark: "",

        sikanja: "",
        sikanjaremark: "",

        D_cycle: "",
        D_cycleremark: "",

        belt: "",
        beltremark: "",

        patra: "",
        patraremark: "",

        stopper: "",
        stopperremark: "",

        adBlueQuantity: "",
        adBlueQuantityremark: "",

        axle1_left: "",
        axle1_leftremark: "",

        axle2_left: "",
        axle2_leftremark: "",

        axle2_leftSecond: "",
        axle2_leftremarkSecond: "",

        axle3_left: "",
        axle3_leftremark: "",

        axle3_leftSecond: "",
        axle3_leftremarkSecond: "",

        axle4_left: "",
        axle4_leftremark: "",

        axle4_leftSecond: "",
        axle4_leftremarkSecond: "",

        axle5_left: "",
        axle5_leftremark: "",

        axle1_right: "",
        axle1_rightremark: "",

        axle2_right: "",
        axle2_rightremark: "",

        axle2_rightSecond: "",
        axle2_rightremarkSecond: "",

        axle3_right: "",
        axle3_rightremark: "",

        axle3_rightSecond: "",
        axle3_rightremarkSecond: "",

        axle4_right: "",
        axle4_rightremark: "",

        axle4_rightSecond: "",
        axle4_rightremarkSecond: "",

        axle5_right: "",
        axle5_rightremark: "",

    });

    const handleChange = (e) => {
        const { name, type, value } = e.target;

        console.log("name"[name], value)
        setHandoverData(prev => ({ ...prev, [name]: value }));
    }

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('Form data submitted:', accidentData);
        // const formDataObj = new FormData();
        // for (const key in accidentData) {
        //     if (accidentData[key]) {
        //         if (accidentData[key] instanceof File) {
        //             formDataObj.append(key, accidentData[key], accidentData[key].name);
        //         } else {
        //             formDataObj.append(key, accidentData[key]);
        //         }
        //     }
        // }

        // for (let pair of formDataObj.entries()) {
        //     console.log(`${pair[0]}:`, pair[1]);
        // }

        // try {
        //     const response = await axios({
        //         method: 'POST',
        //         url: `${backendUrl}/api/addVehicleClaim/${userId}`,
        //         data: formDataObj,
        //         headers: {
        //             'Authorization': token
        //         }
        //     });
        //     console.log("response", response.data);
            setAlertInfo({ show: true, message: "Data Successfully Added !!!", severity: 'success' });
        // }
        // catch (error) {
        //     console.error('Error response:', error.response);
        //     const errorMessage = error.response?.data || 'An error occurred';
        //     setAlertInfo({ show: true, message: errorMessage, severity: 'error' });
        // }
    };




    return (
        <div className='container'>
            <form style={{ backgroundColor: 'white', padding: '30px' }}>
                <div class='header-container'>
                    <h2 className='bigtitle'>Hand Over Form</h2>
                </div>
                <div className='form-row'>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>Vehicle Key:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="vehicleKey"
                                        value="yes"
                                        checked={handoverData.vehicleKey === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="vehicleKey"
                                        value="no"
                                        checked={handoverData.vehicleKey === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            {handoverData.vehicleKey === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="vehicleKeyremark"
                                        placeholder="Remark"
                                        value={handoverData.vehicleKeyremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>Batta:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="batta"
                                        value="yes"
                                        checked={handoverData.batta === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="batta"
                                        value="no"
                                        checked={handoverData.batta === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            {handoverData.batta === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="battaremark"
                                        placeholder="Remark"
                                        value={handoverData.battaremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>Pipe:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="pipe"
                                        value="yes"
                                        checked={handoverData.pipe === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="pipe"
                                        value="no"
                                        checked={handoverData.pipe === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                            {handoverData.pipe === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="piperemark"
                                        placeholder="Remark"
                                        value={handoverData.piperemark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>Jack :</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="jack"
                                        value="yes"
                                        checked={handoverData.jack === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="jack"
                                        value="no"
                                        checked={handoverData.jack === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>



                            {handoverData.jack === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="jackremark"
                                        placeholder="Remark"
                                        value={handoverData.jackremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='form-row'>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>Rod: </label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="rod"
                                        value="yes"
                                        checked={handoverData.rod === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="rod"
                                        value="no"
                                        checked={handoverData.rod === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                            {handoverData.rod === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="rodremark"
                                        placeholder="Remark"
                                        value={handoverData.rodremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>Pana: </label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="pana"
                                        value="yes"
                                        checked={handoverData.pana === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="pana"
                                        value="no"
                                        checked={handoverData.pana === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                            {handoverData.pana === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="rodremark"
                                        placeholder="Remark"
                                        value={handoverData.rodremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>Wheel Pana:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="wheelPana"
                                        value="yes"
                                        checked={handoverData.wheelPana === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="wheelPana"
                                        value="no"
                                        checked={handoverData.wheelPana === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                            {handoverData.wheelPana === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="wheelPanaremark"
                                        placeholder="Remark"
                                        value={handoverData.wheelPanaremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>Battery:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="battery"
                                        value="yes"
                                        checked={handoverData.battery === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="battery"
                                        value="no"
                                        checked={handoverData.battery === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                            {handoverData.battery === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="batteryremark"
                                        placeholder="Remark"
                                        value={handoverData.batteryremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='form-row'>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>Tripel & Rassa:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="tripelRassa"
                                        value="yes"
                                        checked={handoverData.tripelRassa === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="tripelRassa"
                                        value="no"
                                        checked={handoverData.tripelRassa === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                            {handoverData.tripelRassa === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="tripelRassaremark"
                                        placeholder="Remark"
                                        value={handoverData.tripelRassaremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField inputField">
                                <label>Fuel Quantity:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="fuelQuantity"
                                        value="yes"
                                        checked={handoverData.fuelQuantity === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="fuelQuantity"
                                        value="no"
                                        checked={handoverData.fuelQuantity === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                            {handoverData.fuelQuantity === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="fuelQuantityremark"
                                        placeholder="Remark"
                                        value={handoverData.fuelQuantityremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField inputField">
                                <label>Stepeny:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="stepeny"
                                        value="yes"
                                        checked={handoverData.stepeny === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="stepeny"
                                        value="no"
                                        checked={handoverData.stepeny === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                            {handoverData.stepeny === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="stepenyremark"
                                        placeholder="Remark"
                                        value={handoverData.stepenyremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField inputField">
                                <label>Stepeny Key:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="stepenyKey"
                                        value="yes"
                                        checked={handoverData.stepenyKey === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="stepenyKey"
                                        value="no"
                                        checked={handoverData.stepenyKey === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>



                            {handoverData.stepenyKey === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="stepenyKeyremark"
                                        placeholder="Remark"
                                        value={handoverData.stepenyKeyremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='form-row'>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>Fuel Tank Cap:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="fuelTankCap"
                                        value="yes"
                                        checked={handoverData.fuelTankCap === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="fuelTankCap"
                                        value="no"
                                        checked={handoverData.fuelTankCap === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                            {handoverData.fuelTankCap === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="fuelTankCapremark"
                                        placeholder="Remark"
                                        value={handoverData.fuelTankCapremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>Tyre Liver:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="tyreLiver"
                                        value="yes"
                                        checked={handoverData.tyreLiver === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="tyreLiver"
                                        value="no"
                                        checked={handoverData.tyreLiver === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                            {handoverData.tyreLiver === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="tyreLiverremark"
                                        placeholder="Remark"
                                        value={handoverData.tyreLiverremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>POD:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="POD"
                                        value="yes"
                                        checked={handoverData.POD === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="POD"
                                        value="no"
                                        checked={handoverData.POD === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                            {handoverData.POD === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="PODremark"
                                        placeholder="Remark"
                                        value={handoverData.PODremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>Sikanja:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="sikanja"
                                        value="yes"
                                        checked={handoverData.sikanja === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="sikanja"
                                        value="no"
                                        checked={handoverData.sikanja === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                            {handoverData.sikanja === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="sikanjaremark"
                                        placeholder="Remark"
                                        value={handoverData.sikanjaremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='form-row'>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>D-Cycle:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="D_cycle"
                                        value="yes"
                                        checked={handoverData.D_cycle === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="D_cycle"
                                        value="no"
                                        checked={handoverData.D_cycle === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                            {handoverData.D_cycle === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="D_cycleremark"
                                        placeholder="Remark"
                                        value={handoverData.D_cycleremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>Belt:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="belt"
                                        value="yes"
                                        checked={handoverData.belt === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="belt"
                                        value="no"
                                        checked={handoverData.belt === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                            {handoverData.belt === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="beltremark"
                                        placeholder="Remark"
                                        value={handoverData.beltremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>Patra:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="patra"
                                        value="yes"
                                        checked={handoverData.patra === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="patra"
                                        value="no"
                                        checked={handoverData.patra === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                            {handoverData.patra === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="patraremark"
                                        placeholder="Remark"
                                        value={handoverData.patraremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>Stopper:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="stopper"
                                        value="yes"
                                        checked={handoverData.stopper === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="stopper"
                                        value="no"
                                        checked={handoverData.stopper === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                            {handoverData.stopper === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="stopperremark"
                                        placeholder="Remark"
                                        value={handoverData.stopperremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='form-row'>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>Ad Blue Quantity:</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="adBlueQuantity"
                                        value="yes"
                                        checked={handoverData.adBlueQuantity === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="adBlueQuantity"
                                        value="no"
                                        checked={handoverData.adBlueQuantity === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                            {handoverData.adBlueQuantity === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="adBlueQuantityremark"
                                        placeholder="Remark"
                                        value={handoverData.adBlueQuantityremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='form-field'></div>
                    <div className='form-field'></div>
                    <div className='form-field'></div>
                </div>

                <div class='header-container'>
                    <h2 className='bigtitle'>AXLE (Left)</h2>
                </div>

                <div className='form-row'>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>AXLE 1 (LEFT):</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="axle1_left"
                                        value="yes"
                                        checked={handoverData.axle1_left === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="axle1_left"
                                        value="no"
                                        checked={handoverData.axle1_left === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                            {handoverData.axle1_left === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="axle1_leftremark"
                                        placeholder="Remark"
                                        value={handoverData.axle1_leftremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>AXLE 2 (LEFT):</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="axle2_left"
                                        value="yes"
                                        checked={handoverData.axle2_left === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="axle2_left"
                                        value="no"
                                        checked={handoverData.axle2_left === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                            {handoverData.axle2_left === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="axle2_leftremark"
                                        placeholder="Remark"
                                        value={handoverData.axle2_leftremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>AXLE 2 (LEFT 2):</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="axle2_leftSecond"
                                        value="yes"
                                        checked={handoverData.axle2_leftSecond === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="axle2_leftSecond"
                                        value="no"
                                        checked={handoverData.axle2_leftSecond === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                            {handoverData.axle2_leftSecond === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="axle2_leftSecondremark"
                                        placeholder="Remark"
                                        value={handoverData.axle2_leftSecondremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>AXLE 3 (LEFT)</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="axle3_left"
                                        value="yes"
                                        checked={handoverData.axle3_left === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="axle3_left"
                                        value="no"
                                        checked={handoverData.axle3_left === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                            {handoverData.axle3_left === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="axle3_leftremark"
                                        placeholder="Remark"
                                        value={handoverData.axle3_leftremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                <div className='form-row'>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>AXLE 3 (LEFT 2):</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="axle3_leftSecond"
                                        value="yes"
                                        checked={handoverData.axle3_leftSecond === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="axle3_leftSecond"
                                        value="no"
                                        checked={handoverData.axle3_leftSecond === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                            {handoverData.axle3_leftSecond === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="axle3_leftSecondremark"
                                        placeholder="Remark"
                                        value={handoverData.axle3_leftSecondremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>AXLE 4 (LEFT)</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="axle4_left"
                                        value="yes"
                                        checked={handoverData.axle4_left === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="axle4_left"
                                        value="no"
                                        checked={handoverData.axle4_left === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                            {handoverData.axle4_left === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="axle4_leftremark"
                                        placeholder="Remark"
                                        value={handoverData.axle4_leftremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>AXLE 4 (LEFT 2)</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="axle4_leftSecond"
                                        value="yes"
                                        checked={handoverData.axle4_leftSecond === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="axle4_leftSecond"
                                        value="no"
                                        checked={handoverData.axle4_leftSecond === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                            {handoverData.axle4_leftSecond === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="axle4_leftSecondremark"
                                        placeholder="Remark"
                                        value={handoverData.axle4_leftSecondremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>AXLE 5 (LEFT):</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="axle5_left"
                                        value="yes"
                                        checked={handoverData.axle5_left === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="axle5_left"
                                        value="no"
                                        checked={handoverData.axle5_left === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                            {handoverData.axle5_left === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="axle5_leftremark"
                                        placeholder="Remark"
                                        value={handoverData.axle5_leftremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                <div class='header-container'>
                    <h2 className='bigtitle'>AXLE (Right)</h2>
                </div>

                <div className='form-row'>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>AXLE 1 (RIGHT):</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="axle1_right"
                                        value="yes"
                                        checked={handoverData.axle1_right === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="axle1_right"
                                        value="no"
                                        checked={handoverData.axle1_right === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                            {handoverData.axle1_right === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="axle1_rightremark"
                                        placeholder="Remark"
                                        value={handoverData.axle1_rightremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>AXLE 2 (RIGHT):</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="axle2_right"
                                        value="yes"
                                        checked={handoverData.axle2_right === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="axle2_right"
                                        value="no"
                                        checked={handoverData.axle2_right === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                            {handoverData.axle2_right === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="axle2_rightremark"
                                        placeholder="Remark"
                                        value={handoverData.axle2_rightremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>AXLE 2 (RIGHT 2):</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="axle2_rightSecond"
                                        value="yes"
                                        checked={handoverData.axle2_rightSecond === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="axle2_rightSecond"
                                        value="no"
                                        checked={handoverData.axle2_rightSecond === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                            {handoverData.axle2_rightSecond === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="axle2_rightSecondremark"
                                        placeholder="Remark"
                                        value={handoverData.axle2_rightSecondremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>AXLE 3 (RIGHT):</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="axle3_right"
                                        value="yes"
                                        checked={handoverData.axle3_right === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="axle3_right"
                                        value="no"
                                        checked={handoverData.axle3_right === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                            {handoverData.axle3_right === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="axle3_rightremark"
                                        placeholder="Remark"
                                        value={handoverData.axle3_rightremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                <div className='form-row'>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>AXLE 3 (RIGHT 2):</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="axle3_rightSecond"
                                        value="yes"
                                        checked={handoverData.axle3_rightSecond === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="axle3_rightSecond"
                                        value="no"
                                        checked={handoverData.axle3_rightSecond === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                            {handoverData.axle3_rightSecond === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="axle3_rightSecondremark"
                                        placeholder="Remark"
                                        value={handoverData.axle3_rightSecondremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>AXLE 4 (RIGHT):</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="axle4_right"
                                        value="yes"
                                        checked={handoverData.axle4_right === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="axle4_right"
                                        value="no"
                                        checked={handoverData.axle4_right === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                            {handoverData.axle4_right === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="axle4_rightremark"
                                        placeholder="Remark"
                                        value={handoverData.axle4_rightremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>AXLE 4 (RIGHT 2):</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="axle4_rightSecond"
                                        value="yes"
                                        checked={handoverData.axle4_rightSecond === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="axle4_rightSecond"
                                        value="no"
                                        checked={handoverData.axle4_rightSecond === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                            {handoverData.axle4_rightSecond === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="axle4_rightSecondremark"
                                        placeholder="Remark"
                                        value={handoverData.axle4_rightSecondremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='form-field'>
                        <div>
                            <div className="form-row radio-group inputField">
                                <label>AXLE 5 (RIGHT):</label>
                                <label>
                                    Yes
                                    <input
                                        type="radio"
                                        name="axle5_right"
                                        value="yes"
                                        checked={handoverData.axle5_right === 'yes'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    No
                                    <input
                                        type="radio"
                                        name="axle5_right"
                                        value="no"
                                        checked={handoverData.axle5_right === 'no'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                            {handoverData.axle5_right === 'no' && (


                                <div className="form-field">
                                    <input
                                        type="text"
                                        className='inputField'
                                        name="axle5_rightremark"
                                        placeholder="Remark"
                                        value={handoverData.axle5_rightremark}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                </div>
                
                {alertInfo.show && (
                    <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                        {alertInfo.message}
                    </Alert>
                )}

                <div style={{ textAlign: 'center' }}>
                    <button type="submit" style={{ padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }} onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default HandoverToWorkshop;