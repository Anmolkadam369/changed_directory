import React, { useState, useEffect } from 'react';
import '../AccidentVehicle/AccidentVehicle.css'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import backendUrl from '../../environment';
import { Helmet } from 'react-helmet-async';
import ActualVendorResponse from './ActualVendorResponse';

const VendorResponse = () => {
  const [data, setData] = useState([]);
  const [width, setWidth] = useState('100%');
  
  const navigate = useNavigate();
  const location = useLocation();
  const token = useRecoilValue(tokenState);
  const userId = useRecoilValue(userIdState);
  const [showActualVendorResponse, setShowActualVendorResponse] = useState(false)
  const [selectedId, setSelectedId] = useState({});
  console.log("selectedId",selectedId)

  useEffect(() => {
    if(!showActualVendorResponse) getData();
    if (token === "" || userId === "") {
      navigate("/");
    }
  }, [token, userId, navigate, showActualVendorResponse]);

  const getData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/vendorResponse`);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const view = (vehicle) => {
    console.log("VEHICLE HERE ME", vehicle)
    setSelectedId(vehicle);
    setShowActualVendorResponse(true)
    // navigate("../ActualVendorResponse", { state: { vehicle } });
  };
  const handleUpdate = () => {
    setShowActualVendorResponse(false); // Hide VendorMasterEdit
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 380) {
        setWidth('80%');
      } else {
        setWidth('100%');
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Initial check
    handleResize();
    
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
    {!showActualVendorResponse && (<div className="Customer-master-form">
      <Helmet>
        <title>Vendor Response Overview - Claimpro</title>
        <meta name="description" content="View and manage vendor responses for vehicle accidents. Keep track of customer names, vehicle numbers, and actions taken." />
        <meta name="keywords" content="Vehicle Accidents, Customer Service, Claimpro, Claimpro, Claim pro Assist, Bvc Claimpro Assist ,Accidental repair ,Motor Insurance claim,Advocate services ,Crane service ,On site repair,Accident Management" />
        <link rel='canonical' href={`https://claimpro.in/vendorResponse`} />
      </Helmet>

      <div style={{ marginTop: "50px" }}>
        <h3 className="bigtitle">Vendor Response Overview</h3>
        <div className="responsive-table" style={{ width }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: "90px" }}>
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Customer Name</th>
                <th>Vehicle Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", fontWeight: "bold" }}>No Response from this vendor...</td>
                </tr>
              ) : (
                data.map((vehicle, index) => (
                  <tr key={vehicle.AccidentVehicleCode}>
                    <td>{index + 1}</td>
                    <td>{vehicle.CustomerName || '---'}</td>
                    <td>{vehicle.vehicleNumber || '---'}</td>
                    <td>
                      <div>
                        <button onClick={() => view(vehicle)} className='view-button'>View</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>)}
    {showActualVendorResponse && selectedId !={} && (
      <ActualVendorResponse vehicle={selectedId} onUpdate={handleUpdate}/>
    )}
    </div>
  );
};

export default VendorResponse;
