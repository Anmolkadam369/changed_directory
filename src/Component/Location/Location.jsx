import React, { useState, useEffect } from 'react';
import './Location.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import { Helmet } from 'react-helmet-async';
import backendUrl from '../../environment';

function Location({ vehicleData }) {
    console.log("vehicleData")
    console.log("vehicleData", vehicleData)


    // const vehicleData = vehicleData;
    // console.log("vehicalData", vehicleData)
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    useEffect(() => {
        console.log("token", token, userId);
        // if (token === "" || userId === "") {
        //     navigate("/");
        // }
    }, [token, userId, navigate]);

    return (
        <div>
            <Helmet>
                <title>Get Location of Accident Veehicle - Claimpro</title>
                <meta name="description" content="Get Location of Accident Veehicle and photos of vehicle." />
                <meta name="keywords" content="Vehicle Accidents, accident trucks,  Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
                <link rel='canonical' href={`https://claimpro.in/Location`}/>
            </Helmet>
            <div className="vehicle-info-container">
                <table className="vehicle-info-table">
                    <thead>
                        <tr>
                            <th>Make</th>
                            <th>Model</th>
                            <th>type</th>
                            <th>Chassis No.</th>
                            <th>Year.</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{vehicleData.make}</td>
                            <td>{vehicleData.model}</td>
                            <td>{vehicleData.type}</td>
                            <td>{vehicleData.chassisNo}</td>
                            <td>{vehicleData.year}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Location;